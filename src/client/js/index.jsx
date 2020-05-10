import React from "react";
import ReactDOM from "react-dom";

const root = (
  <h1>Hello world!</h1>
);

const a = new Promise((res, rej) => console.log("Hello!"));
a.then(() => console.log("ok"))

ReactDOM.render(root, document.getElementById('root'));
