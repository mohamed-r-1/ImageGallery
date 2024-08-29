// Select the slider container element
const slider = document.querySelector('.slider-container');

// Variables to store the starting and ending X coordinates of a touch
let startX = 0;
let endX = 0;

// Event listener for touchstart - captures the starting X coordinate when the touch starts
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX; // Get the X coordinate of the touch
});

// Event listener for touchend - captures the ending X coordinate when the touch ends
slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX; // Get the X coordinate of the touch

    handleSwipe(); // Call function to handle the swipe
});

// Function to handle swipe based on the difference between startX and endX
function handleSwipe() {
    const threshold = 50;  // Define a threshold for detecting a valid swipe (50 pixels)

    // Check if swipe left (move to the next slide)
    if (startX - endX > threshold) {
        nextSlide(); // Call function to move to the next slide
    }
    // Check if swipe right (move to the previous slide)
    else if (endX - startX > threshold) {
        prevSlide(); // Call function to move to the previous slide
    }
}

// Get Slider Items | Array.form [ES6 Feature]
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'));

// Get Number Of Slides
var slidesCount = sliderImages.length;

// Set Current Slide
var currentSlide = 1;

// Slide Number Element
var slideNumberElement = document.getElementById('slide-number');

// Previous and Next Buttons
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

// Handle Click on Previous and Next Buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

// Create The Main UL Element
var paginationElement = document.createElement('ul');

// Set ID On Created Ul Element
paginationElement.setAttribute('id', 'pagination-ul');

// Create List Items Based On Slides Count
for (var i = 1; i <= slidesCount; i++) {

    // Create The LI
    var paginationItem = document.createElement('li');

    // Set Custom Attribute
    paginationItem.setAttribute('data-index', i);

    // Set Item Content
    paginationItem.appendChild(document.createTextNode(i));

    // Append Items to The Main Ul List
    paginationElement.appendChild(paginationItem);

}

// Add The Created UL Element to The Page
document.getElementById('indicators').appendChild(paginationElement);

// Get The New Created UL
var paginationCreatedUl = document.getElementById('pagination-ul');

// Get Pagination Items | Array.form [ES6 Feature]
var paginationsBullets = Array.from(document.querySelectorAll('#pagination-ul li'));

// Loop Through All Bullets Items
for (var i = 0; i < paginationsBullets.length; i++) {

    paginationsBullets[i].onclick = function () {

        currentSlide = parseInt(this.getAttribute('data-index'));

        theChecker();

    }

}

// Trigger The Checker Function
theChecker();

// Next Slide Function
function nextSlide() {

    if (nextButton.classList.contains('disabled')) {

        // Do Nothing
        return false;

    } else {

        currentSlide++;

        theChecker();

    }

}

// Previous Slide Function
function prevSlide() {

    if (prevButton.classList.contains('disabled')) {

        // Do Nothing
        return false;

    } else {

        currentSlide--;

        theChecker();

    }

}

// Create The Checker Function
function theChecker() {

    // Set The Slide Number
    slideNumberElement.textContent = 'Slide #' + (currentSlide) + ' of ' + (slidesCount);

    // Remove All Active Classes
    removeAllActive();

    // Set Active Class On Current Slide
    sliderImages[currentSlide - 1].classList.add('active');

    // Set Active Class on Current Pagination Item
    paginationCreatedUl.children[currentSlide - 1].classList.add('active');

    // Check if Current Slide is The First
    if (currentSlide == 1) {

        // Add Disabled Class on Previous Button
        prevButton.classList.add('disabled');

    } else {

        // Remove Disabled Class From Previous Button
        prevButton.classList.remove('disabled');

    }

    // Check if Current Slide is The Last
    if (currentSlide == slidesCount) {

        // Add Disabled Class on Next Button
        nextButton.classList.add('disabled');

    } else {

        // Remove Disabled Class From Next Button
        nextButton.classList.remove('disabled');

    }

}

// Remove All Active Classes From Images and Pagination Bullets
function removeAllActive() {

    // Loop Through Images
    sliderImages.forEach(function (img) {

        img.classList.remove('active');

    });

    // Loop Through Pagination Bullets
    paginationsBullets.forEach(function (bullet) {

        bullet.classList.remove('active');

    });

}
