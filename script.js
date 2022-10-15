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
    const Inputkey = Input.value;
    const SearchName = Inputkey.split(' ').join('')
    return SearchName;
}

// Fetching the data from API and Feeding it to DOM 
function api() {
    fetch('https://api.github.com/users/'+InputName())
    .then((result) => result.json())
    .then((data)=> {
        console.log(data);
        console.log(NoResult.innerText)
        UpdateProfile(data);
    })
    .catch((error) => {
        throw error;
    })
}

// For enabling the enter key of keyboard 
Input.addEventListener("keydown", function(e) {
    if(!e) {
        var e = window.event;
    }
    if(e.key == "Enter") {
        if(InputName() !== "") {
            api();
        }
    }
},false)

function checknull (param1, param2) {
    if(param1 === '' || param1 === null) {
        param2.style.opacity = '0.5';
        param2.previousElementSibling.style.opacity = '0.5';
        param2.previousElementSibling.style.scale = '0.9';
        return "Not Available";
    } else {
        param2.style.opacity = '1';
        param2.previousElementSibling.style.opacity = '1';
        param2.previousElementSibling.style.scale = '1';
        return `${param1}`;
    }
}
// Updating the Profile function 
function UpdateProfile(data) {
    if(data.message !== 'Not Found') {
        // NoResult.style.display = 'none';
        // NoResult.style.visibility = 'hidden'
        // NoResult.style.opacity = '0';
        // NoResult.style.right = '-5%';
        // NoResult.setAttribute('data-hidden', true);
        NoResult.removeAttribute('data-hidden')
        

        AvatarImg.forEach((avatar) => {
            avatar.src = `${data.avatar_url}`;
        });
        UserName.innerHTML = `${data.name}`;
        UserLink.innerHTML = `@${data.login}`;
        UserLink.href = `${data.html_url}`;
        if(data.name == null) {
            UserName.innerHTML = `${data.login}`;
        }
        Bio.innerHTML = `${data.bio}`;
        if(Bio.innerHTML == 'null') {
            Bio.innerHTML = 'This proile has no bio';
        }
        Repo.innerHTML = `${data.public_repos}`;
        Followers.innerHTML = `${data.followers}`;
        Following.innerHTML = `${data.following}`;
        LocaTion.innerHTML = checknull(data.location, LocaTion);
        // if(LocaTion.innerHTML == 'null') {
        //     LocaTion.innerHTML = 'Not Available'
        // }
        Twitter.innerHTML = checknull(data.twitter_username, Twitter);
        Twitter.href = `https://twitter.com/${data.twitter_username}`;
        // if(Twitter.innerHTML == 'null') {
        //     Twitter.innerHTML = 'Not Available'
        // }
        Website.innerHTML = checknull(data.blog, Website);
        Website.href = `${data.blog}`;
        // if(Website.innerHTML == '') {
        //     Website.innerHTML = 'Not Available'
        // }
        Company.innerHTML = checknull(data.company, Company);
        // if(Company.innerHTML == 'null') {
        //     Company.innerHTML = 'Not Available'
        // }
        let datasegment = data.created_at.split('T').shift().split('-');
        DateofJoin.innerHTML = `Joined ${datasegment[2]} ${Months[datasegment[1]-1]} ${datasegment[0]}`;
    } else {
        // NoResult.style.display = 'block';
        // NoResult.style.visibility = 'visible'
        // NoResult.style.opacity = '1'
        // NoResult.style.right = '26%';
        NoResult.setAttribute('data-hidden', true);
    }
   
}

// Event Listener for Submit button and call back for api function above 
SubmitBtn.addEventListener('click', ()=> {
    if(Input.value == '') return
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
