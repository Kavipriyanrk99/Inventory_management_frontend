import { useEffect, useRef, useState } from "react";
import { randomHexColorCode } from "../utils/randomColorGenerator";

const ProductAvatar = ({ productName, transaction }) => {
    const avatarRef = useRef();
    const [bgColor, setBgColor] = useState("#ffffff");
    
    useEffect(() => {
        const color = randomHexColorCode;
        setBgColor(color);
    }, [transaction]);

    useEffect(() => {
        if(avatarRef.current){
            avatarRef.current.style.backgroundColor = bgColor;
        }
    }, [bgColor]);


    return(
        <div ref={avatarRef}  className='w-12 h-12 rounded-3xl flex justify-center items-center font-bold uppercase'>
            {
                productName.length > 1 ?
                    productName.slice(0,2) :
                    productName.slice(0,1)
            }
        </div>
    );
}

export default ProductAvatar;