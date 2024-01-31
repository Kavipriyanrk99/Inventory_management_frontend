// 12 hours format
export const getIST = (utcDate) => {
    const timeInIST = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'Asia/Kolkata',
                    }).format(new Date(utcDate));
    
    const formatedIST = timeInIST.replaceAll('/', '-').replace(', ', 'T').replace(' ', '');
    const [MM, dd, yyyy] = formatedIST.split('T')[0].split('-');
    const formatedDate =  yyyy + "-" + MM + "-" + dd + 'T' + formatedIST.split('T')[1];
    return formatedDate; 
}

// 24 hours format
export const getISTMilitary = (utcDate) => {
    const timeInIST = new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'Asia/Kolkata',
                    }).format(new Date(utcDate));

    const formatedIST = timeInIST.replaceAll('/', '-').replace(', ', 'T').replace(' ', '');
    const [MM, dd, yyyy] = formatedIST.split('T')[0].split('-');
    const formatedDate =  yyyy + "-" + MM + "-" + dd + 'T' + formatedIST.split('T')[1];
    return formatedDate; 
}

// 12 hours format
export const getRegularTime = (date) => {
    date = getIST(new Date(date));
    const time = date.split('T')[1];
    return time;
}

export const getMonthName = (date) => {
    date = new Date(date);
    return date.toLocaleString('default', { month: 'long'});
};

export const getUTC = (istDate, istTime) => {
    const formatedDate = istDate + "T" + istTime + ":00";
    const utcDate = new Date(formatedDate).toISOString();

    return utcDate;
}