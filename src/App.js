import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import prevState from "./Components/Hooks/PrevState";
import Avatar from "./Components/Avatar";
function App() {
  const URL = "https://en.wikipedia.org/w/api.php";

  const [term, setTerm] = useState("javascript");
  const [list, setList] = useState([]);

  const prevTerm = prevState(term);

  useEffect(() => {
    const searchApi = async () => {
      const response = await axios.get(URL, {
        params: {
          action: "query",
          format: "json",
          list: "search",
          origin: "*",
          srsearch: term,
        },
      });
      setList(response.data.query.search);
    };

    if (!list.length && term) {
      searchApi();
    } else if (prevTerm !== term) {
      const debounce = setTimeout(() => {
        if (term) {
          searchApi();
        }
      }, 1000);
      return () => {
        clearTimeout(debounce);
      };
    }
  }, [term, list.length, prevTerm]);

  const showList = list.map((el) => (
    <tr key={el.pageId} style={{ border: "1px solid black" }}>
      <td>{el.title}</td>
      <td>
        <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
        {el.snippet}
      </td>
    </tr>
  ));

  return (
    <Avatar person={{ name: "hellen", imageId: "123" }} size={111} />
    // <Container>
    //   <Row className="mt-3">
    //     <Col>
    //       <Form>
    //         <Form.Group className="mb-3" controlId="formBasicEmail">
    //           <Form.Control
    //             type="text"
    //             placeholder="Search Input"
    //             onChange={(e) => setTerm(e.target.value)}
    //             value={term}
    //           />
    //         </Form.Group>
    //       </Form>
    //     </Col>
    //   </Row>

    //   <Row className="mt-3">
    //     <Col>
    //       <table style={{ border: "1px solid grey" }}>
    //         <thead>
    //           <tr>
    //             <th>Title</th>
    //             <th>Desc</th>
    //           </tr>
    //         </thead>
    //         <tbody>{showList}</tbody>
    //       </table>
    //     </Col>
    //   </Row>
    // </Container>
  );
}

export default App;
