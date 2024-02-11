import React from "react";
import { About, Footer, Header, Skills, Testimonials, Work } from "./container";
import { Navbar } from "./components";
// import sass from "sass";
 import "./App.scss";
// const sass = require('sass');

// const result = sass.compile("./App.scss");
// console.log(result.css);

const App = () => {

  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Skills />
      <Work />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
