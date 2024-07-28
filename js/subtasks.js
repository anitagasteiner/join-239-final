// ANCHOR add subtask
/**
 * Changes the subtask input to allow writing a new subtask.
 * 
 * This function checks if the current button in the subtask button container is the 'addSubtaskBtn'.
 * If so, it replaces the inner HTML of the button container with the HTML for writing a new subtask.
 * 
 * @function changeSubtaskInput
 */
function changeSubtaskInput() {
    if (document.getElementById('subBtnContainer').children[0].id == 'addSubtaskBtn') {
        document.getElementById('subBtnContainer').innerHTML = writeNewSubtaskHTML();
    }
}


/**
 * Resets the subtask input field and button container to their default state.
 * 
 * This function clears the value of the subtask input field and sets the inner HTML of the button container
 * to the default HTML for adding a new subtask.
 * 
 * @function resetSubtaskInput
 */
function resetSubtaskInput() {
    document.getElementById('subtaskInput').value = '';
    document.getElementById('subBtnContainer').innerHTML = addNewSubtaskHTML();
}


/**
 * Adds the current subtask input to the temporary subtasks list.
 * 
 * This function checks if the subtask input field is not empty. If so, it initializes the temporary subtasks 
 * array and status array if they are undefined, adds the subtask input value to the temporary subtasks array, 
 * sets the status of the new subtask to false, resets the subtask input field, and renders the updated list of 
 * temporary subtasks.
 * 
 * @function addSubtaskToTempSubtasks
 */
function addSubtaskToTempSubtasks() {
    if (document.getElementById('subtaskInput').value.length > 0) {
        if (tempSubtasks == undefined) {
            tempSubtasks = [];
            tempSubtasksStatus = [];
        }
        tempSubtasks.push(document.getElementById('subtaskInput').value);
        tempSubtasksStatus.push(false);
        resetSubtaskInput();
    }
    renderTempSubtasks(); 
}


/**
 * Renders the list of temporary subtasks in the subtask edit list.
 * 
 * This function clears the current content of the subtask edit list and iterates over the temporary subtasks 
 * array, adding the HTML for each subtask to the subtask edit list.
 * 
 * @function renderTempSubtasks
 */
function renderTempSubtasks() {
    document.getElementById('subtaskEditList').innerHTML = '';
    if (tempSubtasks.length > 0) {
        for (let i = 0; i < tempSubtasks.length; i++) {
            document.getElementById('subtaskEditList').innerHTML += editSubtaskListHTML(tempSubtasks[i], i);
        }
    }
}


// ANCHOR edit subtask
/**
 * Edits a subtask at a specified index.
 * 
 * This function replaces the inner HTML of the subtask at the given index with an input field for editing the 
 * subtask, and removes the 'subtask-list-row' class from the subtask element.
 * 
 * @function editSubtask
 * @param {number} index - The index of the subtask to edit.
 */
function editSubtask(index) {
    document.getElementById('subtaskEditList').children[index].innerHTML = renderEditSubtaskInputHTML(tempSubtasks[index], index);
    document.getElementById('subtaskEditList').children[index].classList.remove('subtask-list-row');
}


/**
 * Confirms the edit of a subtask at a specified index.
 * 
 * This function checks if the edited subtask input field is not empty. If so, it replaces the subtask at the 
 * specified index with the new value, resets the subtask input field, and renders the updated list of temporary 
 * subtasks. If the input field is empty, it deletes the subtask.
 * 
 * @function confirmEditSubtask
 * @param {number} i - The index of the subtask to confirm the edit.
 */
function confirmEditSubtask(i) {
    if (document.getElementById('subtaskEditInput').value.length > 0) {
        tempSubtasks.splice(i, 1, document.getElementById('subtaskEditInput').value);
        resetSubtaskInput();
        renderTempSubtasks();
    } else {
        deleteSubtask(i);
    }
}


/**
 * Deletes a subtask at a specified index.
 * 
 * This function removes the subtask at the specified index from the temporary subtasks array, renders the 
 * updated list of temporary subtasks, and resets the subtask input field.
 * 
 * @function deleteSubtask
 * @param {number} i - The index of the subtask to delete.
 */
function deleteSubtask(i) {
    tempSubtasks.splice(i, 1);
    renderTempSubtasks();
    resetSubtaskInput();
}


/**
 * Sets the status of temporary subtasks to false.
 * 
 * This function initializes the temporary subtasks status array to an empty array and iterates over the 
 * temporary subtasks array, pushing a false value for each subtask into the status array.
 * 
 * @function setTempSubtasksStatus
 */
function setTempSubtasksStatus() {
    tempSubtasksStatus = [];
    if (tempSubtasks.length > 0) {
        tempSubtasks.forEach(() => tempSubtasksStatus.push(false));
    }
}