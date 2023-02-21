export function extractYearFromDate(date) {
    let d = new Date();
    d.setTime(Date.parse(date));
    return (!isNaN(d.getFullYear())) ? d.getFullYear() : undefined;
}

export function extractDateFromDate(date){
    return date.toString().substring(0, 10);
}

export function minutesToHoursAndMinutes(minutes){
    const h = Math.floor(minutes/60);
    const min = minutes - h*60;
    return `${h}h ${min}min`;
}