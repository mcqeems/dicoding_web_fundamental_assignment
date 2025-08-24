class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 16px;
          box-sizing: border-box;
          margin-bottom: 20px;
        }

        .input-form {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 8px;
          width: 100%;
          max-width: 600px;
        }
        
        label {
          color: #222831;
          font-weight: 700;
        }

        #title-input {
          height: 30px;
          text-align: center;
          margin-bottom: 10px;
          font-weight: 700;
          font-size: 16px;
          border: 0;
          border-bottom: 2px solid #222831;
          background-color: transparent;
          transition: all 0.2s ease-in-out;
          font-family: 'JetBrains Mono', monospace;
          width: 100%;
          box-sizing: border-box;
        }

        #title-input:hover, #title-input:focus {
          background-color: #00adb5;
          outline: none;
          border-bottom: 2px solid #222831;
        }

        #body-input {
          height: 100px;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          border: 2px solid #222831;
          background-color: transparent;
          margin-bottom: 10px;
          transition: all 0.2s ease-in-out;
          width: 100%;
          box-sizing: border-box;
          resize: vertical;
          padding: 8px;
        }

        #body-input:hover, #body-input:focus {
          background-color: #00adb5;
          outline: 0;
        }

        button {
          align-self: center;
          height: 45px;
          width: 100%;
          max-width: 175px;
          padding: 4px;
          font-family: 'JetBrains Mono', monospace;
          background-color: #00adb5;
          border: 0;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          font-size: 1em;
          transition: all 0.2s ease-in-out;
        }

        button:hover {
          background-color: #393e46;
          color: #00adb5;
        }

        .error-message {
            color: #D83F31;
            font-size: 0.8em;
            min-height: 1em;
        }

        .archived-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
        }
      </style>
      <div class="form-container">
        <form class="input-form" novalidate>
          <label for="title-input">Judul:</label>
          <input type="text" id="title-input" name="title-input" required minlength="4" />
          <span class="error-message" id="title-error" aria-live="polite"></span>
          
          <label for="body-input">Catatan:</label>
          <textarea id="body-input" name="body-input" required minlength="4"></textarea>
          <span class="error-message" id="body-error" aria-live="polite"></span>
          
      

          <button type="submit" id="add-note-btn">Tambah Catatan</button>
        </form>
      </div>
    `;
  }

  addEventListeners() {
    const form = this.shadowRoot.querySelector(".input-form");
    const titleInput = this.shadowRoot.querySelector("#title-input");
    const bodyInput = this.shadowRoot.querySelector("#body-input");
    const titleError = this.shadowRoot.querySelector("#title-error");
    const bodyError = this.shadowRoot.querySelector("#body-error");

    const validateInput = (input, errorElement) => {
      if (input.validity.valueMissing) {
        errorElement.textContent = "Field ini harus diisi.";
        return false;
      } else if (input.validity.tooShort) {
        errorElement.textContent = `Minimal ${input.minLength} karakter.`;
        return false;
      } else {
        errorElement.textContent = "";
        return true;
      }
    };

    titleInput.addEventListener("input", () =>
      validateInput(titleInput, titleError),
    );
    bodyInput.addEventListener("input", () =>
      validateInput(bodyInput, bodyError),
    );

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const isTitleValid = validateInput(titleInput, titleError);
      const isBodyValid = validateInput(bodyInput, bodyError);

      if (isTitleValid && isBodyValid) {
        this.dispatchEvent(
          new CustomEvent("submit", {
            bubbles: true,
            composed: true,
            detail: {
              title: titleInput.value,
              body: bodyInput.value,
            },
          }),
        );
        form.reset();
      }
    });
  }
}

customElements.define("note-form", NoteForm);
