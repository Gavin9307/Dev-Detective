const url = "https://api.github.com/users/";
const root = document.documentElement.style;
const getClass = (param) => document.querySelector(`.${param}`);
const getId = (param) => document.querySelector(`#${param}`);

const btnMode = getClass("btn-mode");
const modeText = getId("mode-text");
const modeIcon = getId("mode-icon");

const searchContainer = getClass("search-container");
const noResults = getId("no-results");
const input = getId("input");
const btnSubmit = getId("submit");

const profileContainer = getClass("profile-container");
const avatar = getId("avatar");
const userName = getId("name");
const user = getId("user");
const date = getId("date");
const months = [
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

const bio = getId("bio");

const repos = getId("repos");
const followers = getId("followers");
const following = getId("following");

const userLocation = getId("location");
const website = getId("website");
const twitter = getId("twitter");
const company = getId("company");

btnSubmit.addEventListener("click", function () {
    if (input.value.trim() !== "") {
      getUserData(url + input.value);
    }
});

input.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        if (input.value !== "") {
          getUserData(url + input.value);
        }
      }
    }
);

input.addEventListener("input", function () {
    noResults.style.display = "none";
});

function renderUserData(data) {
    if (data.message !== "Not Found") {
        noResults.style.display = "none";
        avatar.src = data?.avatar_url;
        userName.innerText = data.name == null ? data.login : data.name;
        user.innerText = "@" + data?.login;
        user.href = data?.html_url;
        datesegments = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]
            } ${datesegments[0]}`;
        bio.innerText =
            data.bio == null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;

        function checkNull(param1, param2) {
            if (param1 == null || param1 == "") {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.children[0].opacity = 0.5;
                return false;
            } else {
                return true;
            }
        }
        userLocation.innerText = checkNull(data.location, userLocation)
            ? data.location
            : "Not Available";
        website.innerText = checkNull(data.blog, website)
            ? data.blog
            : "Not Available";
        website.href = checkNull(data.blog, website)
            ? data.blog
            : "#";
        twitter.innerText = checkNull(data.twitter_username, twitter)
            ? data.twitter_username
            : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter)
            ? `https://twitter.com/${data.twitter_username}`
            : "#";
        company.innerText = checkNull(data.company, company)
            ? data.company
            : "Not Available";
    } else {
        noResults.style.display = "block";
    }
}

function getUserData(urlName) {
    fetch(urlName)
        .then((response) => response.json())
        .then((data) => renderUserData(data))
        .catch((error) => {
            throw error;
        });
}

btnMode.addEventListener("click", () => {
    //Note: Local Storage returns string
    if (localStorage.getItem("dark-mode") === "true") {
        lightModeProperties();
    } else {
        darkModeProperties();
    }
});

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeIcon.src = "./assets/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeIcon.src = "./assets/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    localStorage.setItem("dark-mode", false);
}

function init() {
    const prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme:dark)").matches;

    let localStorageDarkMode = localStorage.getItem("dark-mode");
    if (localStorageDarkMode === "true") {
        darkModeProperties();
    } else if (localStorageDarkMode === "false") {
        lightModeProperties();
    } else {
        if (prefersDarkMode) {
            darkModeProperties();
        } else {
            lightModeProperties();
        }
    }
    getUserData(url + "gavin9307");
}

init();
