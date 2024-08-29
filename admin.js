document.addEventListener("DOMContentLoaded", function () {
  const questionList = document.querySelector(".question-list");

  // Function to fetch unanswered questions from the server
  function fetchUnansweredQuestions() {
    fetch("/server/questions")
      .then((response) => response.json())
      .then((questions) => {
        // Display questions in the admin interface
        questions.forEach((question) => {
          const questionItem = createQuestionItem(question);
          questionList.appendChild(questionItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching unanswered questions:", error);
      });
  }

  // Function to create a question item
  function createQuestionItem(question) {
    const questionItem = document.createElement("div");
    questionItem.classList.add("question-item");
    questionItem.innerHTML = `<div style="display: flex; justify-content: space-between;">
      <div class="question-text">
        <strong>@${question.DisplayName}</strong> asked:<br>
        ${question.Question}
      </div>
      <button class="delete-button" data-question-id="${question.QuestionID}">delete</button></div>
      <textarea class="answer-input" placeholder="type your answer here"></textarea>
      <button class="submit-answer-button" data-question-id="${question.QuestionID}">submit answer</button>
    `;
    return questionItem;
  }

  // Function to handle answer submission
  function submitAnswer(event) {
    const questionId = event.target.dataset.questionId;
    const answerInput = event.target.previousElementSibling;
    const answer = answerInput.value.trim();

    // Validate answer
    if (!answer) {
      alert("Please provide an answer.");
      return;
    }

    // Submit answer to the server
    fetch("/server/submit-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ questionId, answer }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success response
        // For example, remove the question from the UI
        event.target.closest(".question-item").remove();
      })
      .catch((error) => {
        console.error("Error submitting answer:", error);
      });
  }

  // Event listener for submit answer buttons
  questionList.addEventListener("click", function (event) {
    if (event.target.classList.contains("submit-answer-button")) {
      submitAnswer(event);
    }
  });

  // Function to handle question deletion
  function deleteQuestion(event) {
    const questionId = event.target.dataset.questionId;

    // Confirm deletion with the admin
    const confirmDelete = confirm(
      "Are you sure you want to delete this question?"
    );

    if (confirmDelete) {
      // Send request to delete the question
      fetch("/server/delete-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questionId }),
      })
        .then((response) => {
          if (response.ok) {
            // Remove the question from the UI
            event.target.closest(".question-item").remove();
          } else {
            console.error("Failed to delete question");
          }
        })
        .catch((error) => {
          console.error("Error deleting question:", error);
        });
    }
  }

  // Event listener for delete buttons
  questionList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-button")) {
      deleteQuestion(event);
    }
  });

  // Fetch unanswered questions when the page loads
  fetchUnansweredQuestions();
});

document.getElementById('textForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = document.getElementById('textFuck').value;
  const response = await fetch('/server/submit-text', { // Corrected endpoint URL
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

