document.addEventListener('DOMContentLoaded', function() {
    // Create chat widget
    const chatWidget = document.createElement('div');
    chatWidget.className = 'chat-widget';
    chatWidget.innerHTML = `
        <button class="chat-button">💬</button>
        <div class="chat-window">
            <div class="chat-header">
                <h3>Чат с арендодателем</h3>
                <button class="close-chat">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Введите сообщение...">
                <button>Отправить</button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    const chatButton = chatWidget.querySelector('.chat-button');
    const chatWindow = chatWidget.querySelector('.chat-window');
    const closeButton = chatWidget.querySelector('.close-chat');
    const messageInput = chatWidget.querySelector('.chat-input input');
    const sendButton = chatWidget.querySelector('.chat-input button');
    const messagesContainer = chatWidget.querySelector('.chat-messages');

    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    closeButton.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, 'sent');
            messageInput.value = '';
            
            // Simulate landlord response (in real app, this would be handled by backend)
            setTimeout(() => {
                addMessage('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.', 'received');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const now = new Date();
        const time = now.getHours().toString().padStart(2, '0') + ':' + 
                    now.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
            <div class="message-time">${time}</div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Add initial welcome message
    setTimeout(() => {
        addMessage('Здравствуйте! Чем могу помочь?', 'received');
    }, 500);
}); 