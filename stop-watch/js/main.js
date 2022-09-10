var time = [0,0,0,0] //hours, minutes, seconds, and first two digits to the right of .
var totalTime = [0,0,0,0];
var laps = [];
var started = false;
var stopped = false;

window.addEventListener('load',() => {
    setTimeout(() => {
        background.set('color','#28c')
    }, 10)
});

function start() {
    started = true;
    count();

    const button = document.getElementById('button');
    button.innerText = 'Pause';
    button.setAttribute('onclick','pause()');
    button.style.backgroundColor = '#04c';

    document.getElementById('lap').style.display = 'block';

    /*if (stopped) { //remove recorded laps
        stopped = false;
        const lapClass = document.getElementsByClassName('lap');
        const length = lapClass.length;
        for (let i = 0; i < length; i++) {
            lapClass[length-1-i].remove();
        }
        laps = [];
    }
    //*/
}
 
function pause() {
    started = false;

    const button = document.getElementById('button');
    button.innerText = 'Start';
    button.setAttribute('onclick','start()');
    button.style.backgroundColor = 'greenyellow';

    document.getElementById('lap').style.display = 'none';
}

function stop() {
    pause()
    started = false;
    //stopped = true;
    time = [0,0,0,0];
    mainDisplay(0,0,0,0);
    lowerDisplay(0,0,0,0);

    const lapClass = document.getElementsByClassName('lap');
    const length = lapClass.length;
    for (let i = 0; i < length; i++) {
        lapClass[length-1-i].remove();
    }
    laps = [];
}

function count() {
    var hours = totalTime[0];
    var minutes = totalTime[1];
    var seconds = totalTime[2];
    var other = totalTime[3];


    if (hours >= 99 && minutes >= 59 && seconds >= 59 && other >= 99) {
        pause();
        return;
    }

    other++;
    if (other >= 100) {
        seconds++;
        other = 0;
    }
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes >= 60) {
        hours++;
        minutes = 0;
    }
    
    totalTime = [hours,minutes,seconds,other];
    lowerDisplay(hours,minutes,seconds,other);

    countCurrentLap();

    setTimeout(() => {
        if (started) {
            count();
        }
    }, 10);
}

function countCurrentLap() {
    var hours = time[0];
    var minutes = time[1];
    var seconds = time[2];
    var other = time[3];


    if (hours >= 99 && minutes >= 59 && seconds >= 59 && other >= 99) {
        pause();
        return;
    }

    other++;
    if (other >= 100) {
        seconds++;
        other = 0;
    }
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes >= 60) {
        hours++;
        minutes = 0;
    }
    
    time = [hours,minutes,seconds,other];
    mainDisplay(hours,minutes,seconds,other);
}

function mainDisplay(hours,minutes,seconds,other) { // Main display used for lap time
    const el = document.getElementById('counter');

    if (other <= 9) {
        other = `0${other}`;
    }
    if (seconds <= 9) {
        seconds = `0${seconds}`;
    }
    if (minutes <= 9) {
        minutes = `0${minutes}`;
    }
    if (hours <= 9) {
        hours = `0${hours}`;
    }

    const text = `${hours}:${minutes}:${seconds}.${other}`;
    el.innerText = text;
}

function setLapTime(hours,minutes,seconds,other) {
    time = [hours,minutes,seconds,other];
    mainDisplay(hours,minutes,seconds,other);
}

function setLapTime(hours,minutes,seconds,other) {  
    time = [hours,minutes,seconds,other];
    mainDisplay(hours,minutes,seconds,other);
}

function lowerDisplay(hours,minutes,seconds,other) { // Main display used for lap time
    const el = document.getElementById('totalCounter');

    if (other <= 9) {
        other = `0${other}`;
    }
    if (seconds <= 9) {
        seconds = `0${seconds}`;
    }
    if (minutes <= 9) {
        minutes = `0${minutes}`;
    }
    if (hours <= 9) {
        hours = `0${hours}`;
    }

    const text = `${hours}:${minutes}:${seconds}.${other}`;
    el.innerText = text;
}

function lap() {
    laps.push(time);
    addLap();
    setLapTime(0,0,0,0);
}

function addLap() {
    var hours = time[0];
    var minutes = time[1];
    var seconds = time[2];
    var other = time[3];

    const el = document.createElement('a');
    const div = document.getElementById('lapInt');

    if (other <= 9) {
        other = `0${other}`;
    }
    if (seconds <= 9) {
        seconds = `0${seconds}`;
    }
    if (minutes <= 9) {
        minutes = `0${minutes}`;
    }
    if (hours <= 9) {
        hours = `0${hours}`;
    }

    const text = `${hours}:${minutes}:${seconds}.${other}`;
    el.innerHTML = text + '<br>';

    el.style.position = 'relative';
    el.style.fontSize = '30px';
    el.style.fontFamily = '\'Courier New\', Courier, monospace';
    el.setAttribute('class','lap');

    div.prepend(el);
    div.style.textAlign = 'right';


    //total time
    const el2 = document.createElement('a');
    const div2 = document.getElementById('totalLaps');

    hours = totalTime[0];
    minutes = totalTime[1];
    seconds = totalTime[2];
    other = totalTime[3];

    if (other <= 9) {
        other = `0${other}`;
    }
    if (seconds <= 9) {
        seconds = `0${seconds}`;
    }
    if (minutes <= 9) {
        minutes = `0${minutes}`;
    }
    if (hours <= 9) {
        hours = `0${hours}`;
    }

    const text2 = `${hours}:${minutes}:${seconds}.${other}`;
    el2.innerHTML = text2 + '<br>';

    el2.style.position = 'relative';
    el2.style.fontSize = '30px';
    el2.style.fontFamily = '\'Courier New\', Courier, monospace'
    el2.setAttribute('class','lap');

    div2.prepend(el2);
}