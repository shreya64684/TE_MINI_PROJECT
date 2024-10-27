import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                // Save token and user data (if needed)
                localStorage.setItem('token', data.token); // Store JWT token for further requests
                localStorage.setItem('userId', data.user.id);
                // localStorage.setItem('userRole', data.user.role);
                const role = data.user.role;
                const userId = data.user.id;
                console.log(userId);
                
                if (role === 'Admin') navigate(`/admin-dashboard/${userId}`);
                if (role === 'Company') navigate(`/company-dashboard/${userId}`);
                if (role === 'RawMaterialProvider') navigate(`/raw-material-dashboard/${userId}`);
                if (role === 'FuelProvider') navigate(`/fuel-dashboard/${userId}`);
                if (role === 'GoodsSupplier') navigate(`/goods-supplier-dashboard/${userId}`);
                if (role === 'LogisticsPartner') navigate(`/logistics-dashboard/${userId}`);
                
            
            
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in, please try again');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-200">
            <form onSubmit={handleSubmit} className='flex max-w-md flex-col gap-6 justify-center p-6 bg-white shadow-md rounded-lg'>
                <h2 className="text-2xl font-semibold text-center text-emerald-700 mb-4">Login</h2>
                {error && <div className="mb-4 text-red-500">{error}</div>}
                <div className='mb-5'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='mb-5'>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <button type="submit" className='w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200'>
                    Login
                </button>
                <div className="mt-4 text-center">
                    <p className="text-sm">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
