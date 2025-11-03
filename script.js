const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const typingIndicator = document.getElementById("typingIndicator");

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    userInput.value = "";

    setTimeout(() => {
        showTyping(true);
        setTimeout(() => {
            showTyping(false);
            generateBotResponse(message);
        }, 1500);
    }, 500);
}

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);

    const avatarDiv = document.createElement("div");
    avatarDiv.classList.add("message-avatar");
    avatarDiv.innerHTML = sender === "bot" 
        ? '<i class="fas fa-robot"></i>' 
        : '<i class="fas fa-user"></i>';

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("message-content");
    contentDiv.innerHTML = text;

    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping(show) {
    typingIndicator.style.display = show ? "flex" : "none";
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendQuickReply(text) {
    userInput.value = text;
    sendMessage();
}

function generateBotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    let response = "I'm not sure I understand. Could you please ask in another way?";

    if (msg.includes("apply") || msg.includes("application")) {
        response = "You can apply online through our official admission portal. Make sure to submit all required documents before the deadline.";
    } 
    else if (msg.includes("deadline") || msg.includes("last date")) {
        response = "The main admission deadline is June 30, 2025. Early applications close on May 15, 2025.";
    } 
    else if (msg.includes("course") || msg.includes("program")) {
        response = "We offer programs in Engineering, Business, Medicine, Arts, Computer Science, Law, and more.";
    } 
    else if (msg.includes("scholarship") || msg.includes("financial aid")) {
        response = "Yes! Merit-based and need-based scholarships are available. You must apply before April 15, 2025.";
    } 
    else if (msg.includes("tuition") || msg.includes("fee") || msg.includes("cost")) {
        response = "Tuition fees vary by course. On average, undergraduate programs cost ₹80,000 - ₹1,50,000 per year.";
    } 
    else if (msg.includes("housing") || msg.includes("hostel")) {
        response = "We provide separate hostels for boys and girls with full facilities. Room allocation happens after admission confirmation.";
    } 
    else if (msg.includes("international")) {
        response = "International students must provide passport, visa, and English proficiency proof such as IELTS or TOEFL.";
    } 
    else if (msg.includes("contact")) {
        response = "You can reach the admission office at +91-9876543210 or email admission@college.edu.";
    }

    addMessage(response, "bot");
}

function showInfo(section) {
    let info = "";

    switch (section) {
        case "application":
            info = "Application Process: 1. Register online 2. Fill form 3. Upload documents 4. Pay fee 5. Submit.";
            break;
        case "deadlines":
            info = "Important Dates: Application closes June 30, 2025. Scholarships close April 15, 2025.";
            break;
        case "courses":
            info = "Available Courses: B.Tech, BBA, MBA, BCA, MBBS, BA, B.Sc, Law, and more.";
            break;
        case "scholarships":
            info = "Scholarships: Merit-based, sports, and need-based options available.";
            break;
        case "tuition":
            info = "Tuition & Fees: ₹80,000 - ₹1,50,000 per year depending on program.";
            break;
        case "housing":
            info = "Housing: AC/Non-AC hostels, mess included, Wi-Fi enabled.";
            break;
        case "international":
            info = "International Students: English proficiency + passport + visa required.";
            break;
        case "contact":
            info = "Contact Admissions: +91-9876543210 | admission@college.edu";
            break;
    }

    addMessage(info, "bot");
}