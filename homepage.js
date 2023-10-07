document.querySelector('#homebtn1').disabled = true;
show1();
function show1(){
    document.querySelector('#homebtn1').disabled = true;
    document.querySelector('#homebtn2').disabled = false;
    document.querySelector('#homebtn3').disabled = false;
    document.getElementsByClassName("about")[0].style.display = 'block';
    document.getElementsByClassName("instructions")[0].style.display = 'none';
    document.getElementsByClassName("news")[0].style.display = 'none';
    document.getElementsByClassName("newsbutton")[0].style.display = 'none';
}
function show2(){
    document.querySelector('#homebtn1').disabled = false;
    document.querySelector('#homebtn2').disabled = true;
    document.querySelector('#homebtn3').disabled = false;
    document.getElementsByClassName("about")[0].style.display = 'none';
    document.getElementsByClassName("instructions")[0].style.display = 'block';
    document.getElementsByClassName("news")[0].style.display = 'none';
    document.getElementsByClassName("newsbutton")[0].style.display = 'none';
}
function show3(){
    document.querySelector('#homebtn1').disabled = false;
    document.querySelector('#homebtn2').disabled = false;
    document.querySelector('#homebtn3').disabled = true;
    document.getElementsByClassName("about")[0].style.display = 'none';
    document.getElementsByClassName("instructions")[0].style.display = 'none';
    document.getElementsByClassName("news")[0].style.display = 'flex';
    document.getElementsByClassName("newsbutton")[0].style.display = 'inline-grid';
}

const apiKey = 'ae98bff58caa4e9ea683dd201e597675';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    var info = data['results'];
    let i=0;
    while (i < 6) {
        const item = info[i];
        const name = item["name"]
        const id = item["id"]
        const img = item["background_image"]
        const releasedate = item["released"]
        const update = item["updated"]
        const rating = item["rating"]
        const result = `<li><img src=${img}><div class="homenews"><p title="${name}">${name}</p></div>
        <ps>Id: ${id}</ps><ps>Rating: ${rating}</ps><ps>Release Date: ${releasedate}</ps><ps>Last Update: ${update}</ps></li>`;
                        document.querySelector('.news').innerHTML += result;
        i++;
    }
  })
  .catch(error => {
    console.error('Error fetching news:', error);
  });