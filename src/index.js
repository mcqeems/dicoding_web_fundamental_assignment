import "./components/app-bar.js";
import "./components/note-form.js";
import "./components/notes-list.js";
import "./components/loading.js";
import "./styles/style.css";

const notesList = document.querySelector("notes-list");
const baseUrl = "https://notes-api.dicoding.dev/v2";
let notesData = [];

const fetchNotes = async () => {
  notesList.showLoading();

  try {
    const responseArchivePromise = fetch(`${baseUrl}/notes/archived`);
    const responseRegularPromise = fetch(`${baseUrl}/notes`);
    const [responseArchive, responseRegular] = await Promise.all([
      responseArchivePromise,
      responseRegularPromise,
    ]);

    const responseArchiveJson = await responseArchive.json();
    const responseRegularJson = await responseRegular.json();
    const notesData = [
      ...responseArchiveJson.data,
      ...responseRegularJson.data,
    ];

    notesList.notes = notesData;
  } catch (error) {
    console.error(error);
    alert(error);
    notesList.innerHTML = `<p style="text-align: center; color: red;">Gagal memuat catatan.</p>`;
  }
};
export const renderNotes = () => {
  fetchNotes();
};

document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.querySelector("note-form");
  const toggleButton = document.getElementById("notes-button");

  let isFormOpen = false;

  const openFormIcon = `<svg width="30px" height="30px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none"><g stroke="#222831" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"><path d="M55 139.591 61.173 171l26.432-17.816L136 35.594 103.394 22 55 139.591ZM22 42h72m40 0h36M22 78h57m41 0h50M22 114h41m41 0h66M22 150h34m34 0h32"/></g></svg>`;
  const closeFormIcon = `<svg fill="#222831" height="30px" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775"><path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866-4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/></svg>`;

  function toggleForm() {
    isFormOpen = !isFormOpen;
    noteForm.style.display = isFormOpen ? "block" : "none";
    toggleButton.innerHTML = isFormOpen ? closeFormIcon : openFormIcon;
  }

  toggleButton.addEventListener("click", toggleForm);

  noteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const { title, body } = event.detail;

    const newNote = {
      title,
      body,
    };

    const postNewNote = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        };
        const response = await fetch(`${baseUrl}/notes`, options);
        const responseJson = await response.json();
        renderNotes();
        console.log(responseJson);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    };

    postNewNote();
  });

  renderNotes();
});
