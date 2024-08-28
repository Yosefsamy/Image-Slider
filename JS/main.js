let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
const slider = document.getElementById('slider');
const previousBtn=document.querySelector(".slider .prev")
const nextBtn=document.querySelector(".slider .next")
const totalSlides = slides.length;
let interval;

// Function to show the slide at a given index
function showSlide(index) {
    if (index >= totalSlides) slideIndex = 0;
    if (index < 0) slideIndex = totalSlides - 1;
  
    // Apply the transform to slide to show the correct image
    slidesContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

    // Update the pagination dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('active', i === slideIndex);
    }
}

// Add Event Listener To Dots
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click",function(){
        currentSlide(i)
    })
}

// Add Event Listener To Previous Button
previousBtn.addEventListener("click",prevSlide)

// Add Event Listener To Next Button
nextBtn.addEventListener("click",nextSlide)

// Function to go to the next slide
function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
    resetInterval();
}

// Function to go to the previous slide
function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
    resetInterval();
}

// Function to show the slide corresponding to a dot
function currentSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
    resetInterval();
}

// Start automatic slide transitions
function startSlideShow() {
    interval = setInterval(nextSlide, 5000);
}

// Reset the automatic slide transition timer
function resetInterval() {
    clearInterval(interval);
    startSlideShow();
}

// Event listeners for pause/resume on hover
slider.addEventListener('mouseover', () => {
    clearInterval(interval);
});

slider.addEventListener('mouseout', () => {
    startSlideShow();
});


// ! Start the slider show ! //
showSlide(slideIndex);
startSlideShow();


// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        nextSlide();
    }
    if (touchEndX > touchStartX) {
        prevSlide();
    }
}
