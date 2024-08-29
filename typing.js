async function fetchText() {
  const response = await fetch('/server/get-text');

  if (response.ok) {
    const enterText = await response.text();
    return enterText;
  } else {
    console.error('Failed to fetch text');
    return ''; // Return an empty string in case of failure
  }
}

async function startTyping() {
  const enterText = await fetchText();
  typeWriter(enterText, "typing-text");
}

const minTypingSpeed = 30; // Minimum milliseconds per character
const maxTypingSpeed = 50; // Maximum milliseconds per character
const typoFrequency = 0.02; // 10% chance of a typo
const typoPause = 400; // milliseconds to pause after a typo
let currentIndex = 0;

function typeWriter(enterText, where) {
  const element = document.getElementById(where);
  if (currentIndex < enterText.length) {
    const typingSpeed =
      Math.random() * (maxTypingSpeed - minTypingSpeed) + minTypingSpeed;
    setTimeout(function () {
      let newText = enterText.substring(0, currentIndex + 1);
      if (Math.random() < typoFrequency) {
        // Generate a typo
        const typoIndex =
          Math.floor(Math.random() * (enterText.length - currentIndex)) +
          currentIndex;
        const typoChar = String.fromCharCode(
          97 + Math.floor(Math.random() * 26)
        ); // Random lowercase letter
        newText =
          newText.substring(0, typoIndex) +
          typoChar +
          newText.substring(typoIndex + 1);
        element.textContent = newText;
        setTimeout(function () {
          // Pause after typo
          element.textContent = enterText.substring(0, currentIndex + 1);
          currentIndex++;
          typeWriter(enterText, where); // Pass enterText to typeWriter
        }, typoPause);
        return;
      }
      element.textContent = newText;
      currentIndex++;
      typeWriter(enterText, where); // Pass enterText to typeWriter
    }, typingSpeed);
  }
}

startTyping(); // Call startTyping to initiate the typing process
