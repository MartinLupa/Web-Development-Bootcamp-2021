//REACT FORMS:
//How to recognise and read inputs? Use of onChange().
//Using inputs to re-render objects: when user types his/her name and clicks "Submit", his/her name gest rendered in the h1 element.


import React, {useState} from "react";

function App() {
  const [name, setName] = useState("");
  function handleChange(event) {
    setName(event.target.value)
  }
  
  const [headingText, setHeading] = useState("");
  function handleClick() {
    setHeading(name);
  }

  return (
    <div className="container">
      <form>
      <h1>Hello {headingText} </h1>
      <input
        onChange={handleChange}
        type="text"
        placeholder="What's your name?"
        value={name} //Corresponds to what is inside the input. Now is set to the value targetted by event.target.value
      />
      <button onClick={handleClick}>Submit</button> 
      </form>
      
    </div>
  );
}

export default App;

//When a button is inside a <form> component, name will  be rendered but automatically refreshed and disappear.
//This is the default behaviour of form components in HTML. They referesh in order to submit, make a pot/get request and refresh the page.
