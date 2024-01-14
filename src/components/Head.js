import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faTableColumns, faCubes, faDollarSign, faPlus, faMinus, faUser, faGear, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import NavBtn from './NavBtn';

const Head = () => {
    const [dashboardClk, setDashboardClk] = useState(false);
    const [productClk, setProductClk] = useState(false);
    const [transactionClk, setTransactionClk] = useState(false);
    const [inboundClk, setInboundClk] = useState(false);
    const [outboundClk, setOutboundClk] = useState(false);
    const [profileClk, setProfileClk] = useState(false);
    const [settingClk, setSettingClk] = useState(false);

    useEffect(() => {
        const activeHeadButton = localStorage.getItem('activeHeadButton');
        if(!activeHeadButton)
            setDashboardClk(true);
        else
            handleOnClick(activeHeadButton);
    }, []);

    const handleOnClick = (btnName) => {
        setDashboardClk(false);
        setProductClk(false);
        setTransactionClk(false);
        setInboundClk(false);
        setOutboundClk(false);
        setProfileClk(false);
        setSettingClk(false);

        switch(btnName){
            case 'Dashboard':
                setDashboardClk(true);
                break;

            case 'Product':
                setProductClk(true);
                break;

            case 'Transaction':
                setTransactionClk(true);
                break;

            case 'Inbound':
                setInboundClk(true);
                break;
            
            case 'Outbound':
                setOutboundClk(true);
                break;

            case 'Profile':
                setProfileClk(true);
                break;

            case 'Setting':
                setSettingClk(true);
                break;

            default:
                console.error('Invalid');
        }

        localStorage.setItem('activeHeadButton', btnName);
    }

    return(
        <section className='w-64 h-screen flex flex-col bg-raisinblack'>
            <h1 className='mx-auto my-6'>
                <FontAwesomeIcon icon={faCube} className='mr-2 text-4xl text-blue-600'/>
                <span className='text-2xl'>
                    Cataloga
                </span>
            </h1>
            <div className='flex flex-col justify-between my-6 h-full text-lg'>
                <nav className='flex flex-col gap-2'>
                    <Link to='' className="w-10/12 mx-auto" onClick={() => handleOnClick('Dashboard')}>
                        <NavBtn
                            btnLink={''}
                            btnName={'Dashboard'}
                            btnIcon={<FontAwesomeIcon icon={faTableColumns} className='pl-5 pr-4'/>}
                            setClick={dashboardClk}
                        />
                    </Link>
                    <Link to='products' className="w-10/12 mx-auto" onClick={() => handleOnClick('Product')}>
                        <NavBtn
                            btnName={'Product'}
                            btnIcon={<FontAwesomeIcon icon={faCubes} className='pl-5 pr-4'/>}
                            setClick={productClk}
                        />
                    </Link>
                    <Link to='transactions' className="w-10/12 mx-auto" onClick={() => handleOnClick('Transaction')}>
                        <NavBtn
                            btnName={'Transaction'}
                            btnIcon={<FontAwesomeIcon icon={faDollarSign} className='pl-5 pr-5'/>}
                            setClick={transactionClk}
                        />
                    </Link>
                    <Link to='inbound' className="w-10/12 mx-auto" onClick={() => handleOnClick('Inbound')}>
                        <NavBtn
                            btnName={'Inbound'}
                            btnIcon={<FontAwesomeIcon icon={faPlus} className='pl-5 pr-4'/>}
                            setClick={inboundClk}
                        />
                    </Link>
                    <Link to='outbound' className="w-10/12 mx-auto" onClick={() => handleOnClick('Outbound')}>
                        <NavBtn
                            btnName={'Outbound'}
                            btnIcon={<FontAwesomeIcon icon={faMinus} className='pl-5 pr-4'/>}
                            setClick={outboundClk}
                        />
                    </Link>
                    <Link to='profile' className="w-10/12 mx-auto" onClick={() => handleOnClick('Profile')}>
                        <NavBtn
                            btnName={'Profile'}
                            btnIcon={<FontAwesomeIcon icon={faUser} className='pl-5 pr-4'/>}
                            setClick={profileClk}
                        />
                    </Link>
                    <Link to='setting' className="w-10/12 mx-auto" onClick={() => handleOnClick('Setting')}>
                        <NavBtn
                            btnName={'Setting'}
                            btnIcon={<FontAwesomeIcon icon={faGear} className='pl-5 pr-4'/>}
                            setClick={settingClk}
                        />
                    </Link>
                </nav>
                <button className='w-10/12 mx-auto py-3 rounded-xl text-xl text-left text-red-400 hover:underline'>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='pl-5 pr-4'/>
                    Log Out
                </button>
            </div>
        </section>
    );
}

export default Head;