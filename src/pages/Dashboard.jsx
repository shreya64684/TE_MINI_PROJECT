const Dashboard = () => {
    const role = localStorage.getItem('userRole');

    return (
        <div>
            {role === 'Admin' && <AdminDashboard />}
            {role === 'Company' && <CompanyDashboard />}
            {role === 'RawMaterialProvider' && <RawMaterialDashboard />}
            {role === 'FuelProvider' && <RawMaterialDashboard />}
            {role === 'GoodsSupplier' && <RawMaterialDashboard />}
            {role === 'LogisticsPartner' && <RawMaterialDashboard />}
            {/* Add more components for different roles */}
        </div>
    );
};
