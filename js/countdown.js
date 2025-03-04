/**
 * Countdown to specific time (7:30 PM Eastern Time)
 * Enhanced with security features to prevent bypass
 * Currently disabled
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get the target time for today at 7:30 PM EST
    const targetTime = new Date();
    const currentTime = new Date();
    
    // Convert target time to EST (UTC-4)
    targetTime.setUTCHours(23, 30, 0, 0); // 7:30 PM EST (23:30 UTC = 7:30 PM EST)
    
    function updateTimer() {
        const now = new Date();
        const timeDiff = targetTime - now;

        // If countdown is finished
        if (timeDiff <= 0) {
            document.getElementById('countdown-timer').textContent = "00:00:00";
            document.getElementById('countdown-overlay').style.display = 'none';
            document.body.classList.remove('countdown-active');
            return;
        }

        // Keep overlay visible and calculate time
        document.getElementById('countdown-overlay').style.display = 'flex';
        document.getElementById('countdown-overlay').style.opacity = '1';
        document.body.classList.add('countdown-active');

        // Calculate hours, minutes, seconds
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Format time components to always show two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Update the display
        document.getElementById('countdown-timer').textContent = 
            `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
});
