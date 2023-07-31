import React from "react";

function Avatar({ person, size = 100 }) {
  console.log(person);
  const { name } = person;
  return (
    <div>
      {size} {person.name}
    </div>
  );
}

export default Avatar;
