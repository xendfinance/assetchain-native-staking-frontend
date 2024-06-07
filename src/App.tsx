import React, { useEffect } from "react"
import { Home } from "./screens/Home";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Transactions } from "screens/Transactions";
import StakingV2  from "screens/StakingV2";
import { useDispatch, useSelector } from "react-redux";
import { recreateWeb3 } from "methods/utils/useAuth";


function App() {

  const dispatch = useDispatch();
  const {tokenAddress} = useSelector((store: any) => store.General);
  console.log(tokenAddress, 'token')

  useEffect(() => {
    dispatch(recreateWeb3(tokenAddress));
}, []);

  return (
    <div className="App">
     
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StakingV2/>} />
        <Route path="/:page" element={<Transactions/>} />
        <Route path="/stake" element={<StakingV2/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
