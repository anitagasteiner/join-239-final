
let currentDraggedElement;


/**
 * Initializes the dragging process by storing the ID of the dragged element.
 * 
 * This function is called when a drag operation starts. It logs the ID of the element being dragged
 * and stores this ID in the `currentDraggedElement` variable.
 * 
 * @function startDragging
 * @param {string} id - The ID of the element being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * Prevents the default handling of the dragover event to allow dropping.
 * 
 * This function is used as an event handler for dragover events. It prevents the default action of the event,
 * which is required to allow dropping elements.
 * 
 * @function allowDrop
 * @param {Event} ev - The dragover event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves a task to a new status and updates the task data on the server.
 * 
 * This asynchronous function performs the following steps:
 * 1. Highlights the drop area for the task.
 * 2. Updates the status of the task in the `taskArray` based on the `taskStatus` parameter.
 * 3. Sends the updated task data to the server by calling `putData`.
 * 4. Removes the highlight from the drop area.
 * 5. Re-initializes the board to reflect the updated task list.
 * 
 * @async
 * @function moveTo
 * @param {string} id - The ID of the drop area element.
 * @param {string} taskStatus - The new status to assign to the task.
 */
async function moveTo(id, taskStatus) {
    highlight(id);
    taskArray[taskArray.findIndex(t => t.id === currentDraggedElement)].taskStatus = taskStatus;
    await putData(endpointTasks, taskArray);
    removeHighlight(id);
    initBoard();
}


/**
 * Adds a highlight class to the specified element.
 * 
 * This function adds a CSS class to visually highlight the drop area for drag-and-drop operations.
 * 
 * @function highlight
 * @param {string} id - The ID of the element to highlight.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * Removes the highlight class from the specified element.
 * 
 * This function removes a CSS class that visually highlights the drop area for drag-and-drop operations.
 * 
 * @function removeHighlight
 * @param {string} id - The ID of the element to remove the highlight from.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}