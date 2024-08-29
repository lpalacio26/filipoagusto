function initializeWindow(windowId, closeButtonId) {
  const windowElement = document.getElementById(windowId);
  const closeButton = document.getElementById(closeButtonId);

  closeButton.addEventListener("click", () => {
    windowElement.style.display = "none";
  });

  let isDragging = false;
  let offsetX, offsetY;

  windowElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = windowElement.getBoundingClientRect();
    offsetX = e.clientX - rect.left - rect.width / 2;
    offsetY = e.clientY - rect.top - rect.height / 2;
    windowElement.style.zIndex = "3"; // Bring the window to the front
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      windowElement.style.left = `${x}px`;
      windowElement.style.top = `${y}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

// Define bringWindowToFront function
function bringWindowToFront(windowElement) {
  // Bring the specified window to the front by setting its z-index higher than other windows
  const windows = document.querySelectorAll(".window");
  windows.forEach((window) => {
    if (window !== windowElement) {
      window.style.zIndex = "2"; // Lower the z-index of other windows
    }
  });
  windowElement.style.zIndex = "3"; // Bring the specified window to the front
}

// Define NavbarImages
const placesNavbarImage = document.getElementById("placesNavbarImage");
const peopleNavbarImage = document.getElementById("peopleNavbarImage");
const soundsNavbarImage = document.getElementById("soundsNavbarImage");
const messagesNavbarImage = document.getElementById("messagesNavbarImage");

// Define placesWindow
const placesWindow = document.getElementById("places-window");
// Define livefeedWindow
const livefeedWindow = document.getElementById("livefeed-window");
// Define peopleWindow
const peopleWindow = document.getElementById("people-window");
// Define soundsWindow
const soundsWindow = document.getElementById("sounds-window");
// Define soundsWindow
const messagesWindow = document.getElementById("messages-window");
// Define sidebar
const sidebar = document.getElementById("sidebar");

// Initialize windows
initializeWindow("livefeed-window", "close-button");
initializeWindow("places-window", "places-close-button");
initializeWindow("people-window", "people-close-button");
initializeWindow("sounds-window", "sounds-close-button");
initializeWindow("messages-window", "messages-close-button");

// Bring places window to the front when navbar image clicked
placesNavbarImage.addEventListener("click", () => {
  placesWindow.style.display = "block";
  bringWindowToFront(placesWindow);
});

// Bring people window to the front when navbar image clicked
peopleNavbarImage.addEventListener("click", () => {
  peopleWindow.style.display = "block";
  bringWindowToFront(peopleWindow);
});

// Bring sounds window to the front when navbar image clicked
soundsNavbarImage.addEventListener("click", () => {
  soundsWindow.style.display = "block";
  bringWindowToFront(soundsWindow);
});

// Bring messages window to the front when navbar image clicked
messagesNavbarImage.addEventListener("click", () => {
  messagesWindow.style.display = "block";
  bringWindowToFront(messagesWindow);
});

// Bring livefeed window to the front when clicked
livefeedWindow.addEventListener("mousedown", () => {
  bringWindowToFront(livefeedWindow);
});

// Bring places window to the front when clicked
placesWindow.addEventListener("mousedown", () => {
  bringWindowToFront(placesWindow);
});

// Bring people window to the front when clicked
peopleWindow.addEventListener("mousedown", () => {
  bringWindowToFront(peopleWindow);
});

// Bring sounds window to the front when clicked
soundsWindow.addEventListener("mousedown", () => {
  bringWindowToFront(soundsWindow);
});

// Bring messages window to the front when clicked
messagesWindow.addEventListener("mousedown", () => {
  bringWindowToFront(messagesWindow);
});

// Check if the device is a mobile device
const isMobile = window.matchMedia(
  "only screen and (max-width: 768px)"
).matches;

if (isMobile) {
  // Set initial positions for windows on mobile devices

  livefeedWindow.style.left = "50%";
  livefeedWindow.style.top = `32%`;

  placesWindow.style.left = "50%";
  placesWindow.style.top = `${
    livefeedWindow.offsetHeight + livefeedWindow.offsetTop + 0
  }px`;

  peopleWindow.style.left = "50%";
  peopleWindow.style.top = `${
    placesWindow.offsetTop + placesWindow.offsetHeight + 0
  }px`;

  messagesWindow.style.left = "50%";
  messagesWindow.style.top = `${
    peopleWindow.offsetTop + peopleWindow.offsetHeight + 0
  }px`;

  soundsWindow.style.left = "50%";
  soundsWindow.style.top = `${
    messagesWindow.offsetTop + messagesWindow.offsetHeight + 0
  }px`;

  sidebar.style.top = `${
    soundsWindow.offsetTop + soundsWindow.offsetHeight*0.5 
  }px`;

  
}
