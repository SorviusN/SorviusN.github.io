//storing the full date into the constant date
const date = new Date();

//function to render the entire calendar
const renderCalendar = () => {

    const lastDayOFMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const previousLastDay =  new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    
    const firstDayIndex = date.getDay();
    
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
    
    const nextDays = 7 - lastDayIndex
    
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    
    const monthDays = document.querySelector(".days")
    
    document.querySelector(".date h2").innerHTML = months[date.getMonth()];
    
    document.querySelector(".date p").innerHTML = date.toDateString();
    
    let days = "";
    
    for (let j = firstDayIndex; j > 0; j--) {
        days += `<div class="previous-date">${previousLastDay - j + 1}</div>`;
    }
    
    for (let i = 1; i <= lastDayOFMonth; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="current-day">${i}</div>`;
        } 
        else {
            days += `<div>${i}</div>`;
        }
    }
    
    for (let a = 1; a <= nextDays; a++) {
        days += `<div class="next-date">${a}</div>`;
        monthDays.innerHTML = days;
    }
}
//stores the final day of the current month
const lastDayOFMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

//stores the final day of the month prior to what is shown on calendar
const previousLastDay =  new Date(date.getFullYear(), date.getMonth(), 0).getDate();

//stores only the day portion of current date.
const firstDayIndex = date.getDay();

//stores the index of final day from prior month
const lastDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
//
const nextDays = 7 - lastDayIndex
//stores a string array of all months
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
//stores the days of the month from html
const monthDays = document.querySelector(".days")

//assigns the current month of the date const to .date h2
document.querySelector(".date h2").innerHTML = months[date.getMonth()];

//assigns the full date in string form to .date p
document.querySelector(".date p").innerHTML = new Date().toDateString();

//initializes the "days" variable
let days = "";

//all for loops print the previous, current and next month's days on the calendar.
for (let j = firstDayIndex; j > 0; j--) {
    days += `<div class="previous-date">${previousLastDay - j + 1}</div>`;
}
for (let i = 1; i <= lastDayOFMonth; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="current-day">${i}</div>`;
    } 
    else {
        days += `<div>${i}</div>`;
    }
}
for (let a = 1; a <= nextDays; a++) {
    days += `<div class="next-date">${a}</div>`;
    monthDays.innerHTML = days;
}

//moves calendar to previous and next month with left and right arrow
document.querySelector('.prev').addEventListener('click', e => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar()
});
document.querySelector('.next').addEventListener('click', e => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar()
});

renderCalendar()

