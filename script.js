import './notes-list.js';
import notesData from './notes.js';

const selectAddNoteButton = document.querySelector('#notes-button');
const selectTitleValue = document.querySelector('#title-input');
const selectBodyValue = document.querySelector('#body-input');
const notesList = document.querySelector('notes-list');
const selectForm = document.querySelector('.input-form');

let isFormOpen = false;

function generateRandomSixDigitNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addNoteButton() {
  const selectNotesButton = document.querySelector('.notes-button');
  const selectFormContainer = document.querySelector('.form-container');
  selectNotesButton.innerHTML = '';
  selectFormContainer.style.display = 'flex';
  selectNotesButton.innerHTML = `<svg fill="#222831" height="30px" width="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	viewBox="0 0 460.775 460.775" xml:space="preserve">
<path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866-4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
</svg>`;
}

function closeNoteButton() {
  const selectNotesButton = document.querySelector('.notes-button');
  const selectFormContainer = document.querySelector('.form-container');
  selectNotesButton.innerHTML = '';
  selectFormContainer.style.display = 'none';
  selectNotesButton.innerHTML = `<svg width="30px" height="30px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
			<g stroke="#222831" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" clip-path="url(#a)">
				<path
					d="M55 139.591 61.173 171l26.432-17.816L136 35.594 103.394 22 55 139.591ZM22 42h72m40 0h36M22 78h57m41 0h50M22 114h41m41 0h66M22 150h34m34 0h32"
				/>
			</g>
			<defs>
				<clipPath id="a">
					<path fill="#ffffff" d="M0 0h192v192H0z" />
				</clipPath>
			</defs>
		</svg>`;
}

function handleNoteButtonClick() {
  isFormOpen = !isFormOpen;
  if (isFormOpen) {
    addNoteButton();
  } else {
    closeNoteButton();
  }
}

function handleNoteAdd(event) {
  event.preventDefault();

  const newNote = {
    id: `notes-${generateRandomSixDigitNumber()}`,
    title: selectTitleValue.value,
    body: selectBodyValue.value,
    createdAt: new Date().toISOString(),
    archived: false,
  };

  notesData.unshift(newNote);
  notesList.render();

  selectTitleValue.value = '';
  selectBodyValue.value = '';

  closeNoteButton();
  isFormOpen = false;
}

selectForm.addEventListener('submit', handleNoteAdd);
selectAddNoteButton.addEventListener('click', handleNoteButtonClick);
