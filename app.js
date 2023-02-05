const url='https://api.dictionaryapi.dev/api/v2/entries/en/';
const searchButton=document.querySelector('.search-btn');
const searchResults=document.getElementById('search-results');
const soundButton=document.getElementById('sound')
const font=document.querySelector('#input-font');
const toggleThemeBtn = document.querySelector('#toggle-theme-btn');
const body = document.querySelector('body');

toggleThemeBtn.addEventListener('change', function () {
  if (this.checked) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
});


font.addEventListener('change', (event) =>  {
  const selectedFont=event.target.value;
  document.body.style.fontFamily=selectedFont;
})

searchButton.addEventListener('click', () => {
  let inputWord=document.getElementById('inp-word').value;
  fetch(`${url}${inputWord}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    searchResults.innerHTML=`
    <h1>${inputWord}</h1>
    <p class="pronounciation">${data[0].phonetic}</p>
    <button class='hide' onclick='playSound()'>
      <svg id="play-button" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g></svg>
    </button>
    
    <h2>noun</h2>
    <h3>Meaning</h3>
    <p class="meaning-noun">${data[0].meanings[0].definitions[0].definition}</p>
    <div class='synonyms'>
    <h3>Synonyms</h3><span id='syn'>${data[0].meanings[0].synonyms[0]}</span>
    </div>
    <h2>verb</h2>
    <h3>Meaning</h3>
    <p class="meaning-verb">${data[0].meanings[0].definitions[0].definition}</p>
    <p class='example'>'' ${data[0].meanings[0].definitions[2].example} ''</p>
    <hr>
    <div class='open'>
    <h6>Source: ${data[0].sourceUrls}>
    </h6>
    <svg id='open' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/></svg>
    </div>`;
    for (let i = 0; i < data[0].phonetics.length; i++) {
  soundButton.setAttribute('src', `${data[0].phonetics[i].audio}`);
};
  })
  .catch( () =>{
    searchResults.innerHTML=`<h3>Couldn't find the Word</h3>`
  })
 

 
});

function playSound(){
  soundButton.play();
}

