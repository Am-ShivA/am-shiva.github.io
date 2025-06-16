// Spider animation module
const spiderAnimation = {
    init: function() {
        // Create and append styles
        const style = document.createElement('style');
        style.textContent = `
            .spider-container {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 9999;
            }
            .cropped-iframe {
                width: 225px;
                height: 50px;
                position: relative;
                overflow: hidden;
            }
            .cropped-iframe iframe {
                position: absolute;
                top: -38px;
                left: -83px;
                width: 500px;
                height: 500px;
                clip: rect(51px 416px 481px 95px);
                filter: invert(100%);
                display: none;
                opacity: 0.5;
                overflow: hidden;
                border: none;
            }
            .toggle-button {
                position: absolute;
                top: 0px;
                right: 20px;
                z-index: 999;
                cursor: pointer;
                animation: swing 2s infinite reverse;
                width: 30px;
                height: 30px;
            }

            @keyframes swing {
                0% { transform: rotate(0deg); }
                25% { transform: rotate(20deg); }
                50% { transform: rotate(0deg); }
                75% { transform: rotate(-20deg); }
                100% { transform: rotate(0deg); }
            }

            .custom-prompt {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #1a1a1a;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
                border: 1px solid #00ffff;
                color: #00ffff;
                font-family: 'Courier New', monospace;
                z-index: 1000;
                min-width: 250px;
                max-width: 90%;
                width: auto;
                text-align: center;
            }

            .custom-prompt .message {
                margin-bottom: 15px;
                line-height: 1.4;
                word-wrap: break-word;
                padding: 0 10px;
            }

            .custom-prompt input {
                background: #2a2a2a;
                border: 1px solid #00ffff;
                color: #00ffff;
                padding: 8px;
                margin: 10px auto;
                width: 80%;
                max-width: 200px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                display: block;
            }

            .custom-prompt .button-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }

            .custom-prompt button {
                background: #00ffff;
                color: #1a1a1a;
                border: none;
                padding: 8px 20px;
                border-radius: 4px;
                cursor: pointer;
                font-family: 'Courier New', monospace;
                font-weight: bold;
                min-width: 80px;
                transition: background 0.3s ease;
            }

            .custom-prompt button:hover {
                background: #00cccc;
            }

            .prompt-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                z-index: 999;
            }
        `;
        document.head.appendChild(style);

        // Create and append HTML elements
        const container = document.createElement('div');
        container.className = 'spider-container';
        container.innerHTML = `
            <span class="cropped-iframe">
                <iframe id="spider-iframe" src="https://sendfileonline.com/" scrolling="no" frameborder="0"></iframe>
            </span>
            <img class="toggle-button" src="spider.svg" alt="Spider">
        `;
        document.body.appendChild(container);

        // Add click event listener to the spider image
        const spiderImage = container.querySelector('.toggle-button');
        spiderImage.addEventListener('click', () => this.showCustomPrompt());
    },

    showCustomPrompt: function() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'prompt-overlay';
        document.body.appendChild(overlay);

        // Create prompt
        const promptDiv = document.createElement('div');
        promptDiv.className = 'custom-prompt';
        promptDiv.innerHTML = `
            <div class="message">Well well, look who cracked the code 👀<br>Now prove you're worthy... what's the password?</div>
            <input type="password" id="passwordInput" placeholder="Enter password">
            <div class="button-container">
                <button onclick="spiderAnimation.checkPassword()">Submit</button>
                <button onclick="spiderAnimation.closePrompt()">Cancel</button>
            </div>
        `;
        document.body.appendChild(promptDiv);

        // Focus input
        document.getElementById('passwordInput').focus();

        // Handle Enter key
        document.getElementById('passwordInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                spiderAnimation.checkPassword();
            }
        });
    },

    checkPassword: function() {
        const today = new Date();
        const password = today.getDate().toString();
        const userInput = document.getElementById('passwordInput').value;

        if (userInput === password) {
            this.toggleIframe();
            this.closePrompt();
        } else {
            alert("Wrong password!");
        }
    },

    closePrompt: function() {
        document.querySelector('.prompt-overlay').remove();
        document.querySelector('.custom-prompt').remove();
    },

    toggleIframe: function() {
        const iframe = document.getElementById("spider-iframe");
        
        if (iframe.style.display === "none") {
            iframe.style.display = "block";
        } else {
            iframe.style.display = "none"; 
        }
        
        if (iframe.style.display === "block") {
            iframe.src = iframe.src;
        }
    }
};

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    spiderAnimation.init();
}); 