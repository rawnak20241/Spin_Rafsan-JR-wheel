document.addEventListener('DOMContentLoaded', function() {
    const wheelImage = document.getElementById('wheelImage');
    const spinButton = document.getElementById('spinButton');
    const spinButton2 = document.getElementById('spinButton2');
    let isSpinning = false;

    // Function to get all URL parameters as a query string
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return params.toString(); // Returns all parameters as a query string (e.g., "utm_source=google&ref=affiliate")
    }

    // Function to append URL parameters to the claim URL
    function getClaimUrl() {
        const baseUrl = 'https://m.me/627722663760474?source=qr_link_share';
        const params = getUrlParams();
        // If there are parameters, append them to the base URL
        if (params) {
            return `${baseUrl}?${params}`;
        }
        return baseUrl; // Return base URL if no parameters
    }

    function spin() {
        if (isSpinning) return;
        isSpinning = true;
        
        // Remove the slow rotation animation
        wheelImage.style.animation = 'none';
        
        // Force a reflow to ensure the animation removal takes effect
        void wheelImage.offsetWidth;
        
        // Calculate spins to land at 5 o'clock (150 degrees)
        const fullRotations = 5; // Reduced number of rotations for shorter spin
        const targetDegree = 300; // 5 o'clock position
        const spinDegrees = (fullRotations * 360) + targetDegree;
        
        wheelImage.style.transform = `rotate(${spinDegrees}deg)`;
        wheelImage.style.transition = 'transform 2s cubic-bezier(0.2, 0.8, 0.3, 1)';
        
        spinButton.disabled = true;
        spinButton2.disabled = true;
        
        setTimeout(() => {
            isSpinning = false;
            spinButton.disabled = false;
            spinButton2.disabled = false;
            showWinModal();
        }, 2500); // Reduced to match new spin duration
    }

    function triggerConfetti() {
        // Create and configure a fixed canvas for confetti
        const canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        document.body.appendChild(canvas);
        
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true,
            zIndex: 10000
        });

        // Create a colorful confetti burst
        myConfetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#9400D3']
        });

        // Add a second burst after a small delay for more impact
        setTimeout(() => {
            myConfetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            myConfetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 150);

        // Clean up the canvas after animation
        setTimeout(() => {
            canvas.remove();
        }, 3000);
    }

    function showWinModal() {
        const winModal = new bootstrap.Modal(document.getElementById('winModal'));
        winModal.show();
        triggerConfetti(); // Trigger confetti when modal shows
    }

    // Add event listeners
    spinButton.addEventListener('click', spin);
    spinButton2.addEventListener('click', spin);

    // Update the claim button to redirect with URL parameters
    document.getElementById('claimButton').addEventListener('click', () => {
        window.location.href = getClaimUrl(); // Redirect with parameters appended
    });
});