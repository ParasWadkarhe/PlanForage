import { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import Navbar from "./Navbar";
import ProjectDisplay from "./ProjectDisplay";
import UnclearInput from "./UnclearInput";

const Home = () => {
    const [projectData, setProjectData] = useState(null)

    function handleSearch(data) {
        setProjectData(data);
    }

    return (
        <>
            <Navbar />
            {!projectData && <SearchPage searchHandler={handleSearch} />}
            {projectData && !projectData.error && <ProjectDisplay data={projectData} onBackToSearch={handleSearch} />}
            {projectData && projectData.error && <UnclearInput data={projectData} onBackToSearch={handleSearch} />}
        </>
    )
}

export default Home
