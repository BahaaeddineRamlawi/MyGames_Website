const firstlist = [
    {
        name: 'user1',
        score: 90,
        time: 81.79},

    {
        name: 'ali',
        score: 100,
        time: 80.0},
    
    {
        name: 'anony',
        score: 120,
        time: 160.2},

    {
        name: 'notbob',
        score: 89,
        time: 67.29},

    {
        name: 'messi',
        score: 102,
        time: 81.79},
    
    {
        name: 'mo',
        score: 70,
        time: 81.79},
    
    {
        name: 'mido',
        score: 10,
        time: 81.79},
    {
        name: 'user23',
        score: 96,
        time: 81.70},
    {
        name: 'dhu9dw',
        score: 82,
        time: 86.0},
    {
        name: 'hadi13',
        score: 65,
        time: 81.79},
    {
        name: 'hadi12',
        score: 87,
        time: 81.79},
    {
        name: 'dqudyqw',
        score: 56,
        time: 83.26},
    {
        name: '9w89',
        score: 81, 
        time: 89.21},
    {
        name: 'moussa',
        score: 103,
        time: 92.34},
    {
        name: 'destroy',
        score: 93,
        time: 90.91},
    {
        name: 'dead',
        score: 87,
        time: 89.21}

];

function getDataFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    var encodedData = urlParams.get('data');
    var decodedData = decodeURIComponent(encodedData);
    return decodedData;
}
const text = getDataFromURL();
const myArray = text.split("=");
firstlist.push({name:myArray[0],score:myArray[1],time:myArray[2]});


const list = firstlist.sort((a, b) => b.score/b.time - a.score/a.time);
let place = 1;
let placetop = 1;
for (i in list.slice(0,3)){
    const name = list[i]["name"];
    var result = `<div class="leaderName"> ${name} </div>`
    document.querySelector(`.leader:nth-child(${placetop})`).innerHTML += result;
    placetop++;
}
for (i in list.slice(0,15)){
    const rank = place;
    place++;
    const name = list[i]["name"];
    const score = list[i]["score"];
    const time = list[i]["time"];
    const ratio = (score/time).toFixed(2);
    var result = `<li style="text-decoration: none;list-style: none"><tr><th>${rank}</th><th style="text-align: center">${name}</th><th style="text-align: center">${time}</th>
                <th style="text-align: center">${score}</th><th style="text-align: center">${ratio}</th></tr></li>`
    document.querySelector('tbody').innerHTML += result;
}