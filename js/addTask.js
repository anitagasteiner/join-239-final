/**
 * Initializes the add task process by setting up necessary data and UI elements.
 * 
 * This asynchronous function performs the following steps:
 * 1. Calls `initJoin` to initialize and fetch necessary data such as contacts, tasks, and users.
 * 2. Sets the priority button to 'medium' by default by calling `setPrioBtn`.
 * 
 * @async
 * @function initAddTask
 */
async function initAddTask() {
    await initJoin();
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium');    
}


// ANCHOR create Tasks
/**
 * Creates a new task and adds it to the task array, then updates the data on the server.
 * 
 * This asynchronous function performs the following steps:
 * 1. Sets the temporary subtasks' status.
 * 2. Creates a new task object with the provided input values.
 * 3. Pushes the new task to the `taskArray`.
 * 4. Updates the task data on the server by calling `putData`.
 * 5. Executes the next function (`nextFunction`) after the task is created and data is updated.
 * 
 * @async
 * @function createTask
 * @param {Function} nextFunction - The function to call after the task is created and data is updated.
 */
async function createTask(nextFunction) {
    disableBtnsOnLoad(true);
    setTempSubtasksStatus();
    let newTask = useTaskClass(); 
    taskArray.push(newTask);
    await putData(endpointTasks, taskArray);
    sessionStorage.removeItem("preSetTaskStatus");
    disableBtnsOnLoad(false);
    nextFunction();
}


/**
 * Creates a new instance of the Task class using the provided form data and settings.
 * 
 * This function collects data from various form elements and settings to instantiate a new Task object.
 * The collected data includes the task type, title, description, due date, assignees, priority, status,
 * subtasks, and their statuses.
 * 
 * @function useTaskClass
 * @returns {Task} A new Task object populated with the collected data.
 */
function useTaskClass() {
    return new Task(
        generateUniqueId('t', taskArray), 
        document.getElementById('catSelectValue').dataset.tasktype, 
        document.getElementById('titleInput').value, 
        document.getElementById('descriptionInput').value, 
        document.getElementById('dateInput').value, 
        getIDofAssignee(tempAssignees),
        currentTaskPrio, 
        JSON.parse(sessionStorage.getItem("preSetTaskStatus")) || 'todo', 
        tempSubtasks, 
        tempSubtasksStatus
    );
}


/**
 * Retrieves the IDs of the given assignees.
 * 
 * This function iterates over the provided `assignees` array, extracts the `id` of each assignee,
 * and returns an array of assignee IDs.
 * 
 * @function getIDofAssignee
 * @param {Array<Object>} assignees - An array of assignee objects.
 * @returns {Array<string>} An array of assignee IDs.
 */
function getIDofAssignee(assignees) {
    let assignIDs = [];
    assignees.forEach(a => assignIDs.push(a.id));
    return assignIDs;
}


/**
 * Redirects the user to the board page.
 * 
 * This function changes the current window location to 'board.html', effectively redirecting the user to the board page.
 * 
 * @function redirectToBoard
 */
function redirectToBoard() {
    window.location.href = 'board.html';
}


/**
 * Clears the form inputs and resets temporary variables related to adding a task.
 * Resets global task variables, clears the pre-selected assignee container,
 * resets the "Add Task" form, and renders the temporary subtasks.
 */
function clearAddTaskAndTempVariables() {
    resetGlobalTaskVariables();
    document.getElementById('preSelectedContainer').innerHTML = '';
    resetAddTaskForm();
    resetSubtaskInput();
    renderTempSubtasks();
}


/**
 * Resets the "Add Task" form by clearing the task category, title, description, and date inputs. 
 * Sets the priority button to 'Medium' by default.
 */
function resetAddTaskForm() {
    document.getElementById('catSelectValue').dataset.tasktype = ''; 
    document.getElementById('catSelectValue').innerHTML = 'Select task Category'
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = ''; 
    document.getElementById('dateInput').value = '';
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium');
}


// ANCHOR prio selection
/**
 * Sets the priority button to the selected state and updates the icon.
 * 
 * This function performs the following steps:
 * 1. Sets the `currentTaskPrio` to the provided priority value.
 * 2. Removes the selected CSS class from all priority buttons and resets their icons.
 * 3. Adds the selected CSS class to the clicked priority button and updates its icon.
 * 
 * @function setPrioBtn
 * @param {string} id - The ID of the priority button to set.
 * @param {string} cssClass - The CSS class to add for the selected state.
 * @param {string} iconPath - The path to the icon to display for the selected state.
 * @param {string} prio - The priority level to set (e.g., 'urgent', 'medium', 'low').
 */
function setPrioBtn(id, cssClass, iconPath, prio) {
    currentTaskPrio = prio;
    ['prioUrgent', 'prioMedium', 'prioLow'].forEach(idInArray => {
        document.getElementById(idInArray).classList.remove('low-selected', 'medium-selected', 'urgent-selected');
        setPrioBtnStandardIcon();
    });
    document.getElementById(id).classList.add(cssClass);
    document.getElementById(id).children[1].src = iconPath;
}


/**
 * Resets the icons of all priority buttons to their standard state.
 * 
 * This function updates the icon sources for the 'urgent', 'medium', and 'low' priority buttons
 * to their default images.
 * 
 * @function setPrioBtnStandardIcon
 */
function setPrioBtnStandardIcon() {
    document.getElementById('prioUrgent').children[1].src = './assets/img/priority-urgent.svg';
    document.getElementById('prioMedium').children[1].src = './assets/img/priority-medium.svg';
    document.getElementById('prioLow').children[1].src = './assets/img/priority-low.svg';
}


// ANCHOR category select 

/**
 * Toggles the direction of the arrow icon in the category selection element.
 * 
 * This function checks if the 'selectCategory' element has the 'select-image' class.
 * If it does, it changes the icon to 'select-image-up'. Otherwise, it changes the icon
 * back to 'select-image'.
 * 
 * @function arrowChanger
 */
function arrowChanger() {
    if (document.getElementById('selectCategory').classList.contains('select-image')) {
        changeSelectIcon('selectCategory', 'select-image', 'select-image-up');
    } else {
        changeSelectIcon('selectCategory', 'select-image-up', 'select-image');
    }  
}


/**
 * Changes the icon of a select element.
 * 
 * This function removes the first CSS class and adds the second CSS class to the element with the given ID.
 * 
 * @function changeSelectIcon
 * @param {string} id - The ID of the element whose icon should be changed.
 * @param {string} cssClass - The CSS class to remove.
 * @param {string} cssClass2 - The CSS class to add.
 */
function changeSelectIcon(id, cssClass, cssClass2) {
    document.getElementById(id).classList.remove(cssClass);
    document.getElementById(id).classList.add(cssClass2);
}


// ANCHOR eventListener add tasks
document.getElementById('subtaskInputFrame').addEventListener('click', changeSubtaskInput);


document.getElementById('subtaskInput').addEventListener('keypress', e => checkKeyForEnter(e));


/**
 * Checks if the pressed key is 'Enter'. If so, it adds a subtask to the temporary subtasks list.
 *
 * @param {KeyboardEvent} e - The keyboard event triggered by pressing a key.
 */
function checkKeyForEnter(e) {
    if (e.key == 'Enter') {
        addSubtaskToTempSubtasks()
    }
}


// ANCHOR id translation or verification functions

function pushTaskAssigneeInfosToArray(task) {
    if (task.assigned) {
        let taskAssignees = [];
        for (let i = 0; i < task.assigned.length; i++) {
            taskAssignees.push(getContactByContactID(task.assigned[i]));
        }
        let validAssignees = taskAssignees.filter(t => t != 'not found');
        return validAssignees;   
    }
}


/**
 * Retrieves a contact from the contacts list by its ID.
 *
 * @param {string} contactID - The ID of the contact to retrieve.
 * @returns {(Object|string)} - The contact object if found, otherwise the string 'not found'.
 */
function getContactByContactID(contactID) {
    let contactArray = contacts.filter(c => c.id == contactID);
    if (contactArray.length == 0) {
        return 'not found'
    } else {
        return contactArray[0];
    }
}


/**
 * This function validates the task form, preventing default submission behavior, 
 * and if all fields are valid, shows an animation and then creates the task.
 * @param {Event} event - The event object.
 * @param {Function} nextFunction - The function to call after successful validation and animation.
 */
function validateTaskForm(event, nextFunction) {
    event.preventDefault(); 
    validateCategory();
    validateDate();
    if (validateTitle() && validateDate() && validateCategory()) {
        successfullyAddedTaskAnimation();
        setTimeout(() => {
        createTask(nextFunction);  
        }, 1000);
    }
}


/**
 * This function validates that a title is entered.
 * @returns {boolean} - Returns true if the title is valid, false otherwise.
 */
function validateTitle() {
    let titleWarning = document.getElementById('titleWarningMessage');
    let title = document.getElementById('titleInput').value.trim();
    let titleBorder = document.getElementById('titleInput');
    
    if (title === "") {
        titleWarning.classList.remove('d-none');
        titleBorder.classList.add('border-red')
        return false;
    } else {
        titleWarning.classList.add('d-none');
        titleBorder.classList.remove('border-red')
        return true;
    }
}


/**
 * This function validates that a date is entered.
 * @returns {boolean} - Returns true if the date is valid, false otherwise.
 */
function validateDate() {
    let dateWarning = document.getElementById('dateWarningMessage');
    let date = document.getElementById('dateInput').value.trim();
    let dateBorder = document.getElementById('dateInput');
    
    if (date === "") {
        dateWarning.classList.remove('d-none');
        dateBorder.classList.add('border-red')
        return false;
    } else {
        dateWarning.classList.add('d-none');
        dateBorder.classList.remove('border-red')
        return true;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('dateInput');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});


/**
 * This function validates that a category is selected.
 * @returns {boolean} - Returns true if the category is valid, false otherwise.
 */
function validateCategory() {
    let category = document.getElementById('catSelectValue').dataset.tasktype
    if (category === "") {
        document.getElementById('categoryWarningMessage').classList.remove('d-none');
        document.getElementById('selectCategory').classList.add('border-red');
        return false;
    } else {
        document.getElementById('categoryWarningMessage').classList.add('d-none');
        document.getElementById('selectCategory').classList.remove('border-red');
        return true;
    }
}


/**
 * This function is used to show a success animation when a task is successfully added.
 */
function successfullyAddedTaskAnimation() {
    let succesAnimation = document.getElementById('successfullAddedTask');
    succesAnimation.classList.add('open');
    setTimeout(() => {
        succesAnimation.classList.add('closed');
    }, 1000);
}