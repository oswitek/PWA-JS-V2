window.onload = () => {
    'use strict';
    if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registered successfully.'))
    .catch((error) => console.error('Service Worker registration failed:', error));
    }
   };

   const memes = [
    'images/meme1.gif',
    'images/meme2.gif',
    'images/meme3.gif',
    'images/meme4.gif',
    'images/meme5.gif',
    'images/meme6.gif',
    'images/meme7.gif',
    'images/meme8.gif',
    'images/meme9.gif'
   ];
   
   window.onload = () => {
    'use strict';
   
    if ('serviceWorker' in navigator) {
     navigator.serviceWorker
       .register('./sw.js')
       .then(() => console.log('Service Worker registered successfully.'))
       .catch((error) => console.error('Service Worker registration failed:', error));
    }
   
    const changeMemeButton = document.getElementById('change-meme');
    const memeImage = document.getElementById('meme-image');
   
    let currentMemeIndex = 0;
   
    changeMemeButton.addEventListener('click', () => {
     currentMemeIndex = (currentMemeIndex + 1) % memes.length;
     memeImage.src = memes[currentMemeIndex];
    });
   };