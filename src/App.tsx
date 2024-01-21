import {BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './component/Layout/Layout';
import Form from './component/Forms/Form'
import Resume from './Resume';
import Home from './Home';
import Cards from "./component/Layout/Card";

const App = ()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="resume" element={<Resume />}></Route>
          <Route path="card" element={<Cards />}></Route>
          <Route path="form" element={<Form />}></Route>
          <Route path="*"  element={<Resume />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
