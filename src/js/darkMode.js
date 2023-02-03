// darkMode.addEventListener("click", function () {
//   document.body.classList.toggle("dark-mode");
//   darkMode.classList.toggle("bxs-sun");
//   darkMode.classList.toggle("bxs-moon");
//   console.log(localStorage);
// });

const darkMode = document.getElementById("darkMode");
const lightMode = document.getElementById("lightMode");
if (localStorage.getItem("theme") == "light") setDarkMode(true);
function setDarkMode(isDark) {
  if (isDark) {
    document.body.setAttribute("class", "light-mode");
    lightMode.style.display = "none";
    darkMode.style.display = "block";
    localStorage.setItem("theme", "light");
  } else {
    document.body.setAttribute("class", "");
    darkMode.style.display = "none";
    lightMode.style.display = "block";
    localStorage.removeItem("theme");
  }
}
