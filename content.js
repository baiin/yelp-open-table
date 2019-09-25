const business = document.getElementsByTagName("h1")[0];
const loc = document.getElementsByClassName("location-picker-metro")[0];

chrome.runtime.sendMessage({
  business: business.innerText,
  location: loc.innerText
});

chrome.runtime.onMessage.addListener(function(request) {
  if (
    request.data &&
    request.data.businesses &&
    request.data.businesses.length > 0
  ) {
    const bus = request.data.businesses[0];

    const popup = document.createElement("div");
    popup.id = "yelp-popup";
    popup.innerHTML = `
    <div>
      <h3>Yelp Info</h3>
      <img src="${bus.image_url}" height="120px" width="auto"/><br>
      <span>${bus.name}</span><br>
      <span>Rating: ${bus.rating} stars</span><br>
      <span>Reviews: ${bus.review_count}</span><br>
      <span>Price: ${bus.price}</span>
    </div>`;
    popup.style.display = "none";
    popup.style.position = "absolute";
    popup.style.backgroundColor = "white";
    popup.style.padding = "20px";
    popup.style.border = "1px solid black";
    popup.style.borderRadius = "10px";
    document.getElementsByClassName("_8c8f5240")[0].appendChild(popup);

    const node = document.createElement("li");
    node.className = "_4b2cc263 _965a91d5";
    node.id = "yelp-text";
    node.innerHTML = `<a href="${bus.url}" target="_blank" style="text-decoration: none; color: inherit">Yelp</a>`;
    document.getElementsByClassName("_8c8f5240")[0].appendChild(node);

    $("#yelp-text").mouseover(function() {
      document.getElementById("yelp-popup").style.display = "block";
    });

    $("#yelp-text").mouseout(function() {
      document.getElementById("yelp-popup").style.display = "none";
    });
  } else {
    console.log("no businesses found");
  }
});
