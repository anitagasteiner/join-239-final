/**
 * This class is used to create new contact arrays or to change existing contact arrays.
 */

class NewContact {
    constructor(id, name, email, phone, color, initials) {
        this.id = id,
        this.name = name,
        this.email = email,
        this.phone = phone,
        this.color = color,
        this.initials = initials
    }
}


/**
 * This function is used to create a new contact array and evoces that this new array is added to the contacts array on the database.
 */
function createNewContactArray() {
    let newContact = new NewContact (
        generateUniqueId('c', contacts),
        document.getElementById('addContactInputName').value,
        document.getElementById('addContactInputMail').value,
        document.getElementById('addContactInputPhone').value,
        getRandomColor(),
        getInitials(addContactInputName.value)
    );
    addNewContact(newContact);
}


/**
 * This function is used to get a random entry out of the global array "colors".
 * @returns random color out of the array "colors"
 */
function getRandomColor() {
    let randomIndex;
    for (let i = 0; i < 20; i++) {
        randomIndex = Math.floor(Math.random() * colors.length);        
    }    
    return colors[randomIndex];
}


/**
 * This function is used to add a new contact to the database. It then evoces that the contact form is emptied and hidden again and that the new contact is shown in the contact list; a short message informs the user that the new contact was successfully created and the details of the new contact are displayed.
 * @param {object} newContact - This array contains all entries of the new contact.
 */
async function addNewContact(newContact) {
    contacts.push(newContact);
    disableBtnsOnLoad(true);
    await putData(endpointContacts, contacts);
    emptyAddContactForm();
    hideOverlayAddContact();
    await initUpdatedContactData(newContact);
    showOverlayNewContactOk();
}


/**
 * Initializes and updates the contact data by fetching the latest contacts and displaying the new contact details.
 * 
 * This asynchronous function performs the following steps:
 * 1. Disables buttons during the data loading process by calling `disableBtnsOnLoad` with `false`.
 * 2. Fetches the latest contacts data from the specified endpoint and assigns it to the `contacts` variable.
 * 3. Displays the contact list by calling `showContactList`.
 * 4. Shows the details of the newly added or updated contact by calling `showNewContactDetails` with the provided data.
 * 
 * @async
 * @function initUpdatedContactData
 * @param {Object} data - The contact data to be displayed.
 * @param {string} data.id - The ID of the contact.
 * @param {string} data.name - The name of the contact.
 * @param {string} data.initials - The initials of the contact.
 * @param {string} data.color - The color associated with the contact.
 * @param {string} data.email - The email of the contact.
 * @param {string} data.phone - The phone number of the contact.
 */
async function initUpdatedContactData(data) {
    disableBtnsOnLoad(false);
    contacts = await getData(endpointContacts);
    showContactList();
    showNewContactDetails(data['id'], data['name'], data['initials'], data['color'], data['email'], data['phone']);
}


function checkForNewUsersAndAddToContacts() {
    usersArray.forEach(user => {
        if (contacts.findIndex(contact => contact.email.toLowerCase() == user.email.toLowerCase()) == -1) {
            createNewContactArrayOutOfNewUserArray (user.email, user.name) 
        }})
}


/**
 * This function is used to create a new contact array out of the data of a new registered user and evoces that the new array is added to the contacts array on the database.
 * @param {string} email - email of the new registered user
 * @param {string} name - name of the new registered user
 */
function createNewContactArrayOutOfNewUserArray (email, name) {
    let newContact = new NewContact (
        generateUniqueId('c', contacts),
        name,
        email,
        '',
        getRandomColor(),
        getInitials(name)
    );
    addNewUserToContacts(newContact);
}


/**
 * This function is used to add new users to the contacts array on the database.
 * @param {object} newUser This is the data of the new contact taken from the new registered user.
 */
async function addNewUserToContacts(newUser) {
    contacts.push(newUser);
    await putData(endpointContacts, contacts);
}


/**
 * This function is used to display the details of a new added contact and evoces that this contact is highlighted in the contact list (desktop version).
 * @param {string} contactId - ID of the new contact
 * @param {string} contactName - name of the new contact
 * @param {string} initials - initials of the new contact's name
 * @param {string} color - color of the new contact's dot
 * @param {string} email - email of the new contact
 * @param {string} phone - phone number of the new contact
 */
function showNewContactDetails(contactId, contactName, initials, color, email, phone) {
    document.getElementById('mainContacts').classList.remove('contacts-hide-on-mobile');
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
    contactDetailsContainer.innerHTML = generateContactDetailsContainerHTML(contactId, contactName, initials, color, email, phone);
    contactDetailsContainer.classList.add('contact-details-show');
    highlightContactContainer(contactId);
}


/**
 * This function is used to delete a contact. It then evoces that the contact list is actualized and that no contact details are shown.
 * @param {string} contactId - ID of the contact
 */
async function deleteContact(contactId) {
    let contactsRemaining = contacts.filter(contact => contact.id !== contactId);
    await putData(endpointContacts, contactsRemaining);
    contacts = await getData(endpointContacts);
    showContactList();
    emptyContactDetailsContainer();
    showDeleteContactMessage()
}


/**
 * This function is used to save the changes when editing an existing contact. It also evoces that the form that is used to edit contacts is emptied and that the actualized contact list and contact details are shown.
 * @param {object} newContactData - This is the array containing the new data of the edited contact.
 * @param {string} contactId - ID of the edited contact
 */
async function saveEditedContact(newContactData, contactId) {
    disableBtnsOnLoad(true);
    contacts = await getData(endpointContacts);
    let indexOfChangedContact = contacts.findIndex(x => x.id === contactId);
    contacts.splice(indexOfChangedContact, 1);
    contacts.push(newContactData);
    await putData(endpointContacts, contacts);
    emptyEditContactForm();
    await initUpdatedContactData(newContactData);
}


/**
 * This function is used when editing a contact; it creates a new array containing the contact's data. It then evoces that the changes are saved.
 * @param {string} contactId - ID of the edited contact
 * @param {string} color - color of the edited contact's dot
 */
function editContact(contactId, color) {
    let newContactData = new NewContact (
        contactId,
        document.getElementById('editContactInputName').value,
        document.getElementById('editContactInputMail').value,
        document.getElementById('editContactInputPhone').value,
        color,
        getInitials(editContactInputName.value)
    );
    saveEditedContact(newContactData, contactId);
}


// ANCHOR Overlays

/**
 * This function is used to show the overlay containing the form to add new contacts.
 */
function showOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('d-none');
    overlayAddContact.classList.add('overlay-slide-in');
    overlayAddContact.classList.remove('overlay-slide-out');
}


/**
 * This function is used to hide the overlay containing the form to add new contacts. It also evoces that the form is emptied.
 */
function hideOverlayAddContact() {
    let overlayAddContact = document.getElementById('overlayAddContact');
    overlayAddContact.classList.remove('overlay-slide-in');
    overlayAddContact.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayAddContact.classList.add('d-none');
    }, 500);
    emptyAddContactForm();
}


/**
 * This function is used to empty the form that is used to add new contacts.
 */
function emptyAddContactForm() {
    document.getElementById('addContactInputName').value = '';
    document.getElementById('addContactInputMail').value = '';
    document.getElementById('addContactInputPhone').value = '';
}


/**
 * This function is used to show the overlay containing the form to edit contacts. It evoces that the colored dot of the contact that is being edited is created and that the name, email and phone number of the contact are already shown in the form.
 * @param {string} contactId - ID of the edited contact
 * @param {string} contactName - name of the edited contact
 * @param {string} initials - initials of the edited contact's name
 * @param {string} color - color of the edited contact's dot
 * @param {string} email - email of the edited contact
 * @param {string} phone - phone number of the edited contact
 */
function showOverlayEditContact(contactId, contactName, initials, color, email, phone) {
    createOverlayEditContactDot(initials, color);
    insertInputValues(contactName, email, phone);
    document.getElementById('editContactDeleteBtn').onclick = function() {deleteContact(contactId); hideOverlayEditContact(); hideContactDetailsMobile(); return false};
    document.getElementById('editContactForm').onsubmit = function() {editContact(contactId, color); hideOverlayEditContact(); hideContactDetailsMobile(); return false};
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.remove('d-none');
    overlayEditContact.classList.add('overlay-slide-in');
    overlayEditContact.classList.remove('overlay-slide-out');
}


/**
 * This function is used to hide the overlay containing the form to edit contacts. It also evoces that the form is emptied.
 */
function hideOverlayEditContact() {
    let overlayEditContact = document.getElementById('overlayEditContact');
    overlayEditContact.classList.remove('overlay-slide-in');
    overlayEditContact.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayEditContact.classList.add('d-none');
    }, 500);
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value= '';
}


/**
 * This function is used to empty the form that is used to edit contacts.
 */
function emptyEditContactForm() {
    document.getElementById('editContactInputName').value = '';
    document.getElementById('editContactInputMail').value = '';
    document.getElementById('editContactInputPhone').value = '';
}


/**
 * This function is used to create the colored dot of the contact to be edited; it is shown on the overlay containing the form to edit contacts.
 * @param {string} initials - initials of the edited contact's name
 * @param {string} color - color of the edited contact's dot
 */
function createOverlayEditContactDot(initials, color) {
    document.getElementById('editContactDotMobile').innerHTML = generateEditContactDotMobileHTML(initials, color);
    document.getElementById('editContactDotDesktop').innerHTML = generateEditContactDotDesktopHTML(initials, color);
}


/**
 * This function is used to insert the name, email and phone number of the contact to be edited into the form that is used to edit contacts.
 * @param {string} contactName - name of the edited contact
 * @param {string} email - email of the edited contact
 * @param {string} phone - phone number of the edited contact
 */
function insertInputValues(contactName, email, phone) {
    document.getElementById('editContactInputName').value = contactName;
    document.getElementById('editContactInputMail').value = email;
    document.getElementById('editContactInputPhone').value = phone;
}


/**
 * This function is used to show the overlay menu that allows the user to select if he*she wants to edit or delete a contact.
 * @param {string} contactId - ID of the contact to be edited or deleted
 * @param {string} contactName - name of the contact to be edited or deleted
 * @param {string} initials - initials of the name of the contact to be edited or deleted
 * @param {string} color - color of the dot of the contact to be edited or deleted
 * @param {string} email - email of the contact to be edited or deleted
 * @param {string} phone - phone number of the contact to be edited or deleted
 */
function showOverlayEditDelete(contactId, contactName, initials, color, email, phone) {
    let overlayEditDelete = document.getElementById('overlayEditDelete');    
    overlayEditDelete.innerHTML = '';
    overlayEditDelete.innerHTML = generateOverlayEditDeleteHTML(contactId, contactName, initials, color, email, phone);
    overlayEditDelete.classList.remove('d-none');
    overlayEditDelete.classList.add('overlay-slide-in');
    overlayEditDelete.classList.remove('overlay-slide-out');
}


/**
 * This function is used to hide the overlay menu that allows the user to select if he*she wants to edit or delete a contact.
 */
function hideOverlayEditDelete() {
    let overlayEditDelete = document.getElementById('overlayEditDelete');
    overlayEditDelete.classList.remove('overlay-slide-in');
    overlayEditDelete.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayEditDelete.classList.add('d-none');        
    }, 500);
}


/**
 * This function is used to show a short message to inform the user that the new contact was successfully created.
 */
function showOverlayNewContactOk() {
    let overlayNewContactOk = document.getElementById('overlayNewContactOk');
    overlayNewContactOk.classList.remove('d-none');
    overlayNewContactOk.classList.add('overlay-slide-in');
    overlayNewContactOk.classList.remove('overlay-slide-out');
    setTimeout(() => {
        hideOverlayNewContactOk();
    }, 1000);    
}


/**
 * This function is used to hide the short message again that informs the user that the new contact was successfully created.
 */
function hideOverlayNewContactOk(){
    let overlayNewContactOk = document.getElementById('overlayNewContactOk');
    overlayNewContactOk.classList.remove('overlay-slide-in');
    overlayNewContactOk.classList.add('overlay-slide-out');
    setTimeout(() => {
        overlayNewContactOk.classList.add('d-none');
    }, 500);
}