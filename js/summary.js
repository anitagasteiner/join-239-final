/**
 * This function initializes the summary by calling various functions to update the UI
 * with task counts an the earliest due Date
 */
async function initSummary() {
    await initJoin();
    showTodosCount();
    showDoneTasksCount();
    showUrgentTasksCount();
    showTasksInBoardCount();
    showTasksInProgressCount();
    showTasksAwaitingFeedbackCount();
    findEarliestDate();
}


/**
 * This function updates the UI with the count of todo tasks.
 */
function showTodosCount() {
    let todos = todoTasks.length;
    document.getElementById('todos').innerHTML = todos;
}


/**
 * This function updates the UI with the count of done tasks.
 */
function showDoneTasksCount() {
    let doneTasksCount = doneTasks.length;
    document.getElementById('doneTasks').innerHTML = doneTasksCount;
}


/**
 * This function updates the UI with the count of urgent tasks.
 */
function showUrgentTasksCount() {
    let urgentTasksCount = urgentTasks.length;
    document.getElementById('urgentTasks').innerHTML = urgentTasksCount;
}


/**
 * This function updates the UI with the count of tasks in Board.
 */
function showTasksInBoardCount() {
    let tasksInBoardCount = taskArray.length;
    document.getElementById('tasksInBoard').innerHTML = tasksInBoardCount;
}


/**
 * This function updates the UI with the count tasks in Progress.
 */
function showTasksInProgressCount() {
    let showTasksInProgressCount = progressTasks.length;
    document.getElementById('tasksInProgress').innerHTML = showTasksInProgressCount;
}


/**
 * This function is used to display the number of tasks waiting for feedback.
 */
function showTasksAwaitingFeedbackCount() {
    let feedbackTasksCount = feedbackTasks.length;
    document.getElementById('tasksAwaitingFeedback').innerHTML = feedbackTasksCount;
}


/**
 * This function is used to find the earliest due date among the urgent tasks and updates the UI with this date.
 */
function findEarliestDate() {
    let earliestDueDate = null;
    for (let task of urgentTasks) {
        if (!earliestDueDate || new Date(task.dueDate) < new Date(earliestDueDate)) {
            earliestDueDate = task.dueDate;
        }
    }
    let formattedDueDate = new Date(earliestDueDate).toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric',
        year: 'numeric' 
    });
    document.getElementById('dueDate').innerHTML = formattedDueDate;
}


/**
 * This function is used to show the right greeting for either guest user or logged in user. On mobile devices, the greeting is displayed with timeout before the summary page appears.
 */
function showGreeting() {
    let checkGuestUserStatus = localStorage.getItem('guestUserActive');
    if (JSON.parse(checkGuestUserStatus) === true) {
        showGreetingGuestUser();        
    } else {
        showGreetingLoggedInUser();
        showUserName(loggedInUser);
    }
    setTimeout(() => {
        let greetUserBg = document.getElementById('greetUserBg');
        greetUserBg.classList.add('d-none');
    }, 1000);
}


/**
 * This function is used to show the name of the currently logged in user on the summary page.
 * @param {string} name This is the name of the currently logged in user.
 */
function showUserName(name) {
    let userNameDesktop = document.getElementById('userNameDesktop');
    userNameDesktop.innerHTML = '';
    userNameDesktop.innerHTML = name;
    let userNameMobile = document.getElementById('userNameMobile');
    userNameMobile.innerHTML = '';
    userNameMobile.innerHTML = name;
}


/**
 * This function is used to show the right greeting for logged in users on the summary page.
 */
function showGreetingLoggedInUser() {
    let greetingDesktop = document.getElementById('greetingDesktop');
    let greetingMobile = document.getElementById('greetingMobile');
    greetingDesktop.innerHTML = '';
    greetingMobile.innerHTML = '';
    greetingDesktop.innerHTML = chooseGreeting() + ',';
    greetingMobile.innerHTML = chooseGreeting() + ',';
}


/**
 * This function is used to show the right greeting for guest users on the summary page.
 */
function showGreetingGuestUser() {
        let greetingDesktop = document.getElementById('greetingDesktop');
        let greetingMobile = document.getElementById('greetingMobile');
        greetingDesktop.innerHTML = '';
        greetingMobile.innerHTML = '';
        greetingDesktop.innerHTML = chooseGreeting() + '!';
        greetingMobile.innerHTML = chooseGreeting() + '!';
}


/**
 * This function is used to check the current hour and choose the greeting based on it.
 */
function chooseGreeting() {
    let d = new Date();
    let h = d.getHours();
    if (h >= 4 && h < 10) {
        return 'Good morning';
    } else if ((h < 4) || (h >= 10 && h < 13)) {
        return  'Hello';
    } else if (h >= 13 && h < 17) {
        return 'Good afternoon';
    } else if (h >= 17) {
        return 'Good evening';
    }
}