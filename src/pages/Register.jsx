import React, { useState } from 'react';
import UserTypeDropdown from '../components/UserTypeDropDown'; // Assuming you have this component for selecting user type
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { username, email, password, role: userType };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', { // Adjust the URL according to your setup
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (response.ok) {
                // Handle successful registration (e.g., redirect or show a success message)
                console.log(data);
                localStorage.setItem('userRole', data.user.role)
                navigate('/login');
                // Optionally reset form fields
                setUsername('');
                setEmail('');
                setPassword('');
                setUserType('');
            } else {
                // Handle error (e.g., show an error message)
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-200 pb-10">
            {/* <form onSubmit={handleSubmit} className='mt-[100px] flex max-w-lg max-w-md flex-col gap-6 justify-center p-6 bg-white shadow-md rounded-lg'>
                <h1 className='text-center text-emerald-700 text-3xl py-10'>Registration Form</h1>
                <div className='mb-5'>
                    <UserTypeDropdown selectedType={userType} setSelectedType={setUserType} />
                </div>
                <div className='mb-5'>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
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
                    Register
                </button>
                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form> */}

            <div className="flex min-h-screen items-center justify-center bg-green-200 p-4">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">

                    <h2 className="text-2xl font-bold text-center text-gray-900">
                        Registration Form
                    </h2>
                    <div className='mb-5'>
                        <UserTypeDropdown selectedType={userType} setSelectedType={setUserType} />
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className='mb-5'>
                            <label htmlFor="username" className="block text-gray-700 font-medium">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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

                        </div>
                        <button
                            type="submit"
                            href="/register"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account? {" "}
                        <Link to="/login"><a href="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </a></Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
