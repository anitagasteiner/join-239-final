const endpointTasks = 'https://join-239-data-default-rtdb.europe-west1.firebasedatabase.app/tasks';
const endpointContacts = 'https://join-239-data-default-rtdb.europe-west1.firebasedatabase.app/contacts';
const endpointUser = 'https://join-239-data-default-rtdb.europe-west1.firebasedatabase.app/users';
const prioIcons = {
    'low': 'assets/img/priority-low.svg',
    'medium': 'assets/img/priority-medium.svg',
    'urgent': 'assets/img/priority-urgent.svg'
};
const taskTypeColor = {
    'Technical Task': 'type-color-green',
    'User Story': 'type-color-blue'
};
let contacts;
let taskArray;
let usersArray;
let todoTasks;
let progressTasks;
let feedbackTasks;
let doneTasks;
let urgentTasks;
let currentTaskPrio = 'medium';
let tempSubtasks = [];
let tempAssignees = [];
let tempSubtasksStatus = [];
let loggedInUser;
let guestUserActive = JSON.parse(localStorage.getItem('guestUserActive')) || false;


function resetGlobalTaskVariables() {
    tempSubtasks = [];
    tempSubtasksStatus = [];
    tempAssignees = [];
    currentTaskPrio = 'medium';
}


/**
 * Initializes the join process by fetching and filtering data from various endpoints.
 * 
 * @async
 * @function initJoin
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initJoin() {
    contacts = await getData(endpointContacts);
    taskArray = await getData(endpointTasks) || [];
    usersArray = await getData(endpointUser);
    todoTasks = taskArray.filter(t => t.taskStatus == 'todo');
    progressTasks = taskArray.filter(t => t.taskStatus == 'progress');
    feedbackTasks = taskArray.filter(t => t.taskStatus == 'feedback');
    doneTasks = taskArray.filter(t => t.taskStatus == 'done');
    urgentTasks = taskArray.filter(t => t.prio === 'urgent' && t.dueDate);
}


/**
 * This function fetches any endpoint that is given by the url parameter. The response status will get logged 
 * 
 *  @async
 *  @param {string} url Endpoint to fetch.
 *  @returns {Promise<void>} Returns the response in json format.
 */
async function getData(url) {
    let response = await fetch(url + ".json").catch(errorFunction);
    return await response.json();
}


/**
 * This function fetches any endpoint that is given by the url parameter with the method PUT. The response status will get logged 
 * 
 *  @async
 *  @param {string} url Endpoint to fetch.
 *  @returns {Promise<void>} Returns the response in json format.
 */
async function putData(url, data = {}) {
    let response = await fetch(url + ".json", {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(errorFunction);
    return await response.json();
}


/**
 * This function gets called (.catch) when the promise in other functions is not resolved. It logs an error message and gives the user a confirm with a reload option. 
 */
function errorFunction() {
    console.error('Fehler aufgetreten');
    if (confirm('Oops, something went wrong. Please reload and try again')) {
        location.reload();
    }
}


/**
 * This function is used to redirect to index.html, if there is neither guest nor user logged in.
 */
function redirectToLoginWhenNotAuth() {
    if (!guestUserActive && (loggedInUser == undefined || loggedInUser == null)) {
        window.location.href = "./index.html";
    }
}



/**
 * Updates the user icon based on the current user status.
 * 
 * This function checks if a user is logged in or if a guest user is active. If a user is logged in,
 * it updates the user icon using the `updateUserIcon` function. If a guest user is active, it shows 
 * the guest user icon using the `showGuestUserIcon` function.
 * 
 * @function userIconOrGuestIcon
 */
function userIconOrGuestIcon() {
    if (loggedInUser) {
        updateUserIcon(loggedInUser);
    }
    if (guestUserActive) {
        showGuestUserIcon();
    }
}


/**
 * This function is used to show the initials of the currently logged in user in the header's user icon.
 * @param {string} name This is the name of the currently logged in user.
 */
function updateUserIcon(name) {
    const userInitials = getInitials(name);
    document.getElementById('userIcon').innerHTML = userInitials;
}


/**
 * This function is used to get the initials of a name.
 * @param {string} name This is the name of the user or contact.
 * @returns The function returns the initials in uppercase.
 */
function getInitials(name) {
    let initials = name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
    return initials;
}


/**
 * This function is used to show the header's icon for guest user.
 */
function showGuestUserIcon() {
    document.getElementById('userIcon').innerHTML = 'G';
}


class Task {
    constructor(id, type, title, description, dueDate, assigned, prio, taskStatus, subTask, subtaskStatus) {
        this.id = id,
            this.type = type,
            this.title = title,
            this.description = description,
            this.dueDate = dueDate,
            this.assigned = assigned,
            this.prio = prio,
            this.taskStatus = taskStatus,
            this.subTask = subTask,
            this.subTaskStatus = subtaskStatus
    }
}


/**
 * This function is used to generate a new ID for each new task or contact.
 * @param {*} initLetter - This is either "t" if the ID is needed for a new task or "c" if it's needed for a new contact.
 * @param {*} array - This is either the "taskArray" or "contacts".
 * @returns new ID consisting of "t" or "c" and a random number
 */
function generateUniqueId(initLetter, array) {
    let newId;
    do {
        newId = initLetter + Math.floor(Math.random() * 10000);
    } while (array.some(a => a.id === newId));
    return newId;
}


// ANCHOR Menu functionality
function stopP(event) {
    event.stopPropagation();
}


/**
 * Enables or disables buttons with the 'disable-on-load' class based on the given boolean value.
 * 
 * This function iterates over all elements with the class 'disable-on-load' and sets their 
 * `disabled` attribute to the given boolean value. Additionally, it toggles the 'btn-disabled' 
 * class on these elements based on the same boolean value.
 * 
 * @function disableBtnsOnLoad
 * @param {boolean} boolean - A boolean value to enable or disable the buttons. 
 *                            `true` disables the buttons and adds the 'btn-disabled' class, 
 *                            `false` enables the buttons and removes the 'btn-disabled' class.
 */
function disableBtnsOnLoad(boolean) {
    let buttons = document.getElementsByClassName('disable-on-load');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = boolean;
        boolean ? buttons[i].classList.add('btn-disabled') : buttons[i].classList.remove('btn-disabled');
    }
}


/**
 * Shows the user menu by setting the display style and adding the 'show' class.
 */
function showMenu() {
    let menuAnimation = document.getElementById('userMenu');
    let pageOverlay = document.getElementById('pageOverlay');
    menuAnimation.style.display = 'flex';
    pageOverlay.style.display = 'block';
    menuAnimation.classList.add('show');
}


/**
 * Hides the user menu by removing the 'show' class, adding the 'hide' class,
 * and then setting the display style to 'none' after a delay.
 */
function hideMenu() {
    let menuAnimation = document.getElementById('userMenu');
    let pageOverlay = document.getElementById('pageOverlay');
    menuAnimation.classList.remove('show');
    menuAnimation.classList.add('hide');
    setTimeout(() => {
        menuAnimation.style.display = 'none';
        menuAnimation.classList.remove('hide');
        pageOverlay.style.display = 'none';
    }, 125);
}


/**
 * Toggles the user menu visibility by checking for the 'show' class and calling
 * the appropriate function to either show or hide the menu.
 */
function toggleMenu() {
    let menuAnimation = document.getElementById('userMenu');
    if (menuAnimation.classList.contains('show')) {
        hideMenu();
    } else {
        showMenu();
    }
}


/**
 * Determines if the event listener for hiding the menu should be added based
 * on the current page.
 * @returns {boolean} - Returns true if the current page is in the list of specified pages, false otherwise.
 */
function shouldAddEventListener() {
    const pages = ['/summary.html', '/addTask.html', '/contacts.html', '/board.html'];
    return pages.includes(window.location.pathname);
}


if (shouldAddEventListener()) {
    document.getElementById('pageOverlay').addEventListener('click', hideMenu);
}


/**
 * This function is used to proof if the current contact is logged in. In case the contact is logged in, "(You)" is added to his*her name in the contact list.
 * @param {object} contactName This is the name of the current contact.
 */
function proofIfContactIsLoggedIn(name) {
    if (name === loggedInUser) {
        return ' (You)';
    } else {
        return '';
    }
}


