const chatbox = document.getElementById("chatbox");
const answerArea = document.getElementById("answer-area");

let currentQuestion = 0;
let userFacts = [];


// =================================
// QUESTIONS
// =================================

const questions = [

    // {
    //     text: "Mari kita mulai. Manakah model motor yang Anda gunakan?",

    //     answers: [
    //         {
    //             text: "Honda BeAT",
    //             fact: "honda_beat"
    //         },
    //         {
    //             text: "Honda Vario",
    //             fact: "honda_vario"
    //         },
    //         {
    //             text: "Honda Scoopy",
    //             fact: "honda_scoopy"
    //         },
    //         {
    //             text: "Honda PCX 160",
    //             fact: "honda_pcx"
    //         },
    //         {
    //             text: "Yamaha NMAX",
    //             fact: "yamaha_nmax"
    //         },
    //         {
    //             text: "Yamaha Mio",
    //             fact: "yamaha_mio"
    //         },
    //         {
    //             text: "Lainnya",
    //             fact: "motor_lain"
    //         },
    //     ]
    // },

    {
        text: "Mari kita mulai. Apakah panel motor menyala?",

        images: [],

        answers: [

            {
                text: "Menyala",
                fact: "panel_menyala"
            },

            {
                text: "Menyala redup",
                fact: "panel_redup"
            },

            {
                text: "Tidak menyala",
                fact: "panel_mati"
            }

        ]
    },

    {
        text: "Cek tangki bensin secara langsung. Apakah terdapat bensin yang cukup?",

        images: [],

        answers: [

            {
                text: "Ya",
                fact: "ada_bensin"
            },

            {
                text: "Tidak",
                fact: "tidak_ada_bensin"
            }

        ]
    },

    {
        text: "Apakah starter motor berbunyi ketika ditekan?",

        images: [],

        answers: [

            {
                text: "Iya",
                fact: "starter_berbunyi"
            },

            {
                text: "Ya tetapi mesin tidak hidup",
                fact: "starter_tidak_bekerja"
            },

            {
                text: "Tidak",
                fact: "starter_tidak_berbunyi"
            }

        ]
    },

    {
        text: "Apakah standar samping sudah dinaikkan?",

        images: [],

        answers: [

            {
                text: "Sudah",
                fact: "standar_samping_naik"
            },

            {
                text: "Belum",
                fact: "standar_samping_turun"
            }

        ]
    },

    {
        text: "Apakah klakson motor berfungsi?",

        images: [],

        answers: [

            {
                text: "Berbunyi",
                fact: "klakson_berbunyi"
            },

            {
                text: "Berbunyi lemah",
                fact: "klakson_lemah"
            },

            {
                text: "Tidak berbunyi",
                fact: "klakson_tidak_berbunyi"
            }

        ]
    },

    // {
    //     text: "Apakah mesin mati tiba-tiba mendadak saat berjalan?",

    //     images: [],

    //     answers: [

    //         {
    //             text: "Iya",
    //             fact: "mesin_mati_mendadak"
    //         },

    //         {
    //             text: "Tidak",
    //             fact: "mesin_tidak_mati_mendadak"
    //         }

    //     ]
    // },

    {
        text: "Apakah ada di antara lampu indikator ini yang menyala?",

        images: [
            "images/indikator.jpg"
        ],

        answers: [

            {
                text: "Nomor 1",
                fact: "indikator_mil"
            },

            {
                text: "Nomor 2",
                fact: "indikator_suhu"
            },

            {
                text: "Nomor 3",
                fact: "indikator_baterai"
            },

            {
                text: "Tidak ada",
                fact: "tidak_ada_indikator"
            }

        ]
    },

    {
        text: "Apakah rem responsif (langsung berhenti ketika ditekan)?",

        images: [],

        answers: [

            {
                text: "Iya",
                fact: "rem_responsif"
            },

            {
                text: "Tidak",
                fact: "rem_tidak_responsif"
            },

            {
                text: "Tidak ada tuas rem",
                fact: "tuas_rem_kosong"
            }

        ]
    },

    {
        text: "Apakah permukaan bagian bawah ban terlihat lebar?",

        images: [],

        answers: [

            {
                text: "Iya",
                fact: "permukaan_ban_lebar"
            },

            {
                text: "Tidak",
                fact: "permukaan_ban_tidak_lebar"
            }

        ]
    },

    {
        text: "Periksa kotak sekring di bawah pijakan kaki motor. Apakah sekring putus?",

        images: [
            "images/sekring.webp"
        ],

        answers: [

            {
                text: "Iya",
                fact: "permukaan_ban_lebar"
            },

            {
                text: "Tidak",
                fact: "permukaan_ban_tidak_lebar"
            }

        ]
    },

    {
        text: "Bagaimana kondisi motor sebelumnya saat dijalankan?",

        images: [],

        answers: [

            {
                text: "Stabil dan mudah dikendalikan",
                fact: "motor_stabil"
            },

            {
                text: "Stabil tetapi lambat",
                fact: "motor_lambat"
            },

            {
                text: "Tidak stabil",
                fact: "motor_tidak_stabil"
            },

        ]
    },

];


// =================================
// START
// =================================

async function start() {

    await loadRules();

    addBotMessage(
        "Halo! Aku Oto"
    );

    addBotMessage(
        "Aku akan membantu mencari kemungkinan masalah pada motor kamu."
    );

    // addBotMessage(
    //     "Mari kita mulai. Apa yang terjadi dengan motor kamu?"
    // );

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

    const question = questions[currentQuestion];

    addBotMessage(
        question.text,
        question.images || []
    );

    answerArea.innerHTML = "";

    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.className = "answer-button";

        button.textContent = answer.text;

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

        "gangguan_aki",

        "sistem_pengaman",

        "bensin_habis",

        "aki_lemah",

        "malfungsi",

        "mesin_panas",

        "rem_tidak_aman",

        "masalah_ban",

        "sekring_rusak",

        "gangguan_aki_lanjut"

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
            "Sebaiknya bawa motormu ke bengkel terdekat untuk pengamatan lanjutan atau konsultasi dengan mekanik."
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
        "Mulai pemeriksaan lagi";


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
