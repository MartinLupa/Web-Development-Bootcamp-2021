//EVENT HANDLING:
//Changing text and style attributes with events.
//OnClick(), onMouseOver(), onMouseOut().

import React, { useState } from "react";

function App() {
  const [isMousedOver, setMouseOver] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }
  function handleMouseOut() {
    setMouseOver(false);
  }

  const [headingText, setHeadingText] = useState("Hello");

  function handleClick() {
    setHeadingText("Submitted");
  }
  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: isMousedOver ? "black" : "white" }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
