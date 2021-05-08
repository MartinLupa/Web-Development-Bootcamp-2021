//CONDITIONAL RENDERING:
//use of props and variables to render a registration/login form conditionally.
//1. Show Login as the button text if userIsRegistered is true.
//Show Register as the button text if userIsRegistered is false.
//2. Only show the Confirm Password input if userIsRegistered is false.
//Don't show it if userIsRegistered is true.


//APP.JSX

import React from "react";
import Form from "./Form";

var userIsRegistered = false;

function App() {
  return (
    <div className="container">
      <Form IsRegistered={userIsRegistered} />
    </div>
  );
}

export default App;


//FORM.JSX

import React from "react";

function Form(props) {
  return (
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      {props.IsRegistered === false ? (
        <input type="password" placeholder="Confirm Password" />
      ) : null}
      ;
      <button type="submit">{props.IsRegistered ? "Register" : "Login"}</button>
    </form>
  );
}

export default Form;
