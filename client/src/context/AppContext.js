import React, { createContext, useContext, useEffect, useCallback, useState } from "react";
import axios from 'axios'
const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const data = localStorage.getItem('user-info');
  const token = JSON.parse(data)?.token;

  // const [appData, setAppData] = useState(null);

  // const fetchAppData = useCallback(async () => {
  //   try {
  //   } catch (err) {

  //   }
  // }, []);

  
  // useEffect(() => {
  //   fetchAppData();
  // }, [fetchAppData]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // fetching all folders
  const [folders,setFolders]=useState([{ name: 'All Assets'}]);
  async function GetFolders(){
      try{
        const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_folders`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
        const obj=response?.data;
        const folders = [
          { name: "All Assets" },
          ...obj.map((e) => (e)),
          ];
          setFolders(folders);
      }
      catch(err){
        console.log("Error in getting Folders",err.message);
      }
    }

    // fetching all the assets
    const [mockAssets,setMockAsset]=useState([]);
    const fetchAssets = async () => {
        try {
        const response=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/all_assets`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
          })
        console.log(response);
        setMockAsset(response?.data?.assets)
        } catch (err) {
          console.error('Failed to fetch assets:', err.message);
        }
      };

     useEffect(()=>{
        if(!isAuthenticated)
            return;
        GetFolders();
        fetchAssets();
    },[isAuthenticated])
  return (
    <AppContext.Provider
      value={{
        // appData,
        // fetchAppData, 
        folders,
        setFolders,
        GetFolders,
        mockAssets,
        setMockAsset,
        fetchAssets,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
