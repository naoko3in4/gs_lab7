'use strict';
{
  const images = [
    '../img/sea.jpg',
    '../img/mountain.jpg',
    '../img/amusement-park.jpg',
    '../img/space.jpg',
    '../img/house.jpg',
    '../img/sky.jpg',
    '../img/church.jpg',
    '../img/river.jpg'
  ]

  const sentence = document.getElementById('sentence');
  const cheese = Math.floor(Math.random() * images.length);
  console.log(`チーズ ${cheese}`);
  let currentPlace = 0;
  let playtSlideShow;
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const result = document.getElementById('result');
  
  start.addEventListener('click', () => {
    result.style.display = 'none';
    start.style.display = 'none';
    stop.style.display = 'block';
    addCurrentPlace();
    playtSlideShow = setInterval(() => {
      removeCurrentPlace();
      currentPlace++;
      if (currentPlace === images.length) {
        currentPlace = 0;
      }
      addCurrentPlace();
    },300)
  })
  
  stop.addEventListener('click', () => {
    result.style.display = 'block';
    console.log(`ばしょ ${currentPlace}`);
    stop.style.display = 'none';
    start.style.display = 'block';
    clearInterval(playtSlideShow);

    if (currentPlace === cheese) {
      console.log('found!!')
      result.src = 'img/cheese.jpg';
      sentence.textContent = 'はっけん！みつかりました';
      start.style.display = "none";

    } else {
      console.log('failed!!')
      result.src = 'img/making-cheese.jpg';
      sentence.textContent = 'ざんねん！まだチーズはできていません';

    }
  })
  
  const removeCurrentPlace = () => {
    document.querySelectorAll('.place')[currentPlace].classList.remove('place--active');
  }

  const addCurrentPlace = () => {
    document.querySelectorAll('.place')[currentPlace].classList.add('place--active');
  }
  
}