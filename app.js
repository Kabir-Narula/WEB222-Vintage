/* ********* 

  BTI225 – Assignment 05

  I declare that this assignment is my own work in accordance with
  Seneca Academic Policy. No part of this assignment has been
  copied manually or electronically from any other source
  (including web sites) or distributed to other students.

  Please update the following with your information:

 
********* */

//All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;



function buildMenu()
{
  for(let i=0;i< artists.length; i++)//function loops through all the artists. 
  { 
    //adds the following into the HTML document in the element with the menu id. 
    menu.innerHTML += `<span onclick='showSelectedArtist("${artists[i].id}")' class="artists">${artists[i].name}</span>&nbsp;`;
  }
}

function showSelectedArtist(artistID)
{

  let selectedArtistContainer = document.getElementById("selected-artist");

  let selectedArtist = artists.find(artist => artist.id == artistID);

  selectedArtistContainer.innerHTML =`<span class="display-artist">${selectedArtist.name}<br></span>`
  
  for (let i = 0 ; i < selectedArtist.links.length;i++)
  {
    const link = selectedArtist.links[i]; 
    selectedArtistContainer.innerHTML+= `<a href="${link.url}" target="_blank" class="links">${link.name}<br> </a>`
  }
  
  showCardsByArtist(artistID);

}

function showCardsByArtist(artistID)
{
  let artistsSongs = songs.filter(song => song.artistId == artistID);
  let cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = ""; // clear out the card container
 
  for(let i=0;i< artistsSongs.length; i++){
    fetch("https://dummyjson.com/quotes/random")
      .then(res=>res.json())
      .then(data=> {
    const album = artistsSongs[i].album; 
    cardContainer.innerHTML += `
      <article class="card" onclick='showSongForm("${artistsSongs[i].id}")'> 
        <img class="image" src="${album.imageURL}" width="200"> 
        <div class="content"> 
          <p>
            <p>Song: ${artistsSongs[i].title}</p><br> 
            Year: ${artistsSongs[i].year} <br>
            Duration: ${artistsSongs[i].duration} <br>
            Album: ${album.name} <br> <br> 
            ${data.quote}
          </p>
        </div>   
      </article> 
    `}); 
  }
}

function showSongForm(songID){
  var flag; 
  for(let i = 0 ; i < songs.length; i++){
    if (songs[i].id == songID){
      flag = i; 
    }
  }
 
  var showForm = document.getElementById("hidden"); 
  var songIdForm = document.getElementById("songID"); 
  var artistIdForm = document.getElementById("artistID"); 
  var titleForm = document.getElementById("title"); 
  var yearForm = document.getElementById("year"); 
  var durationForm = document.getElementById("duration"); 

  songIdForm.value = `${songs[flag].id}`; 
  artistIdForm.value = `${songs[flag].artistId}`; 
  titleForm.value=`${songs[flag].title}`; 
  yearForm.value = `${songs[flag].year}`; 
  durationForm.value = `${songs[flag].duration}`; 

  showForm.style.display = "block"; 
}

document.addEventListener("DOMContentLoaded", function(){
  buildMenu();
  showSelectedArtist(artists[0].id); 
  //showCardsByArtist(artists[0].id);  let closeFormButton = document.getElementById("close-form-button");
  

  let form = document.getElementById("hidden");

  form.onsubmit = function(){
    console.log("form submitted!")

    var songIdForm = document.getElementById("songID"); 
    var artistIdForm = document.getElementById("artistID"); 
    var titleForm = document.getElementById("title"); 
    var yearForm = document.getElementById("year"); 
    var durationForm = document.getElementById("duration");
    

    let idxSongToUpdate = songs.findIndex(song=>song.id == songIdForm.value );

    songs[idxSongToUpdate].title = titleForm.value;
    songs[idxSongToUpdate].duration = durationForm.value;
    songs[idxSongToUpdate].year = yearForm.value;

    showCardsByArtist(artistIdForm.value);
     form.style.display = "none";


    return false;
    
  }
});
