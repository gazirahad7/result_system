let dropdown = document.querySelector(".dropdown");
dropdown?.addEventListener("click", function (event) {
  event.stopPropagation();
  dropdown.classList.toggle("is-active");
});

// loader
let loader = document.getElementById("loader");
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loader.style.visibility = "hidden";
  }, 300);
});

let ul = document.querySelector("ul");
let li = document.querySelectorAll("li");

li.forEach((ele) => {
  ele.addEventListener("click", () => {
    ul.querySelector(".active").classList.remove("active");

    ele.classList.add("active");
  });
});

// li.forEach(el => {
//   el.addEventListener("click", function () {
//     li.forEach(ell => ell.classList.remove("active"))
//     this.classList.add("active")
//   })
// })
