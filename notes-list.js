import notesData from './notes.js';

class NotesList extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="notes-list.css" />
      <div class="notes-list-container-grid">
      </div>
    `;

    const notesShowList = () => {
      return notesData
        .map((note) => {
          return `
          <div class="notes-list-card" id="${note.id}">
            <h3>${note.title}</h3>
            <p>${note.body}</p>
            <p class="datetime">Created at: ${new Date(note.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}</p>
            <p>${note.archived ? 'Archived' : 'Not Archived'}</p>
          </div>
        `;
        })
        .join('');
    };

    const outputElement = this.shadowRoot.querySelector('.notes-list-container-grid');

    if (outputElement) {
      outputElement.innerHTML = notesShowList();
    }
  }
}

customElements.define('notes-list', NotesList);
