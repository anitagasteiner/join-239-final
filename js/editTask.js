/**
 * Opens the edit overlay for the specified task and fills the form with task details.
 * 
 * @param {string} id - The ID of the task to edit.
 */
function openEdit(id) {
    let taskIndex = taskArray.findIndex(t => t.id === id)
    document.getElementById('taskOverlay').innerHTML = editTaksOverlayHTML(id);
    fillEditForm(taskIndex);
    if (taskArray[taskIndex].assigned) {
        tempAssignees = pushTaskAssigneeInfosToArray(taskArray[taskIndex]);
    }
    if (taskArray[taskIndex].subTask) {
        tempSubtasks = taskArray[taskIndex].subTask;
        tempSubtasksStatus = taskArray[taskIndex].subTaskStatus;
    }
    document.getElementById('closeEditOverlay').addEventListener('click', resetGlobalTaskVariables);
}


/**
 * Fills the edit form with the details of the specified task.
 * 
 * @param {number} taskIndex - The index of the task in the task array.
 */
function fillEditForm(taskIndex) {
    let editInputIds = ['titleInput', 'descriptionInput', 'dateInput'];
    let content = [taskArray[taskIndex].title, taskArray[taskIndex].description, taskArray[taskIndex].dueDate];
    for (let j = 0; j < editInputIds.length; j++) {
        document.getElementById(editInputIds[j]).value = content[j];
    }
    setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium')
    setTaskPrio(taskArray[taskIndex].prio);
    renderEditSubtasks(taskArray[taskIndex]);
    renderAssigneesToTaskEdit(taskArray[taskIndex])
}


/**
 * Sets the priority of the task and updates the UI accordingly.
 * 
 * @param {string} prio - The priority of the task ('low', 'medium', 'urgent').
 */
function setTaskPrio(prio) {
    currentTaskPrio = prio
    const prioFunctions = {
        'low': () => setPrioBtn('prioLow', 'low-selected', './assets/img/priority-low-white.svg', 'low'),
        'medium': () => setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium'),
        'urgent': () => setPrioBtn('prioUrgent', 'urgent-selected', './assets/img/priority-urgent-white.svg', 'urgent')
    }
    prioFunctions[prio]();
}


/**
 * Renders the assignees for task editing.
 * 
 * @param {Object} task - The task object.
 */
function renderAssigneesToTaskEdit(task) {
    if (task.assigned != undefined) {
        tempAssignees = pushTaskAssigneeInfosToArray(task);
        renderContactBadgeUnderSelectField();
    }
}


/**
 * Renders the subtasks for task editing.
 * 
 * @param {Object} task - The task object.
 */
function renderEditSubtasks(task) {
    if (task.subTask != undefined) {
        tempSubtasks = task.subTask;
        renderTempSubtasks();
    }
}


/**
 * Toggles the status of the specified subtask and updates the task and UI.
 * 
 * @param {string} subtaskId - The ID of the subtask to check.
 */
async function checkSubTask(subtaskId) {
    let taskId = document.getElementsByClassName('open-task')[0].id.replace('detailsFor', '');
    let taskArrayIndex = taskArray.findIndex(t => t.id === taskId)
    subtaskId = subtaskId.replace('sub', '');
    taskArray[taskArrayIndex].subTaskStatus[subtaskId] = changeSubTaskStatus(taskArray[taskArrayIndex].subTaskStatus[subtaskId]);
    renderSubTasks(getTaskById(taskId));
    addSubTaskProgressToCards(taskArray, taskArrayIndex);
    await putData(endpointTasks, taskArray);
}


/**
 * Toggles the current status of a subtask.
 * 
 * @param {boolean} currentStatusBoolean - The current status of the subtask.
 * @returns {boolean} The new status of the subtask.
 */
function changeSubTaskStatus(currentStatusBoolean) {
    return !currentStatusBoolean;
}


/**
 * Confirms and saves the edited task.
 * 
 * @param {string} id - The ID of the task to confirm.
 */
async function confirmEditTask(id) {
    if (validateDate() && validateTitle()) {
        let i = taskArray.findIndex(t => t.id === id);
        setValuesToTaskArray(i);
        await putData(endpointTasks, taskArray);
        initBoard();
        closeTask('taskOverlay');
        showTaskEditedMessage();
    } 
}


/**
 * Sets the edited values to the task array.
 * 
 * @param {number} i - The index of the task in the task array.
 */
function setValuesToTaskArray(i) {
    taskArray[i].assigned = getIDofAssignee(tempAssignees);
    taskArray[i].subTask = tempSubtasks;
    taskArray[i].subTaskStatus = tempSubtasksStatus;
    taskArray[i].title = document.getElementById('titleInput').value.trim();
    taskArray[i].description = document.getElementById('descriptionInput').value.trim();
    taskArray[i].dueDate = document.getElementById('dateInput').value.trim();
    taskArray[i].prio = currentTaskPrio;
}


/**
 * Displays a message indicating that the task was edited successfully.
 */
function showTaskEditedMessage() {
    const successMessage = document.getElementById('taskEdited');
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 1500);
}


/**
 * Displays a message indicating that the task was deleted successfully.
 */
function showTaskDeletedMessage() {
    const successMessage = document.getElementById('taskDeleted');
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 1500);
}
