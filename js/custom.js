document.addEventListener("DOMContentLoaded", function () {
    const nextButtons = document.querySelectorAll(".next-btn");
    const backButtons = document.querySelectorAll(".back-btn");
    let currentStep = 0;
    const steps = document.querySelectorAll(".step-card");
  
    function showStep(step) {
      steps.forEach((element, index) => {
        if (index === step) {
          element.classList.add("fade-in");
          element.classList.remove("fade-out");
          element.classList.add("active");
          element.style.display = "block"; // Set display to block for the active step
        } else {
          element.classList.remove("fade-in");
          element.classList.add("fade-out");
          element.classList.remove("active");
          element.style.display = "none"; // Hide non-active steps
        }
      });
      checkValidation(step);
    }
  
    nextButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          showStep(currentStep);
  
          // Start the logo rotation and title shuffle when advancing from step 9
          if (index === 8) {
            startLogoRotationAndShuffle();
          }
        }
      });
    });
  
    backButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (currentStep > 0) {
          currentStep--;
          showStep(currentStep);
        }
      });
    });
  
    showStep(currentStep);
  
    // Form validation
    function validateStep(step) {
      let valid = true;
      if (step === 1) {
        const day = document.querySelector("select[placeholder='Tag']").value;
        const month = document.querySelector("select[placeholder='Monat']").value;
        const year = document.querySelector("select[placeholder='Jahr']").value;
        if (!day || !month || !year) {
          valid = false;
        }
      } else if (step === 2) {
        const gender = document.getElementById("gender").value;
        const lookingFor = document.getElementById("looking_for").value;
        if (!gender || !lookingFor) {
          valid = false;
        }
      } else if (step === 3) {
        const ageFrom = document.getElementById("age_from").value;
        const ageTo = document.getElementById("age_to").value;
        if (!ageFrom || !ageTo || parseInt(ageFrom) > parseInt(ageTo)) {
          valid = false;
        }
      } else if (step === 4) {
        const locationInput = document.getElementById("input-location").value;
        if (!locationInput) {
          valid = false;
        }
      } else if (step === 5) {
        const emailInput = document.getElementById("input-email").value;
        if (!emailInput || !validateEmail(emailInput)) {
          valid = false;
        }
      } else if (step === 6) {
        const usernameInput = document.getElementById("gebruikersnaam").value;
        if (usernameInput.length < 6) {
          valid = false;
        }
      } else if (step === 7) {
        const passwordInput = document.getElementById("wachtwoord").value;
        if (passwordInput.length < 6) {
          valid = false;
        }
      } else if (step === 8) {
        const checkbox = document.getElementById("flexCheckDefault");
        if (!checkbox.checked) {
          valid = false;
        }
      }
      return valid;
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    function checkValidation(step) {
      const valid = validateStep(step);
      const nextButton = steps[step].querySelector(".next-btn");
  
      if (nextButton) {
        // Ensure nextButton is not null
        if (valid) {
          nextButton.style.display = "block";
        } else {
          nextButton.style.display = "none";
        }
      }
    }
  
    steps.forEach((step, index) => {
      if (index > 0) {
        step.querySelectorAll("input, select").forEach((input) => {
          input.addEventListener("input", () => checkValidation(index));
          input.addEventListener("change", () => checkValidation(index));
        });
      }
    });
  
    showStep(currentStep);
  });
  
  // Function to start logo rotation and title shuffle
  function startLogoRotationAndShuffle() {
    // Logo Rotation
    function startLogoRotation() {
      const logos = document.querySelectorAll(".logo-search");
      let currentIndex = 0;
  
      function showNextLogo() {
        // Remove 'current' class from current logo
        logos[currentIndex].classList.remove("current");
  
        // Update currentIndex to the next logo
        currentIndex = (currentIndex + 1) % logos.length;
  
        // Add 'current' class to the next logo
        logos[currentIndex].classList.add("current");
      }
  
      // Set an interval to show the next logo every 200ms
      const intervalId = setInterval(showNextLogo, 200);
  
      // Stop the rotation after 2 seconds
      setTimeout(() => {
        clearInterval(intervalId);
  
        // Select a random logo index
        const randomIndex = Math.floor(Math.random() * logos.length);
  
        // Remove 'current' class from the current logo
        logos[currentIndex].classList.remove("current");
  
        // Set the random logo as 'current'
        logos[randomIndex].classList.add("current");
  
        // Update the final logo with the random logo
        const finalLogo = document.querySelector(".logo-search-final img");
        finalLogo.src = logos[randomIndex].src;
      }, 2000); // 2000 milliseconds = 2 seconds
    }
  
    // Title Shuffle
    function startTitleShuffle() {
      const headings = Array.from(
        document.querySelectorAll(".title-shuffle .card-title")
      );
      const paragraphs = Array.from(
        document.querySelectorAll(".show-stepper p, .logo-search-container")
      );
      const logoSearchContainer = document.querySelector(".logo-search-container");
      const showStepper = document.querySelector(".show-stepper");
      const finalContent = document.querySelector(".final-content");
      const loaderStep = document.querySelector(".loader-step");
  
      let currentIndex = 0;
      let paragraphIndex = 0;
  
      // Function to show and hide heading elements
      function toggleHeadings() {
        // Hide the current element
        headings[currentIndex].classList.remove("d-block");
        headings[currentIndex].classList.add("d-none");
  
        // Move to the next element
        currentIndex = (currentIndex + 1) % headings.length;
  
        // Show the next element
        headings[currentIndex].classList.remove("d-none");
        headings[currentIndex].classList.add("d-block");
  
        // Start showing stepper content after the first title is shown
        if (currentIndex === 1) {
          setTimeout(() => {
            showStepper.classList.remove("d-none");
            showStepper.classList.add("d-block");
            showParagraphsAndLogos();
          }, 1000); // Start stepper content 1 second after first title is shown
        }
      }
  
      // Function to show paragraphs and logos
      function showParagraphsAndLogos() {
        if (paragraphIndex < paragraphs.length) {
          paragraphs[paragraphIndex].classList.remove("d-none");
          paragraphs[paragraphIndex].classList.add("d-block");
  
          // Start logo rotation when the logo-search-container becomes visible
          if (paragraphs[paragraphIndex] === logoSearchContainer) {
            startLogoRotation();
          }
  
          paragraphIndex++;
          setTimeout(showParagraphsAndLogos, 3000);
        } else {
          // Show final content and hide the loader step
          setTimeout(() => {
            console.log("Showing final content...");
            loaderStep.classList.remove("d-block");
            loaderStep.classList.add("d-none");
            finalContent.classList.remove("d-none");
            finalContent.classList.add("d-block");
          }, 1000); // Show final content after the last item is displayed
        }
      }
  
      headings.forEach((heading, index) => {
        if (index !== currentIndex) {
          heading.classList.add("d-none");
        } else {
          heading.classList.add("d-block");
        }
      });
  
      // Run the toggle function every 3 seconds
      setInterval(toggleHeadings, 3000);
    }
  
    startTitleShuffle();
  }
  
  