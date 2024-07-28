// ANCHOR task search

/**
 * Checks the search input and filters tasks based on the search string.
 * 
 * This function performs the following steps:
 * 1. Retrieves the search string from the search input element.
 * 2. If the search string is not empty, it filters tasks by the search string.
 * 3. If the search string is empty, it hides the 'no task found' message and initializes the board.
 * 
 * @function checkSearch
 */
function checkSearch() {
    let searchString = document.getElementById('taskSearch').children[0].value;
    if (searchString.length > 0) {
        filterTaskBySearch(searchString)
    } else {
        document.getElementById('noTaskFound').style.display = 'none';
        initBoard();
    }
}


/**
 * Filters tasks based on a search string and displays the results.
 * 
 * This function performs the following steps:
 * 1. Iterates through the `taskArray` to find tasks where the title or description contains the search string (case-insensitive).
 * 2. Adds matching tasks to the results array.
 * 3. Displays the filtered tasks by calling the `showResults` function.
 * 
 * @function filterTaskBySearch
 * @param {string} searchString - The search string used to filter tasks.
 */
function filterTaskBySearch(searchString) {
    let results = [];
    taskArray.forEach(t => {
        if (t.title.toUpperCase().indexOf(searchString.toUpperCase()) > -1 || t.description.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
            results.push(t);
        }
    });
    showResults(results)
}


/**
 * Displays the filtered task results in their respective board columns.
 * 
 * This function performs the following steps:
 * 1. Adds task cards to the 'To do', 'In progress', 'Await feedback', and 'Done' columns based on their status in the filtered results.
 * 2. Adds additional information to the displayed task cards.
 * 3. Hides the 'no task found' message.
 * 4. If no tasks are found in the results, displays the 'no task found' message.
 * 
 * @function showResults
 * @param {Array} results - The array of filtered task objects to be displayed.
 */

function showResults(results) {
    addCardsToBoards('toDoColumn', results.filter(t => t.taskStatus == 'todo'), 'To do');
    addCardsToBoards('inProgressColumn', results.filter(t => t.taskStatus == 'progress'), 'In progress');
    addCardsToBoards('feedbackColumn', results.filter(t => t.taskStatus == 'feedback'), 'Await feedback');
    addCardsToBoards('doneColumn', results.filter(t => t.taskStatus == 'done'), 'Done');
    addInfosToCards(results);
    document.getElementById('noTaskFound').style.display = 'none';
    if (results.length == 0) {
        document.getElementById('noTaskFound').style.display = 'flex';
    }
}


document.getElementById('taskSearch').addEventListener('keyup', checkSearch);
