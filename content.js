const business = document.getElementsByTagName("h1")[0];
console.log(business.innerText);

const loc = document.getElementsByClassName("location-picker-metro")[0];

chrome.runtime.sendMessage({
  business: business.innerText,
  location: loc.innerText
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (
    request.data &&
    request.data.businesses &&
    request.data.businesses.length > 0
  ) {
    const bus = request.data.businesses[0];
    console.log(bus);

    const node = document.createElement("div");
    node.className = "_4a920df5";
    node.innerHTML = `<a href="${bus.url}" target="_blank">Yelp Rating: ${bus.rating}</a>`;
    document.getElementsByClassName("d3ba82e4")[0].appendChild(node);
  } else {
    console.log("no businesses found");
  }
});
