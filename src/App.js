import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import Report from "./pages/Report";

function App() {
  const location = useLocation();

  const dashboardRoutes = [
    "/company-dashboard",
    "/raw-material-dashboard",
    "/fuel-dashboard",
    "/goods-supplier-dashboard",
  ];
  // Function to determine if the current route is a dashboard route
  const isDashboardRoute = () => {
    return dashboardRoutes.some((route) => location.pathname.startsWith(route));
  };

  return (
    <div className="App">
      {!isDashboardRoute() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/standards" element={<Standards />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        {/* <Route path="/scope1" element={<Scope1Form />} />
          <Route path="/scope2" element={<Scope2Form />} />
          <Route path="/scope3" element={<Scope3Form/>} /> */}
        <Route path="/report" element={<Report />} />
      </Routes>
      {!isDashboardRoute() && <Foot />}
    </div>
  );
}

export default App;
