import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Standards from "./pages/Standards";
import Scope1Form from "./pages/Scope1Form";
import Scope2Form from "./pages/Scope2Form";
import Scope3Form from "./pages/Scope3Form";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/company-dashboard" element={<CompanyDashboard/>} />
          <Route path="/scope1" element={<Scope1Form />} />
          <Route path="/scope2" element={<Scope2Form />} />
          <Route path="/scope3" element={<Scope3Form/>} />
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
