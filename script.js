// All the necessary imports here
const Input = document.querySelector("[data-input]");
const NoResult = document.querySelector("[no-result]");
const SubmitBtn = document.querySelector("[submit-button]");
const AvatarImg = document.querySelectorAll("[data-avatar]");
const UserName = document.querySelector("[data-username]");
const UserLink = document.querySelector("[data-link]");
const DateofJoin = document.querySelector("[date-of-join]");
const Bio = document.querySelector("[user-bio]");
const Repo = document.querySelector("[data-repo]");
const Followers = document.querySelector("[data-followers]");
const Following = document.querySelector("[data-following]");
const LocaTion = document.querySelector("[data-location]");
const Twitter = document.querySelector("[data-twitter]");
const Website = document.querySelector("[data-website]");
const Company = document.querySelector("[data-company]");
const MainBox = document.querySelector(".main-content-box");
const Errors = document.querySelector(".error");

// Array containing months name
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Function for removing white space from entered value
function InputName() {
  const Inputkey = Input.value;
  const SearchName = Inputkey.split(" ").join("");
  return SearchName;
}

// Fetching the data from API and Updating into DOM
function api() {
  fetch("https://api.github.com/users/" + InputName())
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      console.log(NoResult.innerText);
      UpdateProfile(data);
    })
    .catch((error) => {
      throw error;
    });
}

// For enabling the use of enter key of keyboard
Input.addEventListener(
  "keydown",
  function (e) {
    if (!e) {
      var e = window.event;
    }
    if (e.key == "Enter") {
      if (InputName() !== "") {
        api();
      }
    }
  },
  false
);

// Checking if socials has value or not
function checknull(param1, param2) {
  if (param1 === "" || param1 === null) {
    param2.style.opacity = "0.5";
    param2.previousElementSibling.style.opacity = "0.5";
    param2.previousElementSibling.style.fill = "#FF3333";
    param2.previousElementSibling.style.scale = "0.9";
    return "Not Available";
  } else {
    param2.style.opacity = "1";
    param2.previousElementSibling.style.opacity = "1";
    param2.previousElementSibling.style.fill = "";
    param2.previousElementSibling.style.scale = "1";
    return `${param1}`;
  }
}

// Updating the Profile function and also checking if user exists or not
function UpdateProfile(data) {
  if (data.message !== "Not Found") {
    NoResult.removeAttribute("data-hidden");
    MainBox.style.display = "flex";
    Errors.style.display = "none";

    AvatarImg.forEach((avatar) => {
      avatar.src = `${data.avatar_url}`;
    });

    UserName.innerHTML = `${data.name}`;
    UserLink.innerHTML = `@${data.login}`;
    UserLink.href = `${data.html_url}`;
    // Checking if username is not avaiable, then use UserLink as Username
    if (data.name == null) {
      UserName.innerHTML = `${data.login}`;
    }
    // Checking if user bio is null, and if it then printing, the profile has no bio
    Bio.innerHTML = `${data.bio}`;
    if (Bio.innerHTML == "null") {
      Bio.innerHTML = "This proile has no bio";
    }

    Repo.innerHTML = `${data.public_repos}`;

    Followers.innerHTML = `${data.followers}`;
    Following.innerHTML = `${data.following}`;
    LocaTion.innerHTML = checknull(data.location, LocaTion);

    Twitter.innerHTML = checknull(data.twitter_username, Twitter);
    Twitter.href = `https://twitter.com/${data.twitter_username}`;

    Website.innerHTML = checknull(data.blog, Website);
    Website.href = `${data.blog}`;

    Company.innerHTML = checknull(data.company, Company);

    let datasegment = data.created_at.split("T").shift().split("-");
    DateofJoin.innerHTML = `Joined ${datasegment[2]} ${
      Months[datasegment[1] - 1]
    } ${datasegment[0]}`;
  } else {
    NoResult.setAttribute("data-hidden", true);
    MainBox.style.display = "none";
    Errors.style.display = "block";
  }
}

// Event Listener for Submit button and call back for api function
SubmitBtn.addEventListener("click", () => {
  if (Input.value == "") return;
  api();
});

// For Theme Switching Only
let DarkMode = localStorage.getItem("Darkmode");
const ThemeToggle = document.querySelector(".theme-select");
const Dark = document.querySelector(".theme");
const light = document.querySelector(".light");
const SunIcon = document.querySelector(".sun");
const MoonIcon = document.querySelector(".moon");
const Preloader = document.querySelector("[data-preloader]");

// Just for toggling the theme text and icon
const EnableSunIcon = () => {
  Dark.classList.add("none");
  light.classList.remove("none");
  MoonIcon.classList.add("none");
  SunIcon.classList.remove("none");
};

const DisableSunIcon = () => {
  light.classList.add("none");
  Dark.classList.remove("none");
  MoonIcon.classList.remove("none");
  SunIcon.classList.add("none");
};
// Variables containing the darkmode enabling and disabling properties
const EnableDarkMode = () => {
  // 1. Add the class darkmode to the body
  document.body.classList.add("DarkMode");
  EnableSunIcon();
  // 2. Update darkmode in the localStorage
  localStorage.setItem("Darkmode", "enabled");
};

const DisableDarkMode = () => {
  // 1. Remove the class darkmode from the body
  document.body.classList.remove("DarkMode");
  DisableSunIcon();
  // 2. Update the darkmode in the localStorage
  localStorage.setItem("Darkmode", "disalbed");
};

// Checking if darkmode is enabled, and if it is, then stay enabled
if (DarkMode === "enabled") {
  EnableDarkMode();
}

// Checking if the darkmode is enable or not and also updating the localStorage, so it can toggle between
ThemeToggle.addEventListener("click", () => {
  DarkMode = localStorage.getItem("Darkmode");
  if (DarkMode !== "enabled") {
    EnableDarkMode();
    console.log(DarkMode);
  } else {
    DisableDarkMode();
    console.log(DarkMode);
  }
});

// For Page PreLoader
window.addEventListener("load", () => {
  Preloader.style.display = "none";
});
