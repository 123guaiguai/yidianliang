function getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    if(mon<10){
        mon="0"+mon;
    }
    var date = myDate.getDate(); //获取当前日
    if(date<10){
        date="0"+date;
    }
    var hours = myDate.getHours(); //获取当前小时
    if(hours<10){
        hours="0"+hours;
    }
    var minutes = myDate.getMinutes(); //获取当前分钟
    if(minutes<10){
        minutes="0"+minutes;
    }
    var seconds = myDate.getSeconds(); //获取当前秒
    if(seconds<10){
        seconds="0"+seconds;
    }
    var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
}
export default getNowDate