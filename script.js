let myDate;

function activateDay() {
    let weekDaysDiv = document.getElementById("weekDays").children;
    let weekDaysArray = [];
    
    for(let i = 0; i < weekDaysDiv.length; i++) {
        weekDaysArray.push(weekDaysDiv[i].innerHTML);
        
        if(i === myDate.getDay()) {
            weekDaysDiv[i].classList.add("active");
        } else {
            weekDaysDiv[i].classList.remove("active");
        }
    }
}

function activatePeriod() {
    let periodsDiv = document.getElementById("periods").children;
    let periodsArray =[];    

    for(let i = 0; i < periodsDiv.length; i++){
        periodsArray.push(periodsDiv[i].innerHTML);
    }

    if(myDate.getHours() < 12) {
        periodsDiv[1].classList.remove("active");
        periodsDiv[0].classList.add("active");
    } else if(myDate.getHours() >= 12) {
        periodsDiv[0].classList.remove("active");
        periodsDiv[1].classList.add("active");
    }
}

function displayTime() {
    let displaySecond = myDate.getSeconds();
    let stringSecond = displaySecond.toString();

    let displayMinute = myDate.getMinutes();
    let stringMinute = displayMinute.toString();

    let displayHour = myDate.getHours();
    let stringHour = displayHour.toString();

    if(stringSecond.length === 1) {
        stringSecond = "0" + stringSecond;
    };
    
    if(stringMinute.length === 1) {
        stringMinute = "0" + stringMinute;
    };
    
    if(stringHour.length === 1) {
        stringHour = "0" + stringHour;
    }
        
    document.getElementById("time").innerHTML = (`${stringHour} :${stringMinute} :${stringSecond}`);
}

function activateAlarm() {
    document.getElementById("setAlarm").style.display = "flex";  
}

let userHour;
let userMinute;

let iconClock;

function setAlarm() {
    userHour = parseInt(document.getElementById("userHour").value);
    userMinute = parseInt(document.getElementById("userMinute").value);
    
    iconClock = document.getElementsByClassName("icon-clock");
    iconClock[0].classList.add("active");
    document.getElementById("setAlarm").style.display = "none";

    if(!userHour || !userMinute) {
        document.getElementById("errorMessage").innerHTML = "You must set an hour and a minute :)";
        iconClock[0].classList.remove("active");
    }
}

function verifyAlarm() {
    if(userHour === myDate.getHours() && userMinute === myDate.getMinutes()  &&myDate.getSeconds() === 0) {
        document.body.style.backgroundImage = "url('img_lights.jpg')";
        playAudio();
        iconClock[0].classList.remove("active");
        //document.getElementById("errorMessage").innerHTML = "";
    }
}

function playAudio() {
    let myAudio = new Audio("cock-crow-kikeriki-little.mp3");
    myAudio.play();
    myAudio.onended = function() {
        document.body.style.backgroundImage = "linear-gradient(to left top, #355e2e, #2AF00B)";
        document.getElementById("userHour").value = null;
        document.getElementById("userMinute").value = null;
    }
}

function recurrent() {
    myDate = new Date();
    displayTime();
    activatePeriod();
    activateDay();
    verifyAlarm();
}

recurrent();

setInterval(recurrent, 1000);

