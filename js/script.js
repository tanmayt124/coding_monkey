$(document).ready(function(){
    // Handle click event for navigation links
    $('.side-bar .nav li a').click(function(){
        // Remove 'active' class from all links
        $('.side-bar .nav li a').removeClass('active');
        // Add 'active' class to the clicked link
        $(this).addClass('active');
    });
});
