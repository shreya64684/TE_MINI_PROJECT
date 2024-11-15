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
import AddElectricity from "./components/AddElectricity";
import AddCO2Emissions from "./components/AddCO2Emissions";
import AddFuelData from "./components/AddFuelData";
import RawMaterialDashboard from "./components/Dashboard/RawMaterialDashboard";
import FuelProviderDashboard from "./components/Dashboard/FuelProviderDashboard";
import GoodsSupplierDashboard from "./components/Dashboard/GoodsSupplierDashboard";
import AddRawMaterialData from "./components/AddRawMaterialData";
import AddGoodsAndServices from "./components/AddGoodsAndServices";
import LogisticsDashboard from "./components/Dashboard/LogisticsDashboard";
import CompanySelection from "./components/CompanySelection";
import ipfs from './ipfs'



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
         
          <Route path="/company-selection" element={<CompanySelection/>} />
          <Route path="/company-dashboard/:userId/*" element={<CompanyDashboard />} >
            <Route path="add-electricity" element={<AddElectricity />} />
            <Route path="add-co2-emissions" element={<AddCO2Emissions />} />
            <Route path="add-raw-material" element={<AddRawMaterialData />} />
            <Route path="add-goods" element={<AddGoodsAndServices/>} />
            <Route path="add-fuel" element={<AddFuelData/>} />
          {/* Add more dashboard routes here */}
        </Route>
        <Route path="/goods-supplier-dashboard/:userId/*" element={<GoodsSupplierDashboard />} >
            <Route path="add" element={<AddGoodsAndServices/>} />
            
          {/* Add more dashboard routes here */}
        </Route>
        <Route path="/raw-material-dashboard/:userId/*" element={<RawMaterialDashboard/>} >
            <Route path="add" element={<AddRawMaterialData />} />
          {/* Add more dashboard routes here */}
        </Route>
        <Route path="/fuel-dashboard/:userId/*" element={<FuelProviderDashboard/>} >
            <Route path="add" element={<AddFuelData/>} />
          {/* Add more dashboard routes here */}
        </Route>
        <Route path="/logistics-dashboard/:userId/*" element={<LogisticsDashboard/>} >
            <Route path="add-transportation" element={<AddFuelData/>} />
          {/* Add more dashboard routes here */}
        </Route>
        </Routes>
        {!isDashboardRoute() && <Foot />}
       
       
      
    </div>
  );
}

export default App;
