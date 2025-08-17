class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._notes = [];
  }

  set notes(notes) {
    this._notes = notes;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = '';

    this.shadowRoot.innerHTML += `
      <style>
        .notes-list-container-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .notes-list-card {
          background-color: #00adb5;
          padding: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          border: 2px solid #222831;
          word-wrap: break-word;
        }
        .notes-list-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .notes-list-card h3 {
          margin: 0 0 10px 0;
          text-align: center;
          color: #fff;
        }
        .notes-list-card p {
          color: #eeeeee;
          flex-grow: 1;
        }
        .datetime {
          font-size: 0.8em;
          text-align: right;
          color: #222831;
          margin-top: 15px;
        }
        .empty-message {
          color: #393e46;
          text-align: center;
          width: 100%;
        }
      </style>
    `;

    const container = document.createElement('div');
    container.classList.add('notes-list-container-grid');

    if (this._notes.length > 0) {
      this._notes.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('notes-list-card');
        noteElement.id = note.id;
        noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <p class="datetime">
            ${new Date(note.createdAt).toLocaleDateString('id-ID', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        `;
        container.appendChild(noteElement);
      });
    } else {
      container.innerHTML = `<p class="empty-message">Tidak ada catatan untuk ditampilkan. Silakan tambahkan catatan baru!</p>`;
    }

    this.shadowRoot.appendChild(container);
  }
}

customElements.define('notes-list', NotesList);
