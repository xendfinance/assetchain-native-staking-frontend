import React from "react"
import { Home } from "./screens/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Transactions } from "screens/Transactions";


function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/:page" element={<Transactions/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
