export default {
  search: function(searchTerm, searchLimit, sortBy) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/"; //just a workaround for enabling cors access-control-allow-origin. 
    let url = `http://reddit.com/search.json?q=${searchTerm}&limit=${searchLimit}&sort=${sortBy}`;
    // Return a search result promise
    return fetch(proxyurl + url)
      .then(res => res.json())
      .then(result => result.data.children.map(res => res.data))
      .catch(error => console.log(error));
  }
}
