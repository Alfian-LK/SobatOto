const chatbox = document.getElementById("chatbox");
const answerArea = document.getElementById("answer-area");

let currentQuestion = 0;
let userFacts = [];


// =================================
// QUESTIONS
// =================================

const questions = [

    {
        text: "Apakah mesin motor tidak dapat menyala?",

        answers: [
            {
                text: "Ya",
                fact: "engine_wont_start"
            },
            {
                text: "Tidak",
                fact: "engine_can_start"
            }
        ]
    },

    {
        text: "Apa yang terjadi ketika tombol starter ditekan?",

        answers: [

            {
                text: "Tidak terjadi apa-apa",
                fact: "starter_does_not_turn"
            },

            {
                text: "Starter berputar tetapi lambat",
                fact: "starter_sounds_slow"
            },

            {
                text: "Starter berputar normal",
                fact: "starter_turns_normally"
            }

        ]
    },

    {
        text: "Apakah lampu utama terlihat redup?",

        answers: [

            {
                text: "Ya",
                fact: "headlight_dim"
            },

            {
                text: "Tidak",
                fact: "headlight_normal"
            }

        ]
    },

    {
        text: "Apakah bensin masih tersedia di tangki?",

        answers: [

            {
                text: "Ya",
                fact: "fuel_available"
            },

            {
                text: "Tidak",
                fact: "fuel_empty"
            }

        ]
    },

    {
        text: "Apakah busi menghasilkan percikan api?",

        answers: [

            {
                text: "Ya",
                fact: "spark_present"
            },

            {
                text: "Tidak",
                fact: "spark_missing"
            }

        ]
    }

];


// =================================
// START
// =================================

async function start() {

    await loadRules();

    addBotMessage(
        "Halo! Saya SobatOto 🏍️"
    );

    addBotMessage(
        "Saya akan membantu mencari kemungkinan masalah pada motor kamu."
    );

    addBotMessage(
        "Mari kita mulai. Apa yang terjadi dengan motor kamu?"
    );

    showQuestion();
}


// =================================
// SHOW QUESTION
// =================================

function showQuestion() {

    if (currentQuestion >= questions.length) {

        diagnose();

        return;
    }


    const question =
        questions[currentQuestion];


    addBotMessage(question.text);


    answerArea.innerHTML = "";


    question.answers.forEach(answer => {

        const button =
            document.createElement("button");


        button.className =
            "answer-button";


        button.textContent =
            answer.text;


        button.onclick = () => {

            selectAnswer(answer);

        };


        answerArea.appendChild(button);

    });
}


// =================================
// USER ANSWER
// =================================

function selectAnswer(answer) {

    /*
       Add user's response to chat.
    */

    addUserMessage(answer.text);


    /*
       Add fact to knowledge base.
    */

    if (answer.fact) {

        userFacts.push(answer.fact);

    }


    currentQuestion++;


    /*
       Small delay makes it feel
       more like a chatbot.
    */

    answerArea.innerHTML = "";


    setTimeout(() => {

        showQuestion();

    }, 400);
}


// =================================
// BOT MESSAGE
// =================================

function addBotMessage(text) {

    const row =
        document.createElement("div");

    row.className =
        "message-row bot";


    const avatar =
        document.createElement("div");

    avatar.className =
        "bot-avatar";

    avatar.textContent =
        "🏍️";


    const message =
        document.createElement("div");

    message.className =
        "message";


    message.innerHTML = `
        ${text}

        <div class="message-time">
            ${getTime()}
        </div>
    `;


    row.appendChild(avatar);

    row.appendChild(message);


    chatbox.appendChild(row);


    scrollChat();
}


// =================================
// USER MESSAGE
// =================================

function addUserMessage(text) {

    const row =
        document.createElement("div");

    row.className =
        "message-row user";


    const message =
        document.createElement("div");

    message.className =
        "message";


    message.innerHTML = `
        ${text}

        <div class="message-time">
            ${getTime()}
        </div>
    `;


    row.appendChild(message);


    chatbox.appendChild(row);


    scrollChat();
}


// =================================
// DIAGNOSIS
// =================================

function diagnose() {

    const result =
        forwardChain(userFacts);


    const possibleProblems = [

        "battery_problem",

        "starter_or_battery_problem",

        "spark_plug_problem",

        "fuel_problem",

        "fuel_delivery_problem"

    ];


    const diagnosis =
        result.facts.find(
            fact => possibleProblems.includes(fact)
        );


    if (!diagnosis) {

        addBotMessage(
            "Maaf, saya belum dapat menentukan kemungkinan masalah berdasarkan jawaban yang diberikan."
        );

        addBotMessage(
            "Sebaiknya lakukan pemeriksaan lebih lanjut atau konsultasikan dengan mekanik."
        );

        showRestartButton();

        return;
    }


    const rule =
        rules.find(
            r => r.conclusion === diagnosis
        );


    addBotMessage(
        "Terima kasih. Saya sudah menganalisis jawaban kamu."
    );


    setTimeout(() => {

        addBotMessage(
            `Kemungkinan masalahnya adalah <strong>${formatDiagnosis(diagnosis)}</strong>.`
        );

    }, 500);


    setTimeout(() => {

        addBotMessage(
            rule.explanation
        );

        showRestartButton();

    }, 1000);
}


// =================================
// RESTART
// =================================

function showRestartButton() {

    answerArea.innerHTML = "";


    const button =
        document.createElement("button");


    button.className =
        "answer-button";


    button.textContent =
        "🔄 Mulai pemeriksaan lagi";


    button.onclick =
        restart;


    answerArea.appendChild(button);
}


function restart() {

    currentQuestion = 0;

    userFacts = [];


    chatbox.innerHTML = "";


    addBotMessage(
        "Baik! Kita mulai pemeriksaan baru."
    );


    showQuestion();
}


// =================================
// UTILITIES
// =================================

function formatDiagnosis(text) {

    return text
        .replaceAll("_", " ")
        .replace(/\b\w/g, char =>
            char.toUpperCase()
        );
}


function getTime() {

    const now = new Date();

    return now.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


function scrollChat() {

    setTimeout(() => {

        chatbox.scrollTop =
            chatbox.scrollHeight;

    }, 50);
}


start();
