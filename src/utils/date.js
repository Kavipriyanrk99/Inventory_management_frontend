export const getIST = (date) => {
    const timeInIST = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: 'numeric',
                        timeZone: 'Asia/Kolkata',
                    }).format(new Date(date));
    
    const formatedIST = timeInIST.replaceAll('/', '-').replace(', ', 'T').replace(' ', '');
    const [MM, dd, yyyy] = formatedIST.split('T')[0].split('-');
    const formatedDate =  yyyy + "-" + MM + "-" + dd + 'T' + formatedIST.split('T')[1];
    return formatedDate; 
}

export const getMonthName = (date) => {
    date = new Date(date);
    return date.toLocaleString('default', { month: 'long'});
};

export const getRegularTime = (date) => {
    date = getIST(new Date(date));
    const time = date.split('T')[1];
    return time;
}