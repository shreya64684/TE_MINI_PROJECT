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

const VerificationStatus = ({ userId, token }) => {
  const [verificationData, setVerificationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/company/${userId}/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Combine and transform the data for rendering
          const transformedData = [
            {
              category: 'Electricity Data',
              verified: data.electricityData.every((item) => item.verified && item.accepted),
            },
            {
              category: 'CO2 Emissions Data',
              verified: data.co2EmissionsData.every((item) => item.verified && item.accepted),
            },
            {
              category: 'Raw Material Data',
              verified: data.rawMaterialData.every((item) => item.verified && item.accepted),
            },
          ];

          setVerificationData(transformedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching verification data:', error);
      }
    };

    fetchData();
  }, [userId, token]);

  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            {verificationData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-3 px-6 text-gray-700 font-medium">{item.category}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificationStatus;
