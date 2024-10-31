class Chatbox {
    constructor() {
        this.args = {
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            inputField: document.querySelector('.chatbox__footer input'),
            chatMessages: document.querySelector('.chatbox__messages')
        };

        this.messages = [];
    }

    display() {
        const { chatBox } = this.args;

        // Automatically display the chatbox by adding the active class
        chatBox.classList.add('chatbox--active');

        this.args.sendButton.addEventListener('click', () => this.onSendButton());

        this.args.inputField.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton();
            }
        });
    }

    onSendButton() {
        const textField = this.args.inputField;
        const text1 = textField.value;

        if (text1.trim() === "") {
            return; // Do nothing if the input is empty
        }

        this.messages.push({ name: "User", message: text1 });
        this.updateChatText();

        // Clear input field
        textField.value = '';

        // Send the message to the server
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let msg2 = { name: "Sam", message: data.answer };
                this.messages.push(msg2);
                this.updateChatText();
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error message if needed
            });
    }

    updateChatText() {
        const html = this.messages.slice().reverse().map(item => {
            return item.name === "Sam"
                ? `<div class="messages__item messages__item--visitor">${item.message}</div>`
                : `<div class="messages__item messages__item--operator">${item.message}</div>`;
        }).join('');

        this.args.chatMessages.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
