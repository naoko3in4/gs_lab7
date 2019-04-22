{
  const menuTriggerContainer = document.getElementById('menu-trigger__container');
  const navScrollVersion = document.getElementById('nav-scroll-version__container');
  let screenWidth = window.screen.width;
  const darkB = document.getElementById('d-btn');
  const lightB = document.getElementById('l-btn');

  darkB.addEventListener('click', ()=> {
    darkB.classList.remove("open");
    lightB.classList.remove("open");

    let linkstyle = document.getElementById('darkmode');
    linkstyle.href = 'css/dark.css';
    darkB.classList.add("hidden");
    lightB.classList.add("open");
  });

  lightB.addEventListener('click', (e)=> {
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
    console.log(screenWidth);
    navScrollVersion.classList.remove('open');
    navScrollVersion.classList.add('hidden');
  }

  


};