// const btn = document.getElementById("btn-toggle");
// btn.addEventListener("click", function () {
//   btn.classList.toggle("bxs-sun");
//   btn.classList.toggle("bxs-moon");
//   document.body.style.backgroundColor = "var(--white)";
// });

document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.querySelector(".dark-mode-checkbox");

  checkbox.checked = localStorage.getItem("darkMode") === "true";

  checkbox.addEventListener("change", function (event) {
    localStorage.setItem("darkMode", event.currentTarget.checked);
  });
});
