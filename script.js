const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");

const toggleScreen = () => {
  wrapper.classList.toggle("show-category");
};

menuBtn.addEventListener("click", toggleScreen);
