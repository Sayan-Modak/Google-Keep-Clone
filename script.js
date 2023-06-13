const addButton = document.querySelector('#add');

const updateLocalStorageData = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notesArr = []; // To add trhe individual elements in this empty array
    console.log(textareaData);
    //textareaData.forEach(curElem, index, arr, this);
    textareaData.forEach((notes) => {
        return notesArr.push(notes.value);
    })
    console.log(notesArr);

    localStorage.setItem('notesArr', JSON.stringify(notesArr));
}

const addNote = (text = '') => {
    const notes = document.createElement('card');
    notes.classList.add('notes');

    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea> `;
    // insertAdjacentHTML() is comparatively faster than innerHTML
    notes.insertAdjacentHTML('afterbegin', htmlData);
    //console.log(notes);

    // Getting the references
    const editButton = notes.querySelector('.edit');
    const deleteButton = notes.querySelector('.delete');
    const mainDiv= notes.querySelector('.main');
    const textarea = notes.querySelector('textarea');

    // Deleting the node
    deleteButton.addEventListener('click', () => {
        notes.remove();
        updateLocalStorageData();
    });
    
    // Toggle using the edit button

    // We do this to ensure that the text area shows the data even though it is hidden
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })

    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorageData();
    }) 

    // appendChild() -> appends as the last child of the node.
    document.body.appendChild(notes);
}
// Getting data back from local storage
const notesArr = JSON.parse(localStorage.getItem('notesArr'));

if(notesArr){ notesArr.forEach((notes) => addNote(notes)) }

addButton.addEventListener('click', () => addNote());