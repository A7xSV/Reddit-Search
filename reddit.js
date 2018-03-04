export default {
  search: function(searchTerm, searchLimit, sortBy) {
    let url = `http://reddit.com/search.json?q=${searchTerm}&limit=${searchLimit}&sort=${sortBy}`;
    // Return a search result promise
    return fetch(url)
      .then(res => res.json())
      .then(result => result.data.children.map(res => res.data))
      .catch(error => console.log(error));
  }
}