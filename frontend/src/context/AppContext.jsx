import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [projectData, setProjectData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard') // dashboaord, search, upload, documents
  const [searchData, setSearchData] = useState({
    search_string: '',
        location: '',
        budget: ''
  })
  const [dashboardData, setDashboardData] = useState(null)
  const [inputType, setInputType] = useState('text')
  const [documents, setDocuments] = useState([])

  return (
    <AppContext.Provider value={{ 
        projectData,
        setProjectData, 
        activeTab, 
        setActiveTab,
        searchData,
        setSearchData,
        dashboardData,
        setDashboardData,
        inputType,
        setInputType,
        documents,
        setDocuments
    }}>
      {children}
    </AppContext.Provider>
  );
};