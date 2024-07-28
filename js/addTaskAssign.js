// ANCHOR Select assign in add task
/**
 * Opens the contact selection dropdown and renders the contact list.
 * 
 * This function sets the display of the contact selection list to 'flex', renders the contacts,
 * changes the select icon, checks for pre-selected contacts, and sets the onclick attribute 
 * to close the selection when clicked.
 * 
 * @function openSelectContacts
 */
function openSelectContacts() {
    document.getElementById('selectContactsList').style.display = 'flex';
    renderContactsToSelectList(contacts);
    changeSelectIcon('selectFieldBtn', 'select-image', 'select-image-up');
    checkForPreSelectContacts(tempAssignees);
    document.getElementById('selectInput').setAttribute('onclick', 'closeSelectContacts()');
}


/**
 * Opens the category selection dropdown.
 * 
 * This function sets the display of the category selection list to 'flex',
 * changes the select icon and sets the onclick attribute 
 * to close the selection when clicked.
 * 
 * @function openSelectCat
 */
function openSelectCat() {
    document.getElementById('selectCatList').style.display = 'flex';
    changeSelectIcon('selectFieldBtnCat', 'select-image', 'select-image-up');
    document.getElementById('selectCategory').setAttribute('onclick', 'closeSelectCats()');
}


/**
 * Renders the contact list in the selection dropdown.
 * 
 * This function clears the current contact list and iterates over the provided contacts array,
 * appending each contact's HTML representation to the contact list.
 * 
 * @function renderContactsToSelectList
 * @param {Array} contacts - The array of contact objects to render.
 */
function renderContactsToSelectList(contacts) {
    document.getElementById('selectContactsList').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('selectContactsList').innerHTML += showContactsSelect(contacts[i].id, contacts[i].color, contacts[i].initials, contacts[i].name);
    }
}


/**
 * Closes the contact selection dropdown and resets its contents.
 * 
 * This function clears the input field, clears the contact list, hides the contact selection list,
 * changes the select icon back, and sets the onclick attribute to open the selection when clicked.
 * 
 * @function closeSelectContacts
 */
function closeSelectContacts() {
    document.getElementById('innerSelectInput').value = '';
    document.getElementById('selectContactsList').innerHTML = '';
    document.getElementById('selectContactsList').style.display = 'none';
    changeSelectIcon('selectFieldBtn', 'select-image-up', 'select-image');
    document.getElementById('selectInput').setAttribute('onclick', 'openSelectContacts(); stopP(event)');
}


/**
 * Closes the category selection dropdown, changes the select icon,
 * and updates the onclick attribute to open the selection dropdown again.
 * 
 *  @function closeSelectCats
 */
function closeSelectCats() {
    document.getElementById('selectCatList').style.display = 'none';
    changeSelectIcon('selectFieldBtnCat', 'select-image-up', 'select-image');
    document.getElementById('selectCategory').setAttribute('onclick', 'openSelectCat(); stopP(event)');
}


/**
 * Pre-sets the task type in the category selection element and closes the category selection dropdown.
 * 
 * This function performs the following steps:
 * 1. Sets the `data-tasktype` attribute of the category selection element (`catSelectValue`) to the specified task type.
 * 2. Updates the inner HTML of the category selection element to display the selected task type.
 * 3. Closes the category selection dropdown by calling `closeSelectCats`.
 * 
 * @function preSetTaskType
 * @param {string} taskType - The task type to set in the category selection element.
 */
function preSetTaskType(taskType) {
    document.getElementById('catSelectValue').dataset.tasktype = taskType;
    document.getElementById('catSelectValue').innerHTML = taskType;
    closeSelectCats();
}


/**
 * Checks for pre-selected contacts and updates their display.
 * 
 * This function iterates over the provided assignee array and checks if each assignee is in the 
 * `tempAssignees` array. If so, it updates the checkboxes and renders the contact badge under 
 * the select field.
 * 
 * @function checkForPreSelectContacts
 * @param {Array} assigneeArray - The array of assignee objects to check.
 */
function checkForPreSelectContacts(assigneeArray) {
    if (assigneeArray.length > 0 && tempAssignees.length > 0) {
        for (let i = 0; i < assigneeArray.length; i++) {
            if (tempAssignees.indexOf(assigneeArray[i]) > -1) {
                updateCheckboxes(assigneeArray[i].id, 'rgba(42, 54, 71, 1)', 'white', 'checkbox-img', 'checkbox-img-checked');
            }
        }
        renderContactBadgeUnderSelectField();
    }
}


/**
 * Checks or unchecks a contact in the selection list based on its current state.
 * 
 * This function toggles the checkbox state of the contact element and either pre-selects or deselects the contact.
 * 
 * @function checkSelectContact
 * @param {Event} e - The event triggered by selecting a contact.
 */
function checkSelectContact(e) {
    if (e.currentTarget.children[2].classList.value == 'checkbox-img') {
        preSelectContact(e.currentTarget.children[2].id);
    } else {
        deSelectContact(e.currentTarget.children[2].id);
    }
}


/**
 * Pre-selects a contact and updates the display.
 * 
 * This function updates the checkboxes for the selected contact, adds the contact to the `tempAssignees` array,
 * and renders the contact badge under the select field.
 * 
 * @function preSelectContact
 * @param {string} contactId - The ID of the contact to pre-select.
 */
function preSelectContact(contactId) {
    updateCheckboxes(contactId, 'rgba(42, 54, 71, 1)', 'white', 'checkbox-img', 'checkbox-img-checked');
    tempAssignees.push(getContactByContactID(contactId));
    renderContactBadgeUnderSelectField();
}


/**
 * Deselects a contact and updates the display.
 * 
 * This function updates the checkboxes for the deselected contact, removes the contact from the `tempAssignees` array,
 * and renders the contact badge under the select field.
 * 
 * @function deSelectContact
 * @param {string} contactId - The ID of the contact to deselect.
 */
function deSelectContact(contactId) {
    updateCheckboxes(contactId, 'white', 'black', 'checkbox-img-checked', 'checkbox-img');
    tempAssignees.splice(tempAssignees.indexOf(contactId), 1);
    renderContactBadgeUnderSelectField();
}


/**
 * Updates the checkbox styles for a contact.
 * 
 * This function sets the background color, text color, and CSS classes for the checkbox of the specified contact.
 * 
 * @function updateCheckboxes
 * @param {string} contactId - The ID of the contact whose checkbox styles should be updated.
 * @param {string} bgColor - The background color to set.
 * @param {string} textColor - The text color to set.
 * @param {string} checkbox1Css - The CSS class to remove.
 * @param {string} checkbox2Css - The CSS class to add.
 */
function updateCheckboxes(contactId, bgColor, textColor, checkbox1Css, checkbox2Css) {
    document.getElementById(contactId).parentNode.style.backgroundColor = bgColor;
    document.getElementById(contactId).parentNode.style.color = textColor;
    document.getElementById(contactId).classList.remove(checkbox1Css);
    document.getElementById(contactId).classList.add(checkbox2Css);
}


/**
 * Renders the contact badges for pre-selected contacts under the select field.
 * 
 * This function clears the current content of the pre-selected container and iterates over the 
 * `tempAssignees` array, appending the HTML for each pre-selected contact's badge.
 * 
 * @function renderContactBadgeUnderSelectField
 */
function renderContactBadgeUnderSelectField() {
    document.getElementById('preSelectedContainer').innerHTML = '';
    for (let i = 0; i < tempAssignees.length; i++) {
        const assign = tempAssignees[i];
        if (assign != 'not found') {
            document.getElementById('preSelectedContainer').innerHTML += profileBatchHTML(assign.color, assign.initials);
        }
    }
}


// ANCHOR search in select 
/**
 * Filters the contacts based on the input value and updates the contact selection list.
 * 
 * This function performs the following steps:
 * 1. Opens the contact selection dropdown using `openSelectContacts`.
 * 2. Filters the `contacts` array based on the input value from the event.
 * 3. If the input value matches any contact names, adds those contacts to the `results` array.
 * 4. Renders the filtered contacts to the selection list using `renderContactsToSelectList`.
 * 5. Checks for pre-selected contacts and updates the selection accordingly using `checkForPreSelectContacts`.
 * 
 * @function filterContacts
 * @param {Event} e - The input event containing the value to filter contacts by.
 */
function filterContacts(e) {
    openSelectContacts();
    let results = [];
    contacts.forEach(c => {
        if (e.target.value.length > 0 && c.name.toUpperCase().indexOf(e.target.value.toUpperCase()) != -1) {
            results.push(c);
            renderContactsToSelectList(results);
        }
    });
    checkForPreSelectContacts(results);
}