import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Standards from "./pages/Standards";
import Dashboard from "./pages/Dashboard";
import Dashnavbar from "./components/Dashnavbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Dashnavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/standards" element={<Standards />} />
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
