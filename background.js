chrome.runtime.onMessage.addListener(function(request) {
  const business = request.business;
  const location = request.location;

  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${business}&location=${location}`,
    headers: {
      Authorization: `Bearer ${KEYS.API_KEY}`
    },
    method: "GET",
    success: function(data) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { data });
      });
    },
    error: function(err) {
      console.log(err.statusText);
    }
  });
});
