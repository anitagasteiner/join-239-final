/**
 * @param {string[]} colors - This Array contains the possible colors for the contact/user dots.
 * @param {string[]} usedLetters - This Array contains the first letter of each contact name.
 * @param {string[]} contactListLetters - This Array contains every letter occurring in the array "usedLetters" sorted from A to Z without duplicates.
 */
let colors = ['orange', 'purple', 'blue', 'pink', 'yellow', 'mint', 'green'];
let usedLetters = [];
let contactListLetters = [];


/**
 * This function is used to get all data from the database and to show the contact list onload of contacts.html.
 */
async function initContacts() {
    await initJoin();
    checkForNewUsersAndAddToContacts();
    showContactList();
}


/**
 * This function is used to show the contact list.
 * 
 */
function showContactList() {
    excerptContactListLetters();
    let contactListContent = document.getElementById('contactListContent');
    contactListContent.innerHTML = '';
    for (i = 0; i < contactListLetters[0].length; i++) {
        let contactListLetter = contactListLetters[0][i];
        contactListContent.innerHTML += generateContactListHTML(contactListLetter);
    }
    showContactListContent();
}


/**
 * This function is used to excerpt the initial letter of the first name of each contact, to sort out duplicates and push them into the array "contactListLetters" sorted from A to Z.
 */
function excerptContactListLetters() {
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let contactName = contact['name'];
        let firstInitial = contactName.charAt(0);
        let firstInitialUpper = firstInitial.toUpperCase();
        usedLetters.push(firstInitialUpper);
    }
    let usedLettersUnique = [...new Set(usedLetters)];
    let usedLettersUniqueSorted = usedLettersUnique.sort();
    contactListLetters.push(usedLettersUniqueSorted);
}


/**
 * This function is used to show the content of the contact list: colored dot, name and email of each contact. It also gives the information if one of the contacts is currently logged in by adding "(You)" to his*her name.
 */
function showContactListContent() {
    sortContacts();
    for (i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let firstInitial = contact['name'].charAt(0);
        let initials = getInitials(contact['name']);
        let userIsLoggedIn = proofIfContactIsLoggedIn(contact['email'], loggedInEmail);
        let contactsContainer = document.getElementById('contactsContainer' + firstInitial.toUpperCase());
        contactsContainer.innerHTML += generateContactListContentHTML(contact, initials, contact['color'], userIsLoggedIn);        
    }
}


/**
* 
*This function is used to proof if the current contact is logged in. In case the contact is logged in, "(You)" is added to his*her name in the contact list.
*@param {object} contactName This is the name of the current contact.
*/
function proofIfContactIsLoggedIn(email, loggedInEmail = '') {
    if (email.toLowerCase() === loggedInEmail) {
        return ' (You)';
    } else {
        return '';
    }
}


/**
 * This function is used to sort the contacts-array alphabetically by name.
 */
function sortContacts() {
    contacts.sort(function(a, b) {
        return compareStrings(a.name, b.name);
    });
}


/**
 * This function is used to compare the contacts' names. They are converted into lowercase to be sorted without case sensitivity. 
 * @param {string} a - contact's name a
 * @param {string} b - contact's name b
 * @returns -1: if a comes before b / 1: if b comes before a / 0: if both are the same
 */
function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return (a < b) ? -1 : (a > b) ? 1 : 0;
}


/**
 * This function is used to show detailed information about the contact that is clicked on in the contact list. The needed HTML code is generated and shown in the div with the id "contactDetailsContainer". This function also causes that the contact details container is sliding in and that the contact clicked on in the contact list is highlighted in the desktop version.
 * @param {string} contactId - ID of the contact
 * @param {string} contactName - name of the contact
 * @param {string} initials - initials of the contact's name
 * @param {string} color - color of the contact's dot
 * @param {string} email - email of the contact
 * @param {string} phone - phone number of the contact
 */
function showContactDetails(contactId, contactName, initials, color, email, phone) {
    document.getElementById('mainContacts').classList.remove('contacts-hide-on-mobile');
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
    contactDetailsContainer.classList.remove('contact-details-slide-in', 'contact-details-show');
    contactDetailsContainer.innerHTML = generateContactDetailsContainerHTML(contactId, contactName, initials, color, email, phone);
    void contactDetailsContainer.offsetWidth; /* Force reflow to reset the animation */
    contactDetailsContainer.classList.add('contact-details-slide-in');
    setTimeout(() => {
        contactDetailsContainer.classList.remove('contact-details-slide-in');
        contactDetailsContainer.classList.add('contact-details-show');
    }, 500);
    highlightContactContainer(contactId);
}


/**
 * This function is used to empty the div with the id "contactDetailsContainer".
 */
function emptyContactDetailsContainer() {
    let contactDetailsContainer = document.getElementById('contactDetailsContainer');
    contactDetailsContainer.innerHTML = '';
}


/**
 * This function is used to hide the contact details on mobile devices.
 */
function hideContactDetailsMobile() {
    document.getElementById('mainContacts').classList.add('contacts-hide-on-mobile');
}


/**
 * This function is used to highlight the contact clicked on in the contact list (desktop version). If there was a contact highlighted before, this highlighting is removed.
 * @param {string} contactId - ID of the contact clicked on in the contact list
 */
function highlightContactContainer(contactId) {
    let contactContainers = document.getElementsByClassName('contact-container');
    for (i = 0; i < contactContainers.length; i++) {
        let contactContainer = contactContainers[i];
        if (contactContainer.id == 'contactContainer' + contactId) {
            contactContainer.classList.add('highlightContact');
        } else {
            contactContainer.classList.remove('highlightContact');
        }
    }
}


/**
 * This function is used to show a message, when a user was successfully added.
 */
function showDeleteContactMessage() {
    const successMessage = document.getElementById('contactDeleted');
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show')
    }, 1500);
  }