import { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import Navbar from "./Navbar";
import ProjectDisplay from "./ProjectDisplay";
import UnclearInput from "./UnclearInput";
import LoadingScreen from "./LoadingScreen";
import axios from 'axios'

const Home = () => {
    const [projectData, setProjectData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    function handleSearch(data) {
        setProjectData(data);
    }

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL+'/')
            .then(response => {
                setIsLoading(!response.data.isRunning)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])

    return !isLoading ? (
        <div className="bg-white dark:bg-gray-900">
            <Navbar />
            {!projectData && <SearchPage searchHandler={handleSearch} />}
            {projectData && !projectData.error && <ProjectDisplay data={projectData} onBackToSearch={handleSearch} />}
            {projectData && projectData.error && <UnclearInput data={projectData} onBackToSearch={handleSearch} />}
        </div>
    ) : (
        <div className="bg-white dark:bg-gray-900">
            <LoadingScreen />
        </div>
    )
}

export default Home
