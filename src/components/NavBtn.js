const NavBtn = ({btnName, btnIcon, setClick}) => {
    return(
        setClick === true ? (
            <button className="py-3 w-full text-left rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 backdrop-blur-lg">
                <span className='py-3.5'>{btnIcon}</span>
                <span className='py-3.5 font-semibold'>{btnName}</span>
            </button>
        ) : (
            <button className="py-3 w-full text-slate-300 text-left rounded-xl">
                <span className='py-3.5'>{btnIcon}</span>
                <span className='py-3.5'>{btnName}</span>
            </button>
        )
    );
}

export default NavBtn;