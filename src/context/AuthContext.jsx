'use client'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);
  
export const useAuth = () => useContext(AuthContext);

const apiClient = axios.create({
    baseURL: "http://localhost:5279",
    withCredentials: true,
});

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // const mockUser = {
    //     email: "test@example.com"
    // };
    const mockUser = {
        email: "dido.hadzhiev17@gmail.com"
    };
    useEffect(() => {
        if (process.env.NEXT_PUBLIC_ENABLE_DEV_LOGIN === "true") {
            setUser(mockUser);
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            checkAuth();
        }
    }, []);

    const checkAuth = async () => {
        try {
            const response = await apiClient.get("api/auth/AuthMe", { withCredentials: true });
            if (response.status === 200) {
                setUser(response.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            if (error.response?.status === 401 && error.response?.data?.message === "Token expired") {
                try {
                    const refreshResponse = await apiClient.post('api/Login/Refresh', {}, { withCredentials: true });
                    if (refreshResponse.status === 200) {
                        const retry = await apiClient.get("api/auth/AuthMe", { withCredentials: true });
                        setUser(retry.data);
                        setIsAuthenticated(true);
                    }
                } catch (err) {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const login = () => {
        setUser(mockUser);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout, apiClient }}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};




// 'use client'

// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { useRouter } from "next/navigation";
// import { useState, useEffect,createContext, useContext } from "react"

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// const apiClient = axios.create({
//     baseURL: "http://localhost:5279",
//     withCredentials: true,
//   });

// export const AuthProvider = ({children}) =>{
//     const router = useRouter();
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
   
//     const checkAuth = async () => {
//         try{
//         const response = await apiClient.get("api/auth/AuthMe", {withCredentials: true})
//         if (response.status === 200){
//             setUser(response.data);
//             setIsAuthenticated(true);
//         }
//         } catch(error) {
//             if (error.response?.status === 401 && error.response?.data?.message === "Token expired"){
//                 try {
//                     const refreshResponse = await apiClient.post('api/Login/Refresh',{}, {withCredentials: true});
//                     if (refreshResponse === 200){
//                         const retry = await apiClient.get("api/auth/AuthMe", {withCredentials: true,})
//                         setUser(retry.data);
//                         setIsAuthenticated(true);
//                     }
//                 }catch(err){
//                     setUser(null);
//                     setIsAuthenticated(false)
//                 }
//             } else {
//                 setUser(null);
//                 setIsAuthenticated(false)
//             }
           
//         }finally{
//             setLoading(false);
//         }
//     };

//     useEffect( () =>{
//         checkAuth()
//     },[]);
    
//   const login =() => {
//     checkAuth(); // later hier miss login
//   };

//   const logout = () => {
//     setUser(null);
//     setIsAuthenticated(false);
//     setLoading(false);
//     router.push('/')
//   };

//     return(
//         <AuthContext.Provider value={{user,loading, isAuthenticated, login, logout, apiClient}}>
//             {!loading ? children : <div>Loading...</div>}
//         </AuthContext.Provider>
//     );
    
// } 