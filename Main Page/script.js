// JavaScript for interactive effects and navigation
document.addEventListener('DOMContentLoaded', function() {
    const participantCircles = document.querySelectorAll('.participant-circle');
    const ringSegments = document.querySelectorAll('.ring-segment');
    const connectorLines = document.querySelectorAll('.connector-line');
    
    // Add click event listeners to each participant circle
    participantCircles.forEach((circle, index) => {
        const link = circle.querySelector('.circle-link');

        // Hover effect for corresponding ring segments (previous and next)
        circle.addEventListener('mouseenter', function() {
            // Highlight the current, previous, and next ring segments
            const totalSegments = ringSegments.length;

            // Highlight left (next) segment
            const leftIndex = index;
            // Highlight right (previous) segment
            const rightIndex = (index - 1 + totalSegments) % totalSegments;

            if (ringSegments[leftIndex]) {
                ringSegments[leftIndex].style.strokeWidth = '24';
                ringSegments[leftIndex].style.filter = 'drop-shadow(0 0 12px rgba(86, 171, 145, 0.8))';
            }
            if (ringSegments[rightIndex]) {
                ringSegments[rightIndex].style.strokeWidth = '24';
                ringSegments[rightIndex].style.filter = 'drop-shadow(0 0 12px rgba(86, 171, 145, 0.8))';
            }

            // Highlight the corresponding connector line
            if (connectorLines[index]) {
                connectorLines[index].style.stroke = '#2d8659';
                connectorLines[index].style.strokeWidth = '3';
                connectorLines[index].style.opacity = '1';
            }
        });

        circle.addEventListener('mouseleave', function() {
            // Reset all ring segments
            ringSegments.forEach(seg => {
                seg.style.strokeWidth = '20';
                seg.style.filter = 'none';
            });

            // Reset connector line
            if (connectorLines[index]) {
                connectorLines[index].style.stroke = '#a8e6cf';
                connectorLines[index].style.strokeWidth = '2';
                connectorLines[index].style.opacity = '0.6';
            }
        });

        // Click event - you can customize the URLs or actions here
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Remove this line when you have actual links

            const participantNumber = circle.getAttribute('data-participant');
            const participantName = circle.querySelector('.participant-label').textContent;

            // Log the click (for demonstration)
            console.log(`Clicked on Participant ${participantNumber}: ${participantName}`);

            // TODO: Replace with actual navigation or modal display
            // Example: window.location.href = `/participant/${participantNumber}`;
            // Temporary alert for demonstration
            alert(`Opening details for ${participantName}\n\nYou can replace this with:\n- Navigation to a new page\n`);
        });
    });
    
    // Header button logic
    const homeBtn = document.querySelector('.header-btn:first-child'); // Home button
    const logoutBtn = document.querySelector('.header-btn:last-child'); // Abmelden button
    
    // Home button click event
    homeBtn.addEventListener('click', function(e) {
        // TODO: Replace with actual navigation
        // Example: window.location.href = '/home';
        // Temporary alert for demonstration
        alert(`Navigating to Home\n\nYou can replace this with:\n- Navigation to home/dashboard page\n- Any other home-related functionality`);
    });
    
    // Abmelden button click event
    logoutBtn.addEventListener('click', function(e) {
        // TODO: Replace with actual logout logic
        // Example: clear session and redirect to login
        // Temporary alert for demonstration
        alert(`Logging out...\n\nYou can replace this with:\n- Clear user session\n- Redirect to login page\n- Any other logout functionality`);
    });
    
    // Add rotation animation to the main circle
    const mainCircle = document.querySelector('.main-circle');
    let rotationAngle = 0;
    
    function rotateCircle() {
        rotationAngle += 0.05;
        mainCircle.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;
        requestAnimationFrame(rotateCircle);
    }
    
    // Uncomment the line below to enable continuous rotation
    // rotateCircle();
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const focusedElement = document.activeElement;
        
        if (focusedElement.classList.contains('circle-link')) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });
    
    // Optional: Add intersection observer for entrance animations when scrolling
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, observerOptions);
    
    participantCircles.forEach(circle => {
        observer.observe(circle);
    });
});

// Helper function to open a modal (example implementation)
function openModal(participantNumber) {
    // This is a placeholder function
    // You can implement a modal dialog here to show participant details
    console.log(`Modal opened for participant ${participantNumber}`);
}

// Helper function to navigate to a specific page
function navigateToParticipant(participantNumber) {
    // Replace with your actual routing logic
    window.location.href = `/participant/${participantNumber}`;
}
