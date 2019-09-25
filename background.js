// background.js

const CLIENT_ID = "pykEvHKg6vpvq7TWsVWydg";
const API_KEY =
  "rq3cE_RUpb-NSZO9BjAfdkSnyuLTrPFuzgDGR-o0PukU4xkedrVrhH7QeUDnVn6WI9WsPVwo1naVRkrK735h7fJ46bBn5EztTIOS5Vo_Sj9DoHxVEFg9MMfwujGzW3Yx";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const business = request.business;
  const location = request.location;

  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${business}&location=${location}`,
    headers: {
      Authorization: `Bearer ${API_KEY}`
    },
    method: "GET",
    success: function(data) {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { data });
      });
    },
    error: function(err) {
      alert(err.statusText);
    }
  });
});
