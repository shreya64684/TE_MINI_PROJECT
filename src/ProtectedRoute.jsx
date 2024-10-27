import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const role = localStorage.getItem('userRole');

    if (!role) {
        return <Navigate to="/login" />;
    }

    // Navigate based on role
    switch (role) {
        case 'Admin':
            return <Navigate to="/admin-dashboard" />;
        case 'Company':
            return <Navigate to="/company-dashboard" />;
        case 'RawMaterialProvider':
            return <Navigate to="/raw-material-dashboard" />;
        case 'FuelProvider':
            return <Navigate to="/fuel-dashboard" />;
        case 'GoodsSupplier':
            return <Navigate to="/goods-and-services-dashboard" />;     
            case 'LogisticsPartner':
                return <Navigate to="/logistics-dashboard" />;   
        // Add more cases as needed
        default:
            return <Navigate to="/login" />;
    }
};
