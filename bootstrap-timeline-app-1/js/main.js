// This file contains JavaScript code to handle interactivity for the timeline entries.

document.addEventListener('DOMContentLoaded', function() {
    // Get all the show buttons
    var buttons = document.querySelectorAll('.show-btn');
    
    // Loop through each button
    buttons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Find the info div next to the button
            var info = btn.nextElementSibling;
            // Toggle display
            if (info.style.display === "block") {
                info.style.display = "none";
                btn.textContent = "Show Details";
            } else {
                info.style.display = "block";
                btn.textContent = "Hide Details";
            }
        });
    });
});