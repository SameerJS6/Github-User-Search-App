const body = document.getElementById('body');
const ThemeButton = document.querySelector('.theme-select');
const DarkButton = document.querySelector('.theme');
const lightButton = document.querySelector('.light');
const Sun = document.querySelector('.sun');
const Moon = document.querySelector('.moon');


ThemeButton.addEventListener('click', ()=> {
    // For Temporialy 
    DarkButton.classList.toggle('none')
    Moon.classList.toggle('none')
    lightButton.classList.toggle('none')
    Sun.classList.toggle('none')

    body.classList.toggle('DarkMode');
})
