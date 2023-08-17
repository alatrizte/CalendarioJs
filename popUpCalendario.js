function returnDay(day, month, year) {
    document.getElementById("inputFecha").value = `${day}/${month}/${year}`;
    document.getElementById("calendario").remove();
}
const closeCalendar = elem => {
    elem.remove();
}
function createCalendar(elem, year, month, day) { 
    if (month == 13) {
        month = 1;
        year++;
    } else if (month == 0 ) {
        month = 12;
        year--;
    }
    let mon = month - 1; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);

    let nomSemana = ["Lu","Ma","Mi","Ju","Vi","Sa","Do"];
    let nomMes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    let table = '<div class="grid-container">';
    table += "<div></div>";
    table += `<div class="control" onclick="createCalendar(${elem.id},${year-1},${month})">-</div>`;
    table += `<div class="anho">${year}</div>`;
    table += `<div class="control" onclick="createCalendar(${elem.id},${year+1},${month})">+</div>`;
    table += `<div id="close" onclick="closeCalendar(${elem.id})">x</div>`;
    table += "<div></div>";
    table += `<div class="control" onclick="createCalendar(${elem.id},${year},${month-1})"><</div>`;
    table += `<div class="mes">${nomMes[mon]}</div>`;
    table += `<div  class="control" onclick="createCalendar(${elem.id},${year},${month+1})">></div>`;
    table +="<div></div>";
    for (nom in nomSemana){
        table += `<div class="nomDias">${nomSemana[nom]}</div>`;
    }
    // spaces for the first row
    // from Monday till the first day of the month
    // * * * 1  2  3  4
    for (let i = 0; i < getDay(d); i++) {
    table += '<div></div>';
    }
    
    // <td> with actual dates
    while (d.getMonth() == mon) {
        if (d.getDate() == day){
            table += `<div onclick="returnDay(${d.getDate()}, ${month}, ${year})" 
            class="numHoy">` + d.getDate() + '</div>';
        } else if (d.getDay() == 6 ||  d.getDay() == 0){
            table += `<div onclick="returnDay(${d.getDate()}, ${month}, ${year})" 
            class="numFest">` + d.getDate() + '</div>';
        } else {
            table += `<div onclick="returnDay(${d.getDate()}, ${month}, ${year})" 
            class="num">` + d.getDate() + '</div>';
        }
        d.setDate(d.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    // 29 30 31 * * * *
    if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
            table += '<div></div>';
        }
    }

    // close the table
    table += '</div>';
    elem.innerHTML = table;
}

function getDay(date) { // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
}
//createCalendar(calendario, 1972, 5);