import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Foot from "./components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Standards from "./pages/Standards";
import FuelDataForm from "./pages/FuelDataForm";
import GoodsServicesForm from "./pages/Goods&ServicesForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";
import RawMaterialDataForm from "./pages/RawMaterialDataForm";
import LogisticsDataForm from "./pages/LogisticsForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/fueldataform" element={<FuelDataForm />} />
          <Route path="/goods&servicesform" element={<GoodsServicesForm />} />
          <Route path="/logisticsdataform" element={<LogisticsDataForm />} />
          <Route
            path="/rawmaterialdataform"
            element={<RawMaterialDataForm />}
          />
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
