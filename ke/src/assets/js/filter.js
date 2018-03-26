/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-01-03 13:31:08
 * @version $Id$
 */


var personFilter = (num) => {
    if(num >= 10000) {
        num = Math.round(num / 1000 ) / 10 + 'w';
    }else if(num >= 1000) {
        num = Math.round(num / 100 ) / 10 + 'k';
    }else{
        num = num;
    }
    return num;
}
var toThousands = (num) => {
    var n = parseFloat(num).toFixed(2);
    var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
    var f = n.replace(re, "$1,");
    return f;
}
var twoTigits = (num) => {
    if(num < 10){
        num = '0' + num;
    }
    return num;
}
var formatDate = (date, fmt) => {
    date = new Date(date);
   if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
var padLeftZero = (str) => {
    return ('00' + str).substr(str.length);
}
export{ 
    personFilter,
    toThousands,
    twoTigits,
    formatDate
}

