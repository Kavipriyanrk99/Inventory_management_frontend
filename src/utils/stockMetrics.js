export const stockWorthFinder = ( products ) => {
    let price = 0;
    for(let index = 0; index < products.length; index++){
        price += parseFloat(products[index].unitPrice) * parseInt(products[index].quantityInStock);
    }
    return price;
}

export const stockUnitsFinder = ( products ) => {
    let units = 0;
    for(let index = 0; index < products.length; index++){
        units += parseInt(products[index].quantityInStock);
    }
    return units;
}

export const inboundMovementFinder = ( products ) => {
    let inboundUnits = 0;
    let outboundUnits = 0;
    let totalUnits = 0;
    for(let index = 0; index < products.length; index++){
       inboundUnits += parseInt(products[index].totalInbound);
       outboundUnits += parseInt(products[index].totalOutbound);
    }
    
    totalUnits += inboundUnits + outboundUnits;
    return (parseFloat(inboundUnits) * 100 / parseFloat(totalUnits)).toFixed(2);
} 

export const outboundMovementFinder = ( products ) => {
    let inboundUnits = 0;
    let outboundUnits = 0;
    let totalUnits = 0;
    for(let index = 0; index < products.length; index++){
       inboundUnits += parseInt(products[index].totalInbound);
       outboundUnits += parseInt(products[index].totalOutbound);
    }
    
    totalUnits += inboundUnits + outboundUnits;
    return (parseFloat(outboundUnits) * 100 / parseFloat(totalUnits)).toFixed(2);
} 