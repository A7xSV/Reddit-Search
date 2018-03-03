const searchInput = document.getElementById('search-input');
const searchForm  = document.getElementById('search-form');

searchForm.addEventListener('submit', e => {
  // Get the search term
  const searchTerm = searchInput.value.trim();

  // Get Sort By value
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  // Get Limit value
  const searchLimit = document.getElementById('limit').value;

  // Check input
  if (searchTerm === '') {
    // Alert the user
    showMessage('Please add a search term.', 'alert-danger');
  }

  // Clear input
  searchInput.value = '';

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy);

  // Prevent the form from actually submitting
  e.preventDefault();
});

/**
 * Alert the user with a custom a bootstrap alert div.
 * @param {string} message - The message that makes up the alert content.
 * @param {string} className - The bootstrap class added to the alert.
 */
function showMessage(message, className) {
  // Create the div
  const div = document.createElement('div');

  // Add classes
  div.className = `alert ${className}`;

  // Add message
  div.appendChild(document.createTextNode(message));

  // Get parent element
  const searchContainer = document.getElementById('search-container');

  // Get search element
  const search = document.getElementById('search');

  // Insert the message
  searchContainer.insertBefore(div, search);

  // Alert timeout
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}