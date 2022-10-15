const Input = document.querySelector('[data-input]');
const NoResult = document.querySelector('[no-result]');
const SubmitBtn = document.querySelector('[submit-button]');
const AvatarImg = document.querySelectorAll('[data-avatar]');
const UserName = document.querySelector('[data-username]');
const UserLink = document.querySelector('[data-link]');
const DateofJoin = document.querySelector('[date-of-join]');
const Bio = document.querySelector('[user-bio]')
const Repo = document.querySelector('[data-repo]');
const Followers = document.querySelector('[data-followers]');
const Following = document.querySelector('[data-following]');
const LocaTion = document.querySelector('[data-location]');
const Twitter = document.querySelector('[data-twitter]');
const Website = document.querySelector('[data-website]');
const Company = document.querySelector('[data-company]');

const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "JUn",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

// This function is for only removing whtie space in between name from input 
function InputName() {
    const InputName = Input.value;
    const SearchName = InputName.split(' ').join('')
    return SearchName;
}

// Fetching the data from API and Feeding it to DOM 
function api() {
    fetch('https://api.github.com/users/'+InputName())
    .then((result) => result.json())
    .then((data)=> {
        console.log(data);
        UpdateProfile(data);
        if(data.message == 'Not Found') {
            NoResult.classList.remove('.none')
        }
    })
    .catch((error) => {
        throw error;
    })
}

// Updating the Profile function 
function UpdateProfile(data) {
    AvatarImg.forEach((avatar) => {
        avatar.src = `${data.avatar_url}`;
    });
    UserName.innerHTML = `${data.name}`;
    if(data.name == null) {
        UserName.innerHTML = `${data.login}`;
    }
    UserLink.innerHTML = `@${data.login}`;
    UserLink.href = `${data.html_url}`;
    Bio.innerHTML = `${data.bio}`;
    if(Bio.innerHTML == 'null') {
        Bio.innerHTML = 'This proile has no bio';
    }
    Repo.innerHTML = `${data.public_repos}`;
    Followers.innerHTML = `${data.followers}`;
    Following.innerHTML = `${data.following}`;
    LocaTion.innerHTML = `${data.location}`;
    if(LocaTion.innerHTML == 'null') {
        LocaTion.innerHTML = 'Not Available'
    }
    Twitter.innerHTML = `${data.twitter_username}`;
    Twitter.href = `https://twitter.com/${data.twitter_username}`;
    if(Twitter.innerHTML == 'null') {
        Twitter.innerHTML = 'Not Available'
    }
    Website.innerHTML = `${data.blog}`;
    Website.href = `${data.blog}`;
    if(Website.innerHTML == '') {
        Website.innerHTML = 'Not Available'
    }
    Company.innerHTML = `${data.company}`;
    if(Company.innerHTML == 'null') {
        Company.innerHTML = 'Not Available'
    }
    let datasegment = data.created_at.split('T').shift().split('-')
    console.log(datasegment)
    DateofJoin.innerHTML = `Joined ${datasegment[2]} ${datasegment[1]} ${datasegment[0]}`;
}

// Event Listener for Submit button and call back for api function above 
SubmitBtn.addEventListener('click', ()=> {
    api();
})


// For Theme Switching Only 
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
