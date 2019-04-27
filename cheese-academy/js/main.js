{
  const menuTriggerContainer = document.getElementById('menu-trigger__container');
  const navScrollVersion = document.getElementById('nav-scroll-version__container');
  let screenWidth = window.screen.width;
  const darkB = document.getElementById('d-btn');
  const lightB = document.getElementById('l-btn');
  const mask = document.getElementById('mask');
  const submitButton = document.getElementById('submit-button'); 
  const modalClose = document.getElementById('modal__close'); 
  const modal = document.getElementById('modal'); 
  const stoker = document.getElementById('stoker');

  let stokerX = 0;
  let stokerY = 0;
  let currentX = 0;
  let currentY = 0;

  document.body.addEventListener('mousemove', (e) => {
    stokerX = e.clientX;
    stokerY = e.clientY; 
  });

  tick();

  function tick() {
    requestAnimationFrame(tick);
    currentX += (stokerX - currentX) * 0.01;
    currentY += (stokerY - currentY) * 0.01;
    stoker.style.transform = `translate(${currentX}px, ${currentY}px)`;
  }

  darkB.addEventListener('click', ()=> {
    darkB.classList.remove("open");
    lightB.classList.remove("open");

    let linkstyle = document.getElementById('darkmode');
    linkstyle.href = 'css/dark.css';
    darkB.classList.add("hidden");
    lightB.classList.add("open");
  });

  lightB.addEventListener('click', ()=> {
    darkB.classList.remove("open");
    lightB.classList.remove("open");

    let linkstyle = document.getElementById('darkmode');
    linkstyle.href = '#';
    darkB.classList.add("open");
    lightB.classList.add("hidden");
  });

  menuTriggerContainer.addEventListener('click', () => {
    navScrollVersion.classList.remove('hidden');
    navScrollVersion.classList.add('open');
  });

  if (screenWidth > 800) {
    navScrollVersion.classList.remove('open');
    navScrollVersion.classList.add('hidden');
  }

  submitButton.addEventListener('click', () => {
    mask.classList.remove('modal--hidden');
    modal.classList.remove('modal--hidden');

    modalClose.addEventListener('click', () => {
      mask.classList.add('modal--hidden');
      modal.classList.add('modal--hidden');
    })
  })

};