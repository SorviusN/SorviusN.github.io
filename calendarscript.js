const date = new Date();

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

document.querySelector(".date p").innerHTML = new Date().toDateString();

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

document.querySelector('.prev').addEventListener('click', e => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar()
});


document.querySelector('.next').addEventListener('click', e => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar()
});

renderCalendar()


