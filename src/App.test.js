import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import VeryBasic from "./pages/VeryBasic";
import VBModule1 from "./pages/VBModule";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/verybasic" element={<VeryBasic />} />

        <Route path="/vb/module1" element={<VBModule1 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
