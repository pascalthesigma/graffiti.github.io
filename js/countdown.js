/**
 * Countdown to specific time (7:30 PM Eastern Time)
 * Enhanced with security features to prevent bypass
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the countdown element
    const countdownTimer = document.getElementById('countdown-timer');
    const countdownOverlay = document.getElementById('countdown-overlay');
    
    if (!countdownTimer || !countdownOverlay) return;
    
    // Add class to body to prevent scrolling while countdown is active
    document.body.classList.add('countdown-active');
    
    // Store the original body content
    const bodyContent = document.body.innerHTML;
    
    // Function to get target time in Eastern Time
    function getTargetTime() {
        const now = new Date();
        
        // Create target date object for today at 7:30 PM ET
        const target = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();
        
        // Set the target time to 19:30 (7:30 PM)
        target.setHours(19, 30, 0, 0);
        
        // If current time is past 7:30 PM ET, set target to tomorrow
        if (currentHour > 19 || (currentHour === 19 && currentMinutes >= 30)) {
            target.setDate(target.getDate() + 1);
        }
        
        return target;
    }
    
    // Update the countdown timer
    function updateCountdown() {
        // Ensure overlay is still in the DOM - if not, reset the body content
        if (!document.body.contains(countdownOverlay)) {
            location.reload();
            return;
        }
        
        // Check if the overlay is visible
        const overlayStyle = window.getComputedStyle(countdownOverlay);
        if (overlayStyle.display === 'none' || overlayStyle.visibility === 'hidden' || 
            overlayStyle.opacity === '0' || parseFloat(overlayStyle.opacity) < 0.1) {
            location.reload();
            return;
        }
        
        const targetTime = getTargetTime();
        const now = new Date();
        const timeLeft = targetTime - now;
        
        // Calculate time components
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Display the time
        countdownTimer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // If countdown is finished, remove overlay
        if (timeLeft <= 0) {
            countdownOverlay.style.display = 'none';
            document.body.classList.remove('countdown-active');
            return;
        }
        
        // Continue updating
        setTimeout(updateCountdown, 1000);
    }
    
    // Set up mutation observer to detect DOM changes affecting the overlay
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                // Check if overlay was removed or modified
                const overlayExists = document.body.contains(countdownOverlay);
                
                if (!overlayExists) {
                    // If overlay was removed, reload the page
                    location.reload();
                }
                
                // Check if the overlay style was modified
                if (countdownOverlay && (
                    countdownOverlay.style.display === 'none' ||
                    countdownOverlay.style.visibility === 'hidden' ||
                    countdownOverlay.style.opacity === '0' ||
                    parseInt(countdownOverlay.style.zIndex) < 1000
                )) {
                    // If overlay was hidden, reload the page
                    location.reload();
                }
            }
        });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.body, { 
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'id']
    });
    
    // Force the countdown overlay to be visible
    countdownOverlay.style.display = 'flex';
    document.body.classList.add('countdown-active');
    updateCountdown();
    
    // Prevent right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Override console methods to deter developer tools usage
    const consoleWarning = "This site is protected. Please wait until the countdown completes.";
    
    function lockConsole() {
        const originalConsole = { ...console };
        console.log = function() { originalConsole.warn(consoleWarning); };
        console.clear = function() { originalConsole.warn(consoleWarning); };
        console.warn = function() { originalConsole.warn(consoleWarning); };
        console.error = function() { originalConsole.warn(consoleWarning); };
    }
    
    lockConsole();
    
    // Add keydown event listener to catch common dev tools shortcuts
    document.addEventListener('keydown', function(e) {
        // F12 key or Ctrl+Shift+I/J/K/C
        if (
            e.key === 'F12' || 
            ((e.ctrlKey || e.metaKey) && e.shiftKey && 
                (e.key === 'I' || e.key === 'i' || 
                 e.key === 'J' || e.key === 'j' || 
                 e.key === 'K' || e.key === 'k' || 
                 e.key === 'C' || e.key === 'c'))
        ) {
            e.preventDefault();
            return false;
        }
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            // When returning to the tab, verify the overlay is still present
            const overlayExists = document.body.contains(countdownOverlay);
            if (!overlayExists || countdownOverlay.style.display === 'none') {
                location.reload();
            }
        }
    });
});
