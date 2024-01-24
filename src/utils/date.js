export const getMonthName = (date) => {
    date = new Date(date);
    return date.toLocaleString('default', { month: 'long'});
};