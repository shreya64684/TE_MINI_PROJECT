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
import CompanyDashboard from "./components/Dashboard/CompanyDashboard.jsx";
import AddElectricity from "./components/AddElectricity";
import AddRawMaterial from "./components/AddRawMaterial.jsx";
import AddCO2Emissions from "./components/AddCO2Emissions";
import AddFuelData from "./components/AddFuelData";
import RawMaterialDashboard from "./components/Dashboard/RawMaterialDashboard";
import FuelProviderDashboard from "./components/Dashboard/FuelProviderDashboard";
import GoodsSupplierDashboard from "./components/Dashboard/GoodsSupplierDashboard";
import AddGoodsAndServices from "./components/AddGoodsAndServices";
import LogisticsDashboard from "./components/Dashboard/LogisticsDashboard";
import CompanySelection from "./components/CompanySelection";
import ipfs from './ipfs'
import Report from "./pages/Report";
import ElectricityDashboard from "./components/Dashboard/ElectricityDashboard";
import VerificationStatus from "./components/VerificationStatus";
import ElectricitySupplierDashboard from "./pages/test.jsx";
import CarbonReport from "./pages/CarbonReport.jsx";


function App() {
  const location = useLocation();

  const dashboardRoutes = [
    "/company-dashboard",
    "/raw-material-dashboard",
    "/fuel-dashboard",
    "/goods-supplier-dashboard",
    "/electricity-supplier-dashboard"
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
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/reports" element={<Report/>}/>
          <Route path="/company-selection/:userId" element={<CompanySelection />} />
          <Route path="/company-dashboard/:userId/*" element={<CompanyDashboard />} >
            <Route path="add-electricity" element={<AddElectricity />} />
            <Route path="add-co2-emissions" element={<AddCO2Emissions />} />
            <Route path="add-raw-material" element={<AddRawMaterial />} />
            <Route path="add-goods" element={<AddGoodsAndServices/>} />
            <Route path="add-fuel" element={<AddFuelData/>} />
            <Route path="verification-status" element={<VerificationStatus/>}/>
            <Route path="carbon-report" element={<CarbonReport/>}/>         
          {/* Add more dashboard routes here */}
        </Route>
        <Route path="/goods-supplier-dashboard/:userId/*" element={<GoodsSupplierDashboard />} >
            <Route path="add" element={<AddGoodsAndServices/>} />
            
          {/* Add more dashboard routes here */}
        </Route>
        <Route path="/raw-material-dashboard/:userId/*" element={<RawMaterialDashboard/>} >
            <Route path="add" element={<AddRawMaterial />} />
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

        <Route path="/electricity-supplier-dashboard/:userId/" element={<ElectricityDashboard/>}/>
        <Route path="/test" element={<ElectricitySupplierDashboard/>}/>
        <Route path="/carbon-report/:userId/" element={<CarbonReport/>}/>
        
        </Routes>
        {!isDashboardRoute() && <Foot />}
       
       
      
    </div>
  );
}

export default App;
