import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout/Layout";
// import Form from './component/Forms/Form'
import Resume from "./Resume";
import Home from "./Home";
import Createresume from "./pages/createResume";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="create" element={<Createresume />}></Route>
          <Route path="resume" element={<Resume />}></Route>
          <Route path="*" element={<Resume />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
