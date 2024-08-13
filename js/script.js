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

document.addEventListener('DOMContentLoaded', function() {
  // Get references to the checkbox and text input elements
  var checkbox = document.getElementById('anonymousCheck');
  var textInput = document.getElementById('nameBox');
  const stars = document.querySelectorAll('#rating .star');
  const ratingInput = document.getElementById('ratingValue'); // Hidden input for rating
  let selectedValue = 0; // To keep track of the selected star value
  // Add event listener for checkbox change event
  checkbox.addEventListener('change', function() {
      // If checkbox is checked, display text input value
      if (checkbox.checked) {
          textInput.value = "Anonymous";
      }
      else{
          textInput.value = "";
      }
  });
  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const hoverValue = parseInt(star.getAttribute('data-value'), 10);
        console.log(`Hovering over star with value: ${hoverValue}`);
        updateStars(hoverValue, true); // Pass true for hover effect
    });

    star.addEventListener('mouseout', () => {
        console.log(`Mouse out from star, keeping selected value: ${selectedValue}`);
        updateStars(selectedValue, false); // Pass false for default effect
    });

    star.addEventListener('click', () => {
        selectedValue = parseInt(star.getAttribute('data-value'), 10);
        ratingInput.value = selectedValue; // Update hidden input with the selected value
        console.log(`Clicked on star with value: ${selectedValue}`);
        updateStars(selectedValue, false); // Update stars based on the selected value
    });
  });
  function updateStars(value, isHover) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'), 10);
        if (starValue <= value) {
            star.classList.add(isHover ? 'hover' : 'selected');
            star.classList.remove(isHover ? 'selected' : 'hover');
        } else {
            star.classList.remove('hover', 'selected');
        }
    });
  }

  // Initialize stars based on the selected value
  updateStars(selectedValue, false); // false indicates that we are initializing the stars without hover effect
});
window.onload = function() {
    const today = new Date();
    const dob = new Date('11/12/2001'); // Use any date you want here
    const differencedob = today - dob;
    const differenceYearsindob = differencedob / (1000 * 60 * 60 * 24 * 365.25); // Average year length
    const roundedYearsdob = Math.round(differenceYearsindob);
  
    const exp = new Date('07/07/2023');
    const differenceexp = today - exp;
    const differenceYearsinexperience = differenceexp / (1000 * 60 * 60 * 24 * 365.25)
    const roundedYearsexp = Math.round(differenceYearsinexperience);

    // Display the result on the page
    const resultElementdob = document.getElementById('ageDiff');
    resultElementdob.textContent = `${roundedYearsdob} Years` ;

    const resultElementexp = document.getElementById('exp');
    resultElementexp.textContent = `${roundedYearsexp} Year`;
};
  
const words = ['Web Developer', 'Software Engineer', 'Backend Developer', 'Flutter Developer'];
const typingAnimation = document.getElementById('typing');
let currentWordIndex = 0;
let currentLetterIndex = 0;
let isErasing = false;

function typeWords() {
  let word = words[currentWordIndex % words.length];

  if (!isErasing) {
    // Typing animation
    typingAnimation.textContent = word.substring(0, currentLetterIndex);
    currentLetterIndex++;
    if (currentLetterIndex > word.length) {
      isErasing = true;
      setTimeout(() => {
        typeWords();
      }, 1000); // Pause before erasing
    } else {
      setTimeout(typeWords, 125); // Type next letter
    }
  } else {
    // Erasing animation
    typingAnimation.textContent = word.substring(0, currentLetterIndex);
    currentLetterIndex--;
    if (currentLetterIndex < 0) {
      isErasing = false;
      currentWordIndex++;
      setTimeout(typeWords, 1000); // Pause before typing next word
    } else {
      setTimeout(typeWords, 50); // Erase next letter
    }
  }
}

typeWords(); // Start typing animation

const form = document.getElementById('feedbackForm');
const result = document.getElementById('result');
var checkbox = document.getElementById('anonymousCheck');
// Remove the checkbox field from the form data
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkbox.disabled = true; // Disables the checkbox so its value is not submitted
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  checkbox.disabled = true; // Disables the checkbox so its value is not submitted

  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                checkbox.disabled = false; // Re-enable the checkbox after form submission
                result.style.display = "none";
            }, 3000);
        });
});