const questions = [
    {
        text: "Does the engine fail to start?",
        fact: "engine_wont_start"
    },

    {
        text: "Does the starter motor sound slow when you press the starter?",
        fact: "starter_sounds_slow"
    },

    {
        text: "Are the headlights dim?",
        fact: "headlight_dim"
    },

    {
        text: "Does the starter motor turn the engine normally?",
        fact: "starter_turns_normally"
    },

    {
        text: "Is there fuel in the tank?",
        fact: "fuel_available"
    },

    {
        text: "Is the spark plug producing a spark?",
        fact: "spark_present"
    }
];

let currentQuestion = 0;
let userFacts = [];


// Start the application
async function start() {

    await loadRules();

    showQuestion();
}


// Display question
function showQuestion() {

    if (currentQuestion >= questions.length) {
        diagnose();
        return;
    }

    document.getElementById("question").textContent =
        questions[currentQuestion].text;
}


// User answers
function answer(isYes) {

    const question = questions[currentQuestion];

    addChatMessage(
        question.text,
        isYes ? "Yes" : "No"
    );

    if (isYes) {
        userFacts.push(question.fact);
    }

    currentQuestion++;

    showQuestion();
}


// Run inference
function diagnose() {

    const result = forwardChain(userFacts);

    let diagnosis = null;

    for (const fact of result.facts) {

        if (
            fact === "battery_problem" ||
            fact === "spark_plug_problem" ||
            fact === "fuel_problem" ||
            fact === "fuel_delivery_problem" ||
            fact === "starter_or_battery_problem"
        ) {
            diagnosis = fact;
        }
    }

    displayResult(diagnosis, result);
}


// Display diagnosis
function displayResult(diagnosis, result) {

    const resultElement = document.getElementById("result");

    if (!diagnosis) {

        resultElement.innerHTML = `
            <h2>Unable to determine the problem</h2>
            <p>
                The available rules do not match your symptoms.
                Consider checking the motorcycle manually or consulting
                a mechanic.
            </p>
        `;

    } else {

        const rule = rules.find(
            r => r.conclusion === diagnosis
        );

        resultElement.innerHTML = `
            <h2>Possible Problem</h2>

            <h3>${formatDiagnosis(diagnosis)}</h3>

            <p>${rule.explanation}</p>

            <h4>Inference:</h4>
            <p>Rules used: ${result.firedRules.join(", ")}</p>
        `;
    }

    resultElement.classList.remove("hidden");

    document
        .getElementById("question-area")
        .classList.add("hidden");

    document
        .getElementById("restart")
        .classList.remove("hidden");
}


// Convert ID to readable text
function formatDiagnosis(text) {

    return text
        .replaceAll("_", " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}


// Chat display
function addChatMessage(question, answer) {

    const chatbox = document.getElementById("chatbox");

    chatbox.innerHTML += `
        <div class="message">
            <strong>Question:</strong> ${question}<br>
            <strong>You:</strong> ${answer}
        </div>
    `;
}


// Restart
function restart() {

    currentQuestion = 0;
    userFacts = [];

    document.getElementById("chatbox").innerHTML = "";

    document
        .getElementById("result")
        .classList.add("hidden");

    document
        .getElementById("restart")
        .classList.add("hidden");

    document
        .getElementById("question-area")
        .classList.remove("hidden");

    showQuestion();
}


start();
