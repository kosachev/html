const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

function toggleSidebar() {
  const isOpen = sidebar.classList.contains("open");
  isOpen ? closeSidebar() : openSidebar();
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "m") toggleSidebar();
  if (e.key === "Escape") closeSidebar();
});

let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].screenX;
  const deltaX = endX - touchStartX;
  if (deltaX < -70) closeSidebar();
});

// Слайдеры (универсальный)
document.querySelectorAll("[data-slider]").forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  const dots = slider.querySelectorAll(".dot");
  let currentIndex = 0;

  function goToSlide(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots[currentIndex].classList.remove("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
  });

  let slideStartX = 0;
  track.addEventListener("touchstart", (e) => {
    slideStartX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", (e) => {
    let slideEndX = e.changedTouches[0].clientX;
    let diff = slideStartX - slideEndX;

    if (diff > 50 && currentIndex < dots.length - 1)
      goToSlide(currentIndex + 1);
    if (diff < -50 && currentIndex > 0) goToSlide(currentIndex - 1);
  });
});
