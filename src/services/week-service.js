var weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export const getFirstDayOfWeek = (date, from) => {
    from = from || 'Sunday';
    var index = weekday.indexOf(from);
    var start = index >= 0 ? index : 0;

    var d = new Date(date);
    var day = d.getDay();
    var diff = d.getDate() - day + (start > day ? start - 7 : start);
    d.setDate(diff);
    return d;
};

export const getThisWeek = () => {
    let curr = new Date
    let week = []

    for (let i = 0; i <= 7; i++) {
        let first = curr.getDate() + i
        let day = new Date(curr.setDate(first)).toISOString().slice(0, 10)
        week.push(day)
    }
    return week;
};
