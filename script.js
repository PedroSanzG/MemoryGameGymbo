const questions = [
  "How satisfied are you with the event organization?",
  "How clear was the communication before the event?",
  "How useful was the content presented?",
  "How engaging were the activities?",
  "How likely are you to recommend this experience?",
  "Rate the quality of the facilitators.",
  "How interactive was the session?",
  "How valuable was the information shared?",
  "How easy was it to participate?",
  "Overall experience rating."
];

let currentQuestion = 0;
let answers = [];

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const questionText = document.getElementById("questionText");
const questionCounter = document.getElementById("questionCounter");
const questionPercent = document.getElementById("questionPercent");
const progressFill = document.getElementById("progressFill");
const scaleButtons = document.getElementById("scaleButtons");
const finalScore = document.getElementById("finalScore");
const answerSummary = document.getElementById("answerSummary");

function startQuiz() {
  currentQuestion = 0;
  answers = [];

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  questionText.textContent = questions[currentQuestion];

  const questionNumber = currentQuestion + 1;
  const percent = Math.round((questionNumber / questions.length) * 100);

  questionCounter.textContent = `Question ${questionNumber} / ${questions.length}`;
  questionPercent.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  scaleButtons.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const button = document.createElement("button");
    button.className = "scale-button";
    button.textContent = i;
    button.onclick = () => selectAnswer(i);
    scaleButtons.appendChild(button);
  }
}

function selectAnswer(value) {
  answers.push(value);

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const total = answers.reduce((sum, value) => sum + value, 0);
  const maxPossible = questions.length * 5;
  const scoreOutOfTen = ((total / maxPossible) * 10).toFixed(1);

  finalScore.textContent = `${scoreOutOfTen} / 10`;
  answerSummary.innerHTML = "";

  answers.forEach((answer, index) => {
    const row = document.createElement("div");
    row.className = "summary-row";
    row.innerHTML = `<span>Question ${index + 1}</span><strong>${answer}/5</strong>`;
    answerSummary.appendChild(row);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  answers = [];

  resultScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
