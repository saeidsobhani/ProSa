// JavaScript for interactive effects and navigation
document.addEventListener('DOMContentLoaded', function() {
    const participantCircles = document.querySelectorAll('.participant-circle');
    const ringSegments = document.querySelectorAll('.ring-segment');
    const connectorLines = document.querySelectorAll('.connector-line');
    
    // Add click event listeners to each participant circle
    participantCircles.forEach((circle, index) => {
        const link = circle.querySelector('.circle-link');
        
        // Hover effect for corresponding ring segment
        circle.addEventListener('mouseenter', function() {
            // Highlight the corresponding ring segment
            if (ringSegments[index]) {
                ringSegments[index].style.strokeWidth = '24';
                ringSegments[index].style.filter = 'drop-shadow(0 0 12px rgba(86, 171, 145, 0.8))';
            }
            
            // Highlight the corresponding connector line
            if (connectorLines[index]) {
                connectorLines[index].style.stroke = '#2d8659';
                connectorLines[index].style.strokeWidth = '3';
                connectorLines[index].style.opacity = '1';
            }
        });
        
        circle.addEventListener('mouseleave', function() {
            // Reset ring segment
            if (ringSegments[index]) {
                ringSegments[index].style.strokeWidth = '20';
                ringSegments[index].style.filter = 'none';
            }
            
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
            // Or open a modal: openModal(participantNumber);
            
            // Temporary alert for demonstration
            alert(`Opening details for ${participantName}\n\nYou can replace this with:\n- Navigation to a new page\n- Opening a modal dialog\n- Loading dynamic content\n- Any other interaction you need`);
        });
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
