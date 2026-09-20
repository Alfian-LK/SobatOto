// 1. Predefined responses dictionary
const botResponses = {
    "hello": "Hi there! How can I help you today?",
    "hi": "Hello! What can I do for you?",
    "how are you": "I'm doing great, thank you for asking! How about you?",
    "what is your name": "I am a simple JavaScript chatbot.",
    "bye": "Goodbye! Have a wonderful day!",
    "default": "I'm not sure I understand that. Could you try rephrasing?"
};

// 2. DOM Elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// 3. Function to append a message to the chat UI
function appendMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", `${sender}-message`);
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    
    // Auto-scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
}

// 4. Core function to handle user text processing
function handleChat() {
    const rawInput = userInput.value;
    const cleanInput = rawInput.trim().toLowerCase(); // Normalize text

    if (cleanInput === "") return; // Ignore empty submissions

    // Display user message
    appendMessage(rawInput, "user");
    userInput.value = ""; // Clear input field

    // Simulate natural thinking delay before bot replies
    setTimeout(() => {
        // Find match or fall back to default response
        const botReply = botResponses[cleanInput] || botResponses["default"];
        appendMessage(botReply, "bot");
    }, 600); 
}

// 5. Event Listeners
sendBtn.addEventListener("click", handleChat);

userInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleChat();
    }
});
