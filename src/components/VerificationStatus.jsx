// import React from 'react'

// const VerificationStatus = () => {
//   return (
//     <div>
//         {/* Verification status Table */}
//         <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 my-4">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr>
//                   <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">Category</th>
//                   <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-b border-gray-300">
//                   <td className="py-3 px-6 text-gray-700 font-medium">Category 1</td>
//                   <td className="py-3 px-6">
//                     <span
//                       className={'*:first-line:py-1 px-3 rounded-full text-sm font-semibold bg-green-100 text-green-600'}
//                     >
//                       Verified
//                     </span>
//                     <span
//                       className={'py-1 px-3 rounded-full text-sm font-semibold bg-red-100 text-red-600'}
//                     >
//                       Not Verified
//                     </span>
//                   </td>
//                 </tr>
//                 <tr className="border-b border-gray-300">
//                   <td className="py-3 px-6 text-gray-700 font-medium">Category 2</td>
//                   <td className="py-3 px-6">
//                     <span
//                       className={'py-1 px-3 rounded-full text-sm font-semibold bg-green-100 text-green-600'}
//                     >
//                       Verified
//                     </span>
//                     <span
//                       className={'*:first-line:py-1 px-3 rounded-full text-sm font-semibold bg-red-100 text-red-600'}
//                     >
//                       Not Verified
//                     </span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
    
//   )
// }

// export default VerificationStatus



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerificationStatus = () => {
  const [verificationData, setVerificationData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { userId } = useParams();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchElectricityData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/electricity-data`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log("Data:", data)
            console.log("Electricity Data:", data.electricityData);
            

            if (response.ok) {
                setVerificationData(data.electricityData); // Adjust key as per your API
            } else {
                setErrorMessage(data.message || 'Failed to fetch electricity data');
            }
        } catch (err) {
            setErrorMessage('Error fetching electricity data');
        }
    };

    fetchElectricityData();
}, [userId, token]);
  return (
    <div>
      {errorMessage && (
        <div className="text-red-500 font-medium mb-4">{errorMessage}</div>
      )}
      {/* Verification status Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 my-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">
                Category
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">
                Status
              </th>
              <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">
                Remark
              </th>
            </tr>
          </thead>
          <tbody>
            {verificationData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-3 px-6 text-gray-700 font-medium">{item.category || 'Electricity'}</td>
                <td className="py-3 px-6">
                  {item.verified ? (
                    <span className="py-1 px-3 rounded-full text-sm font-semibold bg-green-100 text-green-600">
                      Verified
                    </span>
                  ) : (
                    <span className="py-1 px-3 rounded-full text-sm font-semibold bg-red-100 text-red-600">
                      Not Verified
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-700">
                  {item.remark || 'No remarks available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationStatus;
