function taskCardHTML(id, type, title, description, prioIcon, status) {
    return /*html*/`
    <div draggable="true" ondragstart="startDragging('${id}')" id="${id}" onclick="openTasks('${id}'); stopP(event)" class="card clickable">
        <div class="card-header">
            <div class="type-container ${taskTypeColor[type]}">${type}</div>
            <details>
                <summary class="li-none">
                    <img onclick="stopP(event)" src="assets/img/more_card-black.svg" class="hide-over-1400p" alt="move card menu">
                </summary>
                <div class="card-menu-overlay hide-option-${status}">
                    <div onclick="startDragging('${id}'), moveTo('${id}', 'todo'), stopP(event)" class="clickable hide-in-todo">To do</div>
                    <div onclick="startDragging('${id}'), moveTo('${id}', 'progress'), stopP(event)" class="clickable hide-in-progress">In progress</div>
                    <div onclick="startDragging('${id}'), moveTo('${id}', 'feedback'), stopP(event)" class="clickable hide-in-feedback">Await feedback</div>
                    <div onclick="startDragging('${id}'), moveTo('${id}', 'done', stopP(event))" class="clickable hide-in-done">Done</div>
                </div>
            </details>
        </div>
        <div class="card-text-box">
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
        <div class="card-progress-container">
            <div class="outer-pbar" id="subtaskBar">
                <div class="inner-pbar" style="width: 0%;"></div>
            </div>
            <div class="font-12"></div>
        </div>
        <div class="card-footer">
            <div class="circle-container">
            </div>
            <img class="clickable" src="${prioIcon}" alt="Priority">
        </div>
    </div>
    `;
}


function addAssignHTML(initials, contactColor) {
    return /*html*/`
        <div class="profile-batch ${contactColor}">${initials}</div>
    `
}


function addAssignWithOverlapHTML(initials, contactColor, i) {
    return /*html*/`
        <div class="profile-batch ${contactColor} overlap-${i}">${initials}</div>
    `
}


function boardPlaceholderHTML(column) {
    return /*html*/`
        <div class="column-placeholder">
            <p>No tasks ${column}</p>
        </div>
    `
}


// ANCHOR task details
function taskHTML(id, type, title, description, dueDate, prio) {
    return /*html*/`
        <div onclick="stopP(event)" id="detailsFor${id}" class="open-task">
            <div class="task-header">
            <div class="type-container type-container-overlay ${taskTypeColor[type]}">${type}</div>
                <img class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask('taskOverlay')">
            </div>
            <h1>${title}</h1>
            <div class="task-description"><p>${description}</p></div>
            <div class="task-line">
                <p class="task-p-bold">Due date:</p>
                <p>${dueDate}</p>
            </div>
            <div class="task-line">
                <p class="task-p-bold">Priority:</p>
                <p class="prio-text">Prio <img src=${prio} alt="Priority of task"></p>
            </div>
            <p class="task-p-bold">Assigned To:</p>
            <div class="card-details-assignees" id="taskAssign"></div>
            <p class="task-p-bold">Subtasks</p>
            <div id="taskOverlaySubtasks">
            </div>
            <div class="task-footer">
                <div onclick="deleteTask('${id}')" class="task-footer clickable delete-task-button">
                <div class="icon"></div>
                <p>Delete</p>
            </div>
            <div class="divider"></div>
                <div onclick="openEdit('${id}')" class="task-footer clickable edit-task-button">
                <div class="icon"></div>
            <p>Edit</p>
                </div>
            </div>
        </div>  
        
    `
}


function taskAssignHTML(color, initials, name, assigneeIsLoggedIn) {
    return /*html*/`
        <div class="task-assigned">
            <div class="profile-batch ${color}">${initials}</div>
            <p class="assigned-name">${name}${assigneeIsLoggedIn}</p>
        </div>
    `
}


function taskSubTaskHTML(i, subtaskText) {
    return /*html*/`
        <div id="sub${i}" class="check-list-row">
            <img onclick="checkSubTask('sub${i}')" class="clickable" src="assets/img/checkbox.svg" alt="checkbox-empty">
            <p>${subtaskText}</p>
        </div>
    `
}


function taskSubTaskDoneHTML(i, subtaskText) {
    return /*html*/`
        <div id="sub${i}" class="check-list-row">
            <img onclick="checkSubTask('sub${i}')" class="clickable" src="assets/img/checkbox-checked.svg" alt="checkbox-checked">
            <p>${subtaskText}</p>
        </div>
    `
}



// ANCHOR edit task
function editTaksOverlayHTML(id) {
    return /*html*/`
        <div onclick="closeSelectContacts(), stopP(event)" id="editFor${id}" class="open-task less-padding-for-edit-scroll">
            <div class="task-header flex-end">
                <img id="closeEditOverlay" class="clickable" src="assets/img/close-black.svg" alt="close Task" onclick="closeTask('taskOverlay')">
            </div>
            <div class="edit-form task-edit-scroll">
                <div class="input-group">
                    <label class="font-16" for="titleInput">Title<span class="color-red">*</span></label>
                    <input id="titleInput" class="enter-input font-16" placeholder="Enter a title" type="text" name="Title" id="titleInput">
                    <div id="titleWarningMessage" class="warning-message-field-required d-none">Please enter a title</div>    
                </div>
                <div class="input-group">
                    <label class="font-16" for="descriptionInput">Description</label>
                    <textarea class="enter-description-input font-16" placeholder="Enter a description"
                        name="Description" id="descriptionInput"></textarea>
                </div>
                <div class="input-group font-16">
                    <label class="font-16" for="dateInput">Due date<span class="color-red">*</span></label>
                    <input id="dateInput" class="enter-input font-16" placeholder="dd/mm/yyyy" type="text"
                        onfocus="(this.type='date')" onblur="(this.type='text'); this.placeholder='dd/mm/yyyy';">
                    <div id="dateWarningMessage" class="warning-message-field-required d-none">Please select a date</div>
                </div>
                <div class="input-group">
                    <label class="font-16">Prio</label>
                    <div class="prio-container">
                        <div onclick="setPrioBtn('prioUrgent', 'urgent-selected', './assets/img/priority-urgent-white.svg', 'urgent')" id="prioUrgent" class="priority-btn-edit clickable">
                            <span>Urgent</span>
                            <img src="./assets/img/priority-urgent.svg" alt="Number of urgent priority tasks">
                        </div>
                        <div onclick="setPrioBtn('prioMedium', 'medium-selected', './assets/img/priority-medium-white.svg', 'medium')" id="prioMedium" class="medium-selected priority-btn-edit clickable">
                            <span>Medium</span>
                            <img src="./assets/img/priority-medium-white.svg" alt="Number of priority medium tasks">
                        </div>
                        <div onclick="setPrioBtn('prioLow', 'low-selected', './assets/img/priority-low-white.svg', 'low')" id="prioLow" class="priority-btn-edit clickable">
                            <span>Low</span>
                            <img src="./assets/img/priority-low.svg" alt="Number of low priority tasks">
                        </div>
                    </div>
                </div>
                <div class="input-group">
                    <label class="font-20" for="selectInput">Assigned to</label>
                    <div id="selectInput" onclick="openSelectContacts(); stopP(event)"
                        class="enter-input outer-input select-rel">
                        <input onkeyup="filterContacts(event)" id="innerSelectInput" class="inner-input font-20"
                            placeholder="Select contacts to assign" type="text" name="select contacts">
                        <div id="selectFieldBtn" class="select-image inner-input-img clickable"></div>
                        <div id="selectContactsList" class="contact-select-list d-none"></div>
                    </div>
                    <div class="pre-select-badges" id="preSelectedContainer"></div>
                </div>
                <div class="input-group">
                    <label class="font-20" for="selectInput">Subtasks</label>
                    <div id="editOverlaySubtaskInputFrame" onclick="changeSubtaskInput()" class="enter-input outer-input">
                        <input onkeypress="checkKeyForEnter(event), stopP(event)" class="inner-input font-16" placeholder="Add new subtask" type="text"
                            name="add subtasks" id="subtaskInput">
                        <div id="subBtnContainer" class="sub-btn-container">
                            <div id="addSubtaskBtn" class="sub-plus-image inner-input-img clickable"></div>
                        </div>
                    </div>
                    <div class="subtask-ul" id="subtaskEditList"></div>
                </div>
                <div class="form-btn-container padding-top-0">
                    <button class="board-btn-dark board-edit-btn clickable" onclick="confirmEditTask('${id}')">
                        <span>Ok</span><img src="assets/img/check.svg" alt="Edit board button">
                    </button>
                </div>
            </div>
        </div>
    `
}


function profileBatchHTML(color, initials) {
    return /*html*/`
        <div class="profile-batch ${color} clickable">${initials}</div>
    `
}


function editSubtaskListHTML(subtask, i) {
    return /*html*/`
        <div class="subtask-list-row clickable">
            <li>${subtask}</li>
            <div class="flex-all-center">
                <img onclick="editSubtask(${i})" class="hide-for-hover border-divider" src="assets/img/edit.svg" alt="Edit subtask">
                <img onclick="deleteSubtask(${i})" class="hide-for-hover" src="assets/img/delete.svg" alt="Delete subtask">
            </div>
        </div>
    `
}


function optionInDropAssignedMenuHTML() {
    /*html*/`
        <option value="${value}">Select contacts to assign</option>
    `
}


function showContactsSelect(id, color, initials, name) {
    return /*html*/`
    <div onclick="checkSelectContact(event); stopP(event)" class="contacts-select-list-row clickable">
        <div class="profile-batch ${color}">${initials}</div>
        <div>${name}</div>
        <div id="${id}" class="checkbox-img"></div>
    </div>
    `
}


function addNewSubtaskHTML() {
    return /*html*/`
        <div id="addSubtaskBtn" class="sub-plus-image inner-input-img clickable"></div>
    `
}


function writeNewSubtaskHTML() {
    return /*html*/`
        <div id="cancelSubtaskBtn" onclick="resetSubtaskInput(); stopP(event)" class="sub-cancel-image inner-input-img clickable"></div>
        <div class="sub-btn-devider"></div>
        <div id="confirmSubtaskBtn" onclick="addSubtaskToTempSubtasks(); stopP(event)" class="sub-confirm-image inner-input-img clickable"></div>    
        
    `
}



function renderEditSubtaskInputHTML(value, i) {
    return /*html*/`
    <div id="subtaskEditFrame" class="enter-input outer-input sub-outer-input">
        <input class="inner-input font-16" value="${value}" type="text" name="edit subtask" id="subtaskEditInput">
        <div id="subEditBtnContainer" class="sub-btn-container">
            <div id="deleteInEditSubtaskBtn" onclick="deleteSubtask(${i}); stopP(event)" class="sub-edit-delete-image inner-input-img clickable"></div>
            <div class="sub-btn-devider"></div>
            <div id="confirmEditSubtaskBtn" onclick="confirmEditSubtask(${i}); stopP(event)" class="sub-confirm-image scale-hover inner-input-img clickable"></div>
        </div>
    </div>
    `
}