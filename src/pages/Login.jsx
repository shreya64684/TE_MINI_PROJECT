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
                // if (role === 'ElectricitySupplier') navigate(`/electricity-supplier-dashboard/${userId}`);
                if (role === 'ElectricitySupplier') navigate(`/company-selection/${userId}`);


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
            {/* <form onSubmit={handleSubmit} className='flex max-w-md flex-col gap-6 justify-center p-6 bg-white shadow-md rounded-lg'>
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
            </form> */}

            <div className="flex min-h-screen items-center justify-center bg-green-200 p-4">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <h2 className="text-2xl font-bold text-center text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Login to your account
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-medium">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <a href="#" className="text-sm text-blue-500 hover:underline float-right">
                                Forgot your password?
                            </a>
                        </div>
                        <button
                            type="submit"
                            href="/register"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex items-center justify-center gap-2 my-4">
                        <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
                            Google
                        </button>
                        <button className="w-full border py-2 rounded-lg hover:bg-gray-100">
                            Apple
                        </button>
                    </div>
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
