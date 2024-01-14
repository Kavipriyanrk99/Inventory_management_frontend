import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const User = ({ username }) => {
    return(
        <div className='bg-raisinblack min-w-48 px-2 py-2 rounded-xl m-2 flex justify-center items-center'>
            <FontAwesomeIcon 
                icon={faUser}  
                className='p-2 rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 backdrop-blur-lg'
            />
            <h3 className='w-full px-2'>
                {username}
            </h3>
            <FontAwesomeIcon 
                icon={faAngleDown} 
                className='p-2 rounded-lg'
            />
        </div>
    );
}

export default User;