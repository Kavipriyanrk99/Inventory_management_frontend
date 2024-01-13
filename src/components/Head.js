import { Link } from 'react-router-dom';

const Head = () => {
    return(
        <section>
            <h1>Cataloga</h1>
            <div>
                <nav>
                    <Link to=''>
                        Dashboard
                    </Link>
                    <Link to='products'>
                        Product
                    </Link>
                    <Link to='transactions'>
                        Transaction
                    </Link>
                    <Link to='inbound'>
                        Inbound
                    </Link>
                    <Link to='outbound'>
                        Outbound
                    </Link>
                    <Link to='profile'>
                        Profile
                    </Link>
                    <Link to='setting'>
                        Setting
                    </Link>
                </nav>
                <button>
                    log out
                </button>
            </div>
        </section>
    );
}

export default Head;