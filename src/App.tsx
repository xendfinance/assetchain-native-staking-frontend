import React, { useEffect } from "react"
import { Home } from "./screens/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Transactions } from "screens/Transactions";
import { useDispatch } from "react-redux";
import { recreateWeb3 } from "utils/useAuth";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(recreateWeb3());
}, []);

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
