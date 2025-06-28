
import SearchInput from './SearchInput'
import UnclearInput from './UnclearInput'
import ProjectDisplay from '../ProjectDisplay'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const SearchLayout = () => {

    const {projectData} = useContext(AppContext)


    return (
        <div className="bg-white dark:bg-gray-900 min-h-[100svh]">
            {!projectData && <SearchInput />}
            {projectData && !projectData.error && <ProjectDisplay  />}
            {projectData && projectData.error && <UnclearInput />}
        </div>
    )
}


export default SearchLayout
// 