import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projectData, setProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard') // dashboaord, search, upload, documents
  const [searchData, setSearchData] = useState({
    search_string: 'mobile app like youtube',
        location: 'mumbai',
        budget: '40000'
  })
  const [dashboardData, setDashboardData] = useState(null)

  return (
    <AppContext.Provider value={{ 
        projectData,
        setProjectData, 
        activeTab, 
        setActiveTab,
        searchData,
        setSearchData,
        dashboardData,
        setDashboardData
    }}>
      {children}
    </AppContext.Provider>
  );
};