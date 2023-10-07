const apiKey = 'ae98bff58caa4e9ea683dd201e597675';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}`;
const gameurl = `https://api.rawg.io/api/games/`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    var info = data['results'];
    let i=0;
    while (i < 20) {
        const item = info[i];
        const name = item["name"]
        const id = item["id"]
        const img = item["background_image"]
        const releasedate = item["released"]
        const update = item["updated"]
        const rating = item["rating"]
        const result = `<li><img src=${img}><a onClick="showdetail(${id});" style="cursor: pointer; cursor: hand;"><p title="${name}">${name}</p></a>
        <ps>Id: ${id}</ps><ps>Rating: ${rating}</ps><ps>Release Date: ${releasedate}</ps><ps>Last Update: ${update}</ps></li>`;
                        document.querySelector('.gamingnews').innerHTML += result;
        i++;
    }
  })
  .catch(error => {
    console.error('Error fetching news:', error);
  });

  function showdetail(id){
    document.getElementsByClassName("gamedetail")[0].style.display = 'block';
    document.getElementsByClassName("detailbtn")[0].style.display = 'inline-flex';
    document.getElementsByClassName("gamingnews")[0].style.display = 'none';
    fetch(gameurl + id + `?key=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      const item = data;
      const name = item["name"];
      const id = item["id"];
      const img = item["background_image"];
      const releasedate = item["released"];
      const update = item["updated"];
      const rating = item["rating"];
      const desc = item["description_raw"];
      const red = item["reddit_url"];
      const reddesc = item["reddit_description"];
      const genre = item["genres"];
      var genres = '';
      let i = 0;
      while (i < genre.length){
        genres += `<br><pg>${(item["genres"][i])["name"]}<pg>`;
        ++i;
      }
      const developer = item["developers"]
      var developers = '';
      let j = 0;
      while (j < developer.length){
        developers += `<br><pg>${item["developers"][j]["name"]}<pg>`;
        ++j;
      }
      const result = `<li><img src=${img}><div class="detailtext"><p title="${name}">${name}</p>
        <ps>Id: ${id}</ps><ps>Rating: ${rating}/5</ps><ps>Release Date: ${releasedate}</ps><ps>Last Update: ${update}</ps>
        <ps>Genres: ${genres}</ps><ps>Developers: ${developers}</ps><a href="${red}"><ps>Reddit link: ${red}</ps></a><ps>Reddit Description: ${reddesc}</ps></div></li><ps>Description:<br>${desc}</ps>`;
                        document.querySelector('.gamedetail').innerHTML = result;
    });
  }

  function closedetail(){
    document.querySelector('.gamedetail').innerHTML = '';
    document.getElementsByClassName("gamedetail")[0].style.display = 'none';
    document.getElementsByClassName("detailbtn")[0].style.display = 'none';
    document.getElementsByClassName("gamingnews")[0].style.display = 'flex';
  }