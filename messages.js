document.addEventListener("DOMContentLoaded", function () {
  const messageLog = document.getElementById("messageLog");
  const displayNameInput = document.getElementById("displayNameInput");
  const questionInput = document.getElementById("questionInput");
  const submitQuestionButton = document.getElementById("submitQuestionButton");

  // Function to handle sending a question to the server
  function sendQuestionToServer() {
    const displayName = displayNameInput.value.trim();
    const question = questionInput.value.trim();

    // Validate input
    if (!displayName || !question) {
      return;
    }

    // Send the question to the server using AJAX
    fetch("/server/submit-question", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ displayName, question }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the message log with the received answer
        updateMessageLog(
          displayName,
          question,
          "filipo will get back to you shortly . . ."
        ); // Initially display 'Waiting...' for unanswered questions
        // Fetch updated question list
        fetchQuestionList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Function to fetch the updated question list from the server
  function fetchQuestionList() {
    fetch("/server/question-list")
      .then((response) => response.json())
      .then((data) => {
        // Clear the message log
        messageLog.innerHTML = "";
        // Update the message log with the updated question list
        data.forEach((item) => {
          updateMessageLog(
            item.DisplayName,
            item.Question,
            item.Answer || "filipo will get back to you shortly . . .",
            item.TimestampQ, // Pass the submission timestamp
            item.TimestampA // Pass the answer timestamp
          ); // Use correct column names
        });

        // Automatically scroll to the bottom when the page is loaded
        messageLog.scrollTop = messageLog.scrollHeight;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Function to fetch question list periodically
  function fetchQuestionListPeriodically() {
    fetchQuestionList(); // Fetch initially
    setInterval(fetchQuestionList, 20000); // Fetch every 5 seconds (adjust as needed)
  }

  // Call the function to start fetching question list periodically
  fetchQuestionListPeriodically();

  // Function to update the message log with the question, answer, and timestamp
  function updateMessageLog(
    displayName,
    question,
    answer,
    timestampQ,
    timestampA
  ) {
    let message = `<li><strong>@${displayName}:</strong> ${question}</li>`;
    if (answer !== "filipo will get back to you shortly . . .") {
      // Actual answer
      message += `<li><strong>@filipoagusto:</strong> ${answer}</li>`;
      message += `<li><small>${timestampA}</small></li>`;
    } else {
      // Temporary answer
      message += `<li><strong>@filipoagusto:</strong> <em>${answer}</em></li>`;
    }
    messageLog.innerHTML += message;
  }

  // Event listener for submit button click
  submitQuestionButton.addEventListener("click", sendQuestionToServer);

  // Fetch the initial question list when the page loads
  fetchQuestionList();
});
