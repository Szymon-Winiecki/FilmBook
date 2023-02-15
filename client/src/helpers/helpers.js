export function extractYearFromDate(date) {
    let d = new Date();
    d.setTime(Date.parse(date));
    return (!isNaN(d.getFullYear())) ? d.getFullYear() : undefined;
}