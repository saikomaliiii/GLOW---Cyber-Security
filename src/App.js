import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import IntroQuiz from "./pages/IntroQuiz";
import Dashboard from "./pages/Dashboard";
import VeryBasic from "./pages/VeryBasic";
import Basic from "./pages/Basic";
import Advanced from "./pages/Advanced";

import VBModule from "./pages/VBModule";
import VBModule2 from "./pages/VBModule2";
import VBModule3 from "./pages/VBModule3";
import VBModule4 from "./pages/VBModule4";
import VBModule5 from "./pages/VBModule5";
import Certifications from "./pages/Certifications";
import BModule from "./pages/BModule";
import BModule2 from "./pages/BModule2";
import BModule3 from "./pages/BModule3";
import BModule4 from "./pages/BModule4";
import IncidentLab from "./pages/IncidentLab";
import AdvModule1 from "./pages/AdvModule1";
import AdvModule2 from "./pages/AdvModule2";
import AdvModule3 from "./pages/AdvModule3";
import AdvModule4 from "./pages/AdvModule4";
import AdvModule5 from "./pages/AdvModule5";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/intro" element={<IntroQuiz />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/verybasic" element={<VeryBasic />} />
        <Route path="/basic" element={<Basic />} />
         <Route path="/advanced" element={<Advanced />} />
        <Route path="/verybasic/1" element={<VBModule />} />
<Route path="/verybasic/2" element={<VBModule2 />} />
<Route path="/verybasic/3" element={<VBModule3 />} />
<Route path="/verybasic/4" element={<VBModule4 />} />
<Route path="/verybasic/5" element={<VBModule5 />} />
<Route path="/verybasic/6" element={<Certifications />} />
<Route path="/basic/1" element={<BModule />} />
<Route path="/basic/2" element={<BModule2 />} />
<Route path="/basic/3" element={<BModule3 />} />
<Route path="/basic/4" element={<BModule4 />} />
<Route path="/basic/5" element={<IncidentLab />} />
<Route path="/advanced/1" element={<AdvModule1 />} />
<Route path="/advanced/2" element={<AdvModule2 />} />
<Route path="/advanced/3" element={<AdvModule3 />} />
<Route path="/advanced/4" element={<AdvModule4 />} />
<Route path="/advanced/5" element={<AdvModule5 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
