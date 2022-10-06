const body = document.getElementById('body');
const ThemeButton = document.querySelector('.theme');


ThemeButton.addEventListener('click', ()=> {
    body.classList.toggle('DarkMode');
})
