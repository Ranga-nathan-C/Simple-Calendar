document.addEventListener('DOMContentLoaded', function () {
    const currentMonth = document.getElementById('currentMonth');
    const calendarBody = document.getElementById('calendarBody');
    const yearSelect = document.getElementById('yearSelect');
    const holidays = {
        '01-01': 'New Year\'s Day',
        '07-04': 'Independence Day',
        '12-25': 'Christmas Day'
    };

    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonthIndex = today.getMonth();

    function updateCalendar() {
        calendarBody.innerHTML = '';
        const firstDay = new Date(currentYear, currentMonthIndex, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        currentMonth.textContent = monthNames[currentMonthIndex] + ' ' + currentYear;

        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.classList.add('empty');
                } else if (date > daysInMonth) {
                    break;
                } else {
                    const formattedDate = ('0' + (currentMonthIndex + 1)).slice(-2) + '-' + ('0' + date).slice(-2);
                    cell.textContent = date;
                    if (date === today.getDate() && currentMonthIndex === today.getMonth() && currentYear === today.getFullYear()) {
                        cell.classList.add('today');
                    }
                    if (holidays[formattedDate]) {
                        cell.classList.add('holiday');
                        cell.setAttribute('title', holidays[formattedDate]);
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    function populateYears() {
        const startYear = 1900;
        const endYear = 2100;
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            if (year === currentYear) option.selected = true;
            yearSelect.appendChild(option);
        }
    }

    populateYears();
    updateCalendar();

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;
        if (currentMonthIndex === 11) currentYear--;
        updateCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonthIndex = (currentMonthIndex === 11) ? 0 : currentMonthIndex + 1;
        if (currentMonthIndex === 0) currentYear++;
        updateCalendar();
    });

});