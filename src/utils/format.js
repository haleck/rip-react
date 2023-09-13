import React from "react";

export function formatDateWithMonthName(date) {
    const monthsByIndexes = {
        '01': 'явнваря',
        '02': 'февраля',
        '03': 'марта',
        '04': 'апреля',
        '05': 'мая',
        '06' : 'июня',
        '07' : 'июля',
        '08' : 'августа',
        '09' : 'сентября',
        '10' : 'октября',
        '11' : 'ноября',
        '12' : 'декабря'
    }
    let [year, month, day] = date.split('T')[0].split('-')
    day = day[0].replace('0', '') + day[1]
    month = monthsByIndexes[month]
    return day + ' ' + month + ' ' + year
}

export function formatDate(date) {
    let [year, month, day] = date.split('T')[0].split('-')
    return day + '.' + month + '.' + year
}

export function addLineBreaks(text){
    const lines = text.replace(/\n{3,}/g, '\n\n').split('\n')
    return lines.map((line, index) =>
        <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br/>}
        </React.Fragment>
    );
}