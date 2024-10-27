import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import AddElectricity from "./components/AddElectricity";
import AddCO2Emissions from "./components/AddCO2Emissions";
import RawMaterialDashboard from "./components/Dashboard/RawMaterialDashboard";
import AddRawMaterialData from "./components/AddRawMaterialData";
import FuelProviderDashboard from "./components/Dashboard/FuelProviderDashboard";
import AddFuelData from "./components/AddFuelData";
import GoodsSupplierDashboard from "./components/Dashboard/GoodsSupplierDashboard";
import AddGoodsAndServices from "./components/AddGoodsAndServices";

function App() {
  const location = useLocation();

  const dashboardRoutes = ['/company-dashboard', '/raw-material-dashboard', '/fuel-dashboard', '/goods-supplier-dashboard'];
  // Function to determine if the current route is a dashboard route
  const isDashboardRoute = () => {
    return dashboardRoutes.some(route => location.pathname.startsWith(route));
  };

  return (
    <div className="App">
     
      {!isDashboardRoute() && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/company-dashboard/:userId/*" element={<CompanyDashboard/>} >
            <Route path="add-electricity" element={<AddElectricity />} />
             <Route path="add-co2-emissions" element={<AddCO2Emissions />} />
            {/*<Route path="add-waste" element={<AddWaste />} /> */}
          </Route>
          <Route path="/raw-material-dashboard/:userId/*" element={<RawMaterialDashboard/>} >
            <Route path="add" element={<AddRawMaterialData/>} />
            
          </Route>
          <Route path="/fuel-dashboard/:userId/*" element={<FuelProviderDashboard/>} >
          <Route path="add" element={<AddFuelData/>} />
          </Route>
          <Route path="/goods-supplier-dashboard/:userId/*" element={<GoodsSupplierDashboard/>} >
          <Route path="add" element={<AddGoodsAndServices/>} />
          </Route>
          <Route path="/scope1" element={<Scope1Form />} />
          <Route path="/scope2" element={<Scope2Form />} />
          <Route path="/scope3" element={<Scope3Form/>} />
        </Routes>
        {!isDashboardRoute() && <Foot />}
       
       
      
    </div>
  );
}

export default App;
