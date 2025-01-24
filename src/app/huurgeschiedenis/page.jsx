// // app/huurgeschiedenis/page.jsx
// "use client";
// import { useEffect, useState } from "react";
// import { useAuth } from '../context/AuthContext';
// import axios from "axios";

// export default function HuurgeschiedenisPage() {
//   const { user, apiClient } = useAuth();
//   const [huurAanvragen, setHuurAanvragen] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHuurAanvragen = async () => {
//       try {
//         const response = await apiClient.get("/api/Aanvraag/GetHuurAanvragen");
//         if (response.status === 200) {

//           const parsedAanvragen = response.data.map((aanvraag) => ({
//             ...aanvraag,
//             Start: new Date(aanvraag.Start),
//             Einde: new Date(aanvraag.Einde),
//           }));
//           setHuurAanvragen(parsedAanvragen);
//         } else {
//           setError("Failed to fetch rental history");
//         }
//       } catch (err) {
//         setError(err.message || "An error occurred while fetching rental history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user) {
//       fetchHuurAanvragen();
//     }
//   }, [user, apiClient]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Huurgeschiedenis</h1>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Alle Huuraanvragen</h2>
//         {huurAanvragen.length === 0 ? (
//           <p className="text-gray-600">Geen huuraanvragen gevonden.</p>
//         ) : (
//           <div className="space-y-4">
//             {huurAanvragen.map((aanvraag, index) => (
//               <div key={index} className="p-4 border rounded bg-gray-50">
//                 <p><strong>Voertuig ID:</strong> {aanvraag.IdVoertuig}</p>
//                 <p><strong>Huurder ID:</strong> {aanvraag.HuurderId}</p>
//                 <p><strong>Startdatum:</strong> {aanvraag.Start.toLocaleDateString()}</p>
//                 <p><strong>Einddatum:</strong> {aanvraag.Einde.toLocaleDateString()}</p>
//                 <p><strong>Status:</strong> {aanvraag.Status}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useAuth } from '../context/AuthContext';

// // function formatDate(dateString) {
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) {
// //       // Handle invalid dates (e.g., "-infinity")
// //       return "N/A";
// //     }
// //     return date.toLocaleDateString();
// //   }
  
// //   export default function HuurgeschiedenisPage() {
// //     const { user } = useAuth(); // Get the authenticated user from the context
// //     const [huurgeschiedenis, setHuurgeschiedenis] = useState([]); // State to store rental history
// //     const [loading, setLoading] = useState(true); // Loading state
// //     const [error, setError] = useState(null); // Error state
  
// //     useEffect(() => {
// //       const fetchHuurgeschiedenis = async () => {
// //         if (!user?.email) {
// //           setError("User email not found.");
// //           setLoading(false);
// //           return;
// //         }
  
// //         try {
// //           const response = await fetch(`/api/Aanvraag/GetHuurAanvragen`, {
// //           // const response = await fetch(`/api/Huur/GetHuurByEmail?email=${user.email}`, {
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             credentials: "include",
// //           });
  
// //           if (!response.ok) {
// //             throw new Error("Failed to fetch rental history");
// //           }
  
// //           const data = await response.json();
// //           setHuurgeschiedenis(data);
// //         } catch (err) {
// //           setError(err.message);
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
  
// //       fetchHuurgeschiedenis();
// //     }, [user]);
  
// //     if (loading) {
// //       return <div>Loading...</div>;
// //     }
  
// //     if (error) {
// //       return <div className="text-red-500">{error}</div>;
// //     }
  
// //     return (
// //       <div className="min-h-screen bg-gray-100 p-8">
// //         <h1 className="text-3xl font-bold mb-8">Huurgeschiedenis</h1>
// //         <div className="bg-white p-6 rounded-lg shadow-md">
// //           {huurgeschiedenis.length === 0 ? (
// //             <p className="text-gray-600">Geen huurgeschiedenis gevonden.</p>
// //           ) : (
// //             <div className="space-y-4">
// //               {huurgeschiedenis.map((huur) => (
// //                 <div key={huur.Id} className="p-4 border rounded bg-gray-50">
// //                   <p>
// //                     <strong>Voertuig ID:</strong> {huur.IdVoertuig}
// //                   </p>
// //                   <p>
// //                     <strong>Startdatum:</strong> {formatDate(huur.Start)}
// //                   </p>
// //                   <p>
// //                     <strong>Einddatum:</strong> {formatDate(huur.Einde)}
// //                   </p>
// //                   <p>
// //                     <strong>Status:</strong> {huur.Goedgekeurd ? "Goedgekeurd" : "Afgekeurd"}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   }






// // // export default function HuurgeschiedenisPage() {
// // //     const { user } = useAuth();
// // //     const [huurgeschiedenis, setHuurgeschiedenis] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);
  
// // //     useEffect(() => {
// // //       const fetchHuurgeschiedenis = async () => {
// // //         if (!user?.email) {
// // //           setError("User email not found.");
// // //           setLoading(false);
// // //           return;
// // //         }
  
// // //         try {
// // //           const response = await fetch(`/api/Huur/GetHuurByEmail?email=${user.email}`,
// // //             {
// // //               headers: {
// // //                 "Content-Type": "application/json",
// // //               },
// // //               credentials: "include",
// // //             }
// // //           );
  
// // //           if (!response.ok) {
// // //             throw new Error("Failed to fetch rental history");
// // //           }
  
// // //           const data = await response.json();
// // //           setHuurgeschiedenis(data);
// // //         } catch (err) {
// // //           setError(err.message);
// // //         } finally {
// // //           setLoading(false);
// // //         }
// // //       };
  
// // //       fetchHuurgeschiedenis();
// // //     }, [user]);
  
// // //     if (loading) {
// // //       return (
// // //         <div className="min-h-screen bg-gray-100 p-8">
// // //           <h1 className="text-3xl font-bold mb-8">Huurgeschiedenis</h1>
// // //           <p className="text-gray-600">Loading...</p>
// // //         </div>
// // //       );
// // //     }
  
// // //     if (error) {
// // //       return (
// // //         <div className="min-h-screen bg-gray-100 p-8">
// // //           <h1 className="text-3xl font-bold mb-8">Huurgeschiedenis</h1>
// // //           <p className="text-red-500">Error: {error}</p>
// // //         </div>
// // //       );
// // //     }
  
// // //     if (!huurgeschiedenis || huurgeschiedenis.length === 0) {
// // //       return (
// // //         <div className="min-h-screen bg-gray-100 p-8">
// // //           <h1 className="text-3xl font-bold mb-8">Huurgeschiedenis</h1>
// // //           <p className="text-gray-600">Geen huurgeschiedenis gevonden.</p>
// // //         </div>
// // //       );
// // //     }
  
// // //     return (
// // //       <div className="min-h-screen bg-gray-100 p-8">
// // //         <h1 className="text-3xl font-bold mb-8">Huurgeschiedenis</h1>
// // //         <div className="space-y-4">
// // //           {huurgeschiedenis.map((huur) => (
// // //             <div key={huur.Id} className="p-4 border rounded bg-white shadow-sm">
// // //               <p>
// // //                 <strong>Voertuig ID:</strong> {huur.IdVoertuig}
// // //               </p>
// // //               <p>
// // //                 <strong>Startdatum:</strong>{" "}
// // //                 {huur.Start ? new Date(huur.Start).toLocaleDateString() : "Invalid Date"}
// // //               </p>
// // //               <p>
// // //                 <strong>Einddatum:</strong>{" "}
// // //                 {huur.Einde ? new Date(huur.Einde).toLocaleDateString() : "Invalid Date"}
// // //               </p>
// // //               <p>
// // //                 <strong>Status:</strong> {huur.Status}
// // //               </p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     );
// // //   }