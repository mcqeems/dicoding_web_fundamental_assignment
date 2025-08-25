class MessageBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  showLoading() {
    const box = this.shadowRoot.querySelector(".message-box");
    box.innerHTML = `<div class="spinner"></div> <span>Loading...</span>`;
    box.className = "message-box loading show";
    this.style.display = "block";
  }

  showMessage(message, status = "success") {
    const box = this.shadowRoot.querySelector(".message-box");
    box.innerHTML = message;
    box.className = `message-box ${status} show`;
    this.style.display = "block";

    setTimeout(() => {
      this.style.display = "none";
      box.classList.remove("show");
    }, 3000);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .message-box {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 15px 25px;
          border-radius: 8px;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
          display: flex;
          align-items: center;
          gap: 10px;
					text-align: center;
        }
        .message-box.show {
            opacity: 1;
            visibility: visible;
        }
        .message-box.success {
          background-color: #28a745;
        }
        .message-box.error {
          background-color: #dc3545;
        }
        .message-box.loading {
            background-color: #17a2b8;
        }
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #fff;
            width: 16px;
            height: 16px;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
      <div class="message-box"></div>
    `;
  }

  connectedCallback() {
    this.style.display = "none";
  }
}

customElements.define("message-box", MessageBox);
