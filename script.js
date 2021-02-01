var start = document.getElementById("start-btn");
var stops = document.getElementById("stop-btn");
var lap = document.getElementById("lap-btn");
var continues = document.getElementById("continue-btn");
var clear = document.getElementById("clear-btn");
var recordLap = document.getElementById("lapList");
var millisec = document.getElementById("millisec");
var sec = document.getElementById("second");
var min = document.getElementById("minute");
var hr = document.getElementById("hour");
var countTimeFunction;
var startBtnPressTime;
var stopBtnPressTime;
var stopTime = 0;
var diffTime;

function timming(presstime, initialtime) {
    let currentTime = new Date();
    const startTimer = new Date(presstime);
    diffTime = currentTime - startTimer;
    millisec.innerHTML = addzero(Math.floor(((initialtime + diffTime)/10)%100));
    sec.innerHTML = addzero(Math.floor(((initialtime + diffTime)/1000)%60));
    min.innerHTML = addzero(Math.floor(((initialtime + diffTime)/1000/60)%60));
    hr.innerHTML = addzero(Math.floor(((initialtime + diffTime)/1000/60/60)));
}

function addzero (y) {  
    if (y>9) {
        return y;
    } else {
        return "0" + y;
    }
}

start.addEventListener("click",function(){
    startBtnPressTime = new Date();
    countTimeFunction = setInterval(timming,10,startBtnPressTime,0);
    start.style.display = "none";
    stops.style.display = "initial";
    lap.style.display = "initial";
});

stops.addEventListener("click",function(){
    clearInterval(countTimeFunction);
    stops.style.display = "none";
    lap.style.display = "none";
    continues.style.display = "initial";
    clear.style.display = "initial";
    stopBtnPressTime = new Date();
    stopTime = stopTime + diffTime;
});

continues.addEventListener("click",function(){
    continueBtnPressTime = new Date();
    countTimeFunction = setInterval(timming,10,continueBtnPressTime,stopTime);
    stops.style.display = "initial";
    lap.style.display = "initial";
    continues.style.display = "none";
    clear.style.display = "none";
});

clear.addEventListener("click",function(){
    clearInterval(countTimeFunction);
    millisec.innerHTML = "00";
    sec.innerHTML = "00";
    min.innerHTML = "00";
    hr.innerHTML = "00";
    stops.style.display = "none";
    clear.style.display = "none";
    continues.style.display = "none";
    lap.style.display = "none";
    start.style.display = "initial";
    diffTime = 0;
    stopTime = 0;
    for (i = 0; i < recordLap.clientHeight; i++) {
    recordLap.removeChild(recordLap.childNodes[0]);
    }
});

lap.addEventListener("click",function(){
    let newList = document.createElement("li");
    newList.innerHTML =  hr.innerHTML + ":" + min.innerHTML + ":" + sec.innerHTML + ":" + millisec.innerHTML ;
    recordLap.appendChild(newList);
});