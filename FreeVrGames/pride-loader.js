// pride-loader.js

// JavaScript to hide the loader with a fade effect after a delay
window.addEventListener('load', function () {
    setTimeout(function () {
        var loaderContainer = document.querySelector('.loader-container');
        loaderContainer.style.opacity = '0'; // Start the fade-out effect
        setTimeout(function () {
            loaderContainer.style.display = 'none'; // Hide the loader container after the fade-out effect
        }, 500); // Adjust this value to match the transition duration
    }, 1000); // 1000 milliseconds (1 seconds) delay (you can adjust the delay time as needed)
});