$(document).ready(function(){
    // Handle click event for navigation links
    $('.side-bar .nav li a').click(function(){
        // Remove 'active' class from all links
        $('.side-bar .nav li a').removeClass('active');
        // Add 'active' class to the clicked link
        $(this).addClass('active');

        // Hide the sidebar after a navigation link is clicked
        var sidebar = document.querySelector('.side-bar');
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-expanded');
    });
});

function toggleSidebar(event) {
    event.stopPropagation(); // Prevent the click event from propagating

    var sidebar = document.querySelector('.side-bar');
    sidebar.classList.toggle('active');

    // Toggle the 'show' class on the '.nav' element
    var nav = document.querySelector('.side-bar .nav');
    nav.classList.toggle('show', sidebar.classList.contains('active'));

    // Check if the sidebar is active and adjust left property accordingly
    if (sidebar.classList.contains('active')) {
        sidebar.style.left = '0';
        document.body.classList.add('sidebar-expanded');
    } else {
        sidebar.style.left = '-100%';
        document.body.classList.remove('sidebar-expanded');
    }
}

// Automatic set active tab based on scroll position
document.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;

    // Loop through each section to find the one in view
    document.querySelectorAll('.section').forEach(function(section) {
        var sectionTop = section.offsetTop - 70; // Adjusted for the height of the fixed navbar
        var sectionBottom = sectionTop + section.clientHeight;

        // Check if the scroll position is within the current section
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove 'active' class from all links
            $('.side-bar .nav li a').removeClass('active');
            
            // Add 'active' class to the link corresponding to the current section
            var sectionId = section.id;
            $('.side-bar .nav li a[data-section="' + sectionId + '"]').addClass('active');
        }
    });
});
