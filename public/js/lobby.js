let data = {};

const init = function() {
    document.getElementById('button-send').addEventListener('click', send);
}

const send = function(){
    let numImposters = document.getElementById('numImposters');
    let roundtime = document.getElementById('roundtime');
    data['numImposters'] = parseInt(numImposters.value);
    data['roundtime'] = parseInt(roundtime.value);
    //console.log(data);
}

document.addEventListener('DOMContentLoaded', init);