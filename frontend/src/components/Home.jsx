import { useState } from "react";
import SearchPage from "./SearchPage";
import Navbar from "./Navbar";
import ProjectDisplay from "./ProjectDisplay";
import UnclearInput from "./UnclearInput";
import IntroPage from "./IntroPage";
import DashboardLayout from "./dashboard/DashboardLayout";

const Home = () => {
    const [projectData, setProjectData] = useState(null)

    function handleSearch(data) {
        setProjectData(data);
    }
    
    return (
        <div className="bg-white dark:bg-gray-900 min-h-[100svh]">
            {/* <IntroPage /> */}
            {/* <Navbar /> */}
            <DashboardLayout />
            {/* {!projectData && <SearchPage searchHandler={handleSearch} />}
            {projectData && !projectData.error && <ProjectDisplay data={projectData} onBackToSearch={handleSearch} />}
            {projectData && projectData.error && <UnclearInput data={projectData} onBackToSearch={handleSearch} />} */}
        </div>
    )
}

export default Home
