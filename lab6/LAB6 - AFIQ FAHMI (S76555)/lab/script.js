const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyperlinks Text Markup Language", "Hyper Text Markup Language", "High Tech Modern Language"],
        answer: 1
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["JavaScript", "CSS", "Python"],
        answer: 1
    },
    {
        question: "Which tag is used to display JavaScript?",
        options: ["<javascript>", "<js>", "<script>"],
        answer: 2
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style System", "Computer Styling Syntax"],
        answer: 0
    },
    {
        question: "Which part of a website handles interactivity?",
        options: ["HTML", "CSS", "JavaScript"],
        answer: 2
    }
];

let shuffledQuestions;
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            feedback("Time's up!", "red");
        }
    }, 1000);
}

function displayQuestion() {
    const q = shuffledQuestions[currentIndex];

    document.getElementById("question-text").textContent = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = opt;
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    clearInterval(timer);

    const correct = shuffledQuestions[currentIndex].answer;

    if (selected === correct) {
        score++;
        feedback("Correct!", "green");
    } else {
        feedback("Incorrect!", "red");
    }

    document.getElementById("score").textContent = score;
}

function feedback(msg, color) {
    const fb = document.getElementById("feedback");
    fb.textContent = msg;
    fb.style.color = color;
}

function nextQuestion() {
    currentIndex++;

    if (currentIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    feedback("");
    displayQuestion();
    startTimer();
}

function endQuiz() {
    document.getElementById("question-section").innerHTML =
        `<h2>Quiz Completed!</h2><p>Your final score: ${score}</p>`;
    document.getElementById("feedback").textContent = "";
    document.getElementById("timer").style.display = "none";
    document.getElementById("next-btn").style.display = "none";
}

function startQuiz() {
    shuffleQuestions();
    displayQuestion();
    startTimer();
}

startQuiz();

document.getElementById("next-btn").addEventListener("click", nextQuestion);
