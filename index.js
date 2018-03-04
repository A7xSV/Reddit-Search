import reddit from './reddit';

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
  reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
      let output = '<div class="card-columns">';
      
      // Loop through the results and add card
      results.forEach(post => {
        // Check if the post has an image
        const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';

        output += `
          <div class="card">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${truncateText(post.selftext, 100)}</p>
              <a href="${post.url}" class="btn btn-primary" target="_blank">Read More</a>
              <hr>
              <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
              <span class="badge badge-dark">Score: ${post.score}</span>
            </div>
          </div>
        `
      })
      
      output += '</div>';
      document.getElementById('results').innerHTML = output;
    });

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

/**
 * Shorten a piece of text.
 * @param {string} text - The text string to shorten.
 * @param {string} limit - The limit to shorten upto.
 */
function truncateText(text, limit) {
  // Make sure it's the last word
  const shortened = text.indexOf(' ', limit);

  if (shortened == -1) {
    return text;
  }
  return text.substring(0, shortened);
}