import { renderNotes } from "../index.js";
import { animate, easeIn, easeOut, hover } from "motion";

const messageBox = document.querySelector("message-box");

class NotesList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._notes = [];
    this._isLoading = false;
  }
  set notes(notes) {
    this._isLoading = false;
    this._notes = notes;
    this.render();
  }
  showLoading() {
    this._isLoading = true;
    this.render();
  }
  connectedCallback() {}
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .notes-list-container-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .notes-list-card {
          background-color: #00adb5;
          padding: 5px 10px 5px 10px;
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
        .notes-list-card:hover .button-note > button {
          visibility: visible;
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
          color: #222831 !important;
          text-align: end;
        }
        .card-footer{
          margin-top: 15px;
          font-size: 0.8em;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 5px;
        }
        .archived-info {
          color: #222831 !important;
        }
        .empty-message {
          color: #393e46;
          text-align: center;
          width: 100%;
          grid-column: 1 / -1;
        }
        .button-note {
          align-self: end;
        }
        .button-note > button {
          font-family: 'JetBrains Mono', monospace;
          border-radius: 5px;
          border: 0;
          padding: 0 5px 0 5px;
          cursor: pointer;
          transition: all 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          visibility: hidden;
        }
        .delete {
          background-color: #f73c3cff;
        }
        .delete:hover {
          background-color: #b13232ff;
        }
      </style>
    `;
    const baseUrl = "https://notes-api.dicoding.dev/v2/";
    const container = document.createElement("div");
    container.classList.add("notes-list-container-grid");

    if (this._isLoading) {
      container.innerHTML = "<loading-spinner></loading-spinner>";
    } else if (this._notes.length > 0) {
      this._notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("notes-list-card");
        noteElement.id = note.id;

        const formattedDate = new Date(note.createdAt).toLocaleDateString(
          "id-ID",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        );

        noteElement.innerHTML = `
          <div class="button-note">
            ${
              note.archived
                ? `<button class="unarchive">Unarchive</button>`
                : `<button class="archive">Archive</button>`
            }
            <button class="delete">X</button>
          </div>
          <h3>${note.title}</h3>
          <p>${note.body}</p>
          <div class="card-footer">
            ${note.archived ? `<p class="archived-info"><b>Archived</b></p>` : ""}
            <p class="datetime">${formattedDate}</p>
          </div>         
        `;

        // ---- Handlers ----

        const deleteButton = noteElement.querySelector(".delete");
        const archiveButton = noteElement.querySelector(".archive");
        const unarchiveButton = noteElement.querySelector(".unarchive");

        const handleAction = async (
          url,
          options,
          successMessage,
          errorMessage
        ) => {
          messageBox.showLoading();
          try {
            const response = await fetch(url, options);
            const responseJson = await response.json();
            if (responseJson.status !== "success") {
              throw new Error(responseJson.message);
            }
            messageBox.showMessage(successMessage);
            renderNotes();
          } catch (error) {
            messageBox.showMessage(errorMessage, "error");
            renderNotes();
          }
        };

        if (archiveButton) {
          archiveButton.addEventListener("click", () =>
            handleAction(
              `${baseUrl}notes/${note.id}/archive`,
              { method: "POST" },
              "Catatan berhasil diarsip!",
              "Gagal mengarsip catatan."
            )
          );
        }

        if (unarchiveButton) {
          unarchiveButton.addEventListener("click", () =>
            handleAction(
              `${baseUrl}notes/${note.id}/unarchive`,
              { method: "POST" },
              "Catatan berhasil dilepas dari arsip!",
              "Gagal melepas dari arsip."
            )
          );
        }

        deleteButton.addEventListener("click", () =>
          handleAction(
            `${baseUrl}notes/${note.id}`,
            { method: "DELETE" },
            "Catatan berhasil dihapus!",
            "Gagal menghapus catatan."
          )
        );

        container.appendChild(noteElement);
      });
    } else {
      container.innerHTML = `
        <div class="empty-message">
          <p>Tidak ada catatan untuk ditampilkan. Silakan tambahkan catatan baru!</p>
        </div>
      `;
    }
    this.shadowRoot.appendChild(container);

    const notesCards = this.shadowRoot.querySelectorAll(".notes-list-card");

    if (notesCards.length > 0) {
      animate(
        notesCards,
        {
          opacity: [0, 1],
          y: [-20, 0],
        },
        {
          delay: (i) => i * 0.1,
          duration: 0.5,
        }
      );

      hover(notesCards, (element) => {
        animate(
          element,
          { scale: 1.1 },
          { scale: { ease: "easeOut", duration: "0.1" } }
        );

        return () =>
          animate(
            element,
            { scale: 1 },
            { scale: { ease: "easeOut", duration: "0.1" } }
          );
      });
    }
  }
}
customElements.define("notes-list", NotesList);
