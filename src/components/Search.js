import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({ search, setSearch }) => {
    return(
        <form className='bg-raisinblack min-w-64 p-1.5 rounded-xl m-2 flex justify-center items-center'>
            <label className='hidden'>search product</label>
            <input
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='bg-transparent outline-none w-52 px-3 text-blue-500'
            ></input>
            <FontAwesomeIcon 
                icon={faMagnifyingGlass} 
                className='p-2 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg hover:cursor-pointer' 
            />
        </form>
    );
}

export default Search;