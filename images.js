// Define a function to load images from a specified folder
function loadImagesFromFolder(folder, contentSelector) {
  return new Promise((resolve, reject) => {
    // Fetch image filenames from the specified folder
    fetch(folder)
      .then((response) => response.text())
      .then((text) => {
        // Extract image filenames from the HTML response
        const filenames = text
          .match(/href="([^"]+\.(?:png|jpg|jpeg|gif))"/gi)
          .map((match) => match.split('"')[1]);

        // Resolve with the array of image filenames
        resolve(filenames);
      })
      .catch((error) => reject(error));
  })
    .then((filenames) => {
      // Define content element after images are loaded
      const contentElement = document.querySelector(contentSelector);

      // Function to display images from the specified folder in random order for 8 seconds each
      function displayImagesRandomly(images) {
        // Function to display an image
        function displayImage(imageSrc) {
          contentElement.style.backgroundImage = `url(${imageSrc})`;
          contentElement.style.backgroundSize = "cover"; // Cover the entire container
          contentElement.style.backgroundPosition = "center"; // Center the image
        }

        // Function to select a random image
        function selectRandomImage() {
          const randomIndex = Math.floor(Math.random() * images.length);
          return images[randomIndex];
        }

        // Function to display images in sequence with random timeout
        function displayImageSequence() {
          const imageSrc = selectRandomImage();
          displayImage(imageSrc);
          const timeoutDuration =
            Math.floor(Math.random() * (10000 - 6000 + 1)) + 6000; // Random timeout between 7 and 11 seconds
          setTimeout(displayImageSequence, timeoutDuration);
        }

        // Start displaying images in sequence
        displayImageSequence();
      }

      // Display images randomly
      displayImagesRandomly(filenames);
    })
    .catch((error) => {
      console.error("Error loading images:", error);
    });
}

// Load and display images for different folders and windows
loadImagesFromFolder("img/places/", ".places-content");
loadImagesFromFolder("img/people/", ".people-content");
// Add more calls to loadImagesFromFolder for additional folders and windows
