function showQuiz() {
    document.querySelectorAll('.quiz-text, .time-text, .click-text').forEach(el => el.style.display = 'none');
    document.querySelector('.quiz-container').style.display = 'flex';
    document.body.onclick = null;

    loadQuiz(); // Load the first question when the quiz starts
}

const quizData = [
    { question: "1. How many hearts does an octopus have?", a: "1", b: "2", c: "3", d: "4", correct: "c" },
    { question: "2. Which of these is actually a berry?", a: "Strawberry", b: "Banana", c: "Raspberry", d: "Blackberry", correct: "b" },
    { question: "3. What is unique about a day on Venus?", a: "It never has daytime", b: "A day is longer than a year", c: "It has two suns", d: "A day lasts only one hour", correct: "b" },
    { question: "4. Which existed first?", a: "Trees", b: "Dinosaurs", c: "Sharks", d: "Humans", correct: "c" },
    { question: "5. What happens at the 'triple point' of water?", a: "It changes color", b: "It becomes unbreakable", c: "It boils and freezes at the same time", d: "It turns into metal", correct: "c" }
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const choices = ["a", "b", "c", "d"].map(id => document.getElementById(`${id}_text`));
const submitBtn = document.getElementById("submit");

let currentQuiz = 0, score = 0;

function loadQuiz() {
    deselectAnswers();
    const { question, a, b, c, d } = quizData[currentQuiz];
    
    questionEl.textContent = question;
    [a, b, c, d].forEach((choice, i) => choices[i].textContent = choice);
}

function getSelected() {
    return [...answerEls].find(el => el.checked)?.value;
}

function deselectAnswers() {
    answerEls.forEach(el => el.checked = false);
}

function nextQuestion() {
    const answer = getSelected();
    if (!answer) return;

    if (answer === quizData[currentQuiz].correct) score++;
    if (++currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        quiz.innerHTML = `<h2>You answered correctly ${score}/${quizData.length} questions.</h2>
                          <button onclick="location.reload()">Reload</button>`;
    }
}
