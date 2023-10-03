

let map;
let userLocation;


window.addEventListener('DOMContentLoaded', (event) => {
    // *Code starts here
})

window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        });
    }
}

const searchButton = document.getElementById("search-button"); // *search-button


searchButton.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value;

    fetch(`https://api.example.com/listings?search=${searchInput}`)
        .then(response => response.json())
        // Your code to display the listings goes here
        .then(data => {
            const listingsContainer = document.getElementById("listings-container");

            // Clear previous listings
            listingsContainer.innerHTML = "";

            // Append new listings
            data.listings.forEach(listing => {
                const listingCard = createListingCard(listing);
                listingsContainer.appendChild(listingCard);
            });
        })

        .catch(error => console.error('Error:', error));
});


function createListingCard(listing) {

    const listingLocation = `${listing.latitude},${listing.longitude}`

    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${userLocation.lat},${userLocation.lng}&destinations=${listingLocation}&key=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
    // *create listing card
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    listingCard.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <div class="listing-info">
            <h2>${listing.title}</h2>
            <p>${listing.propertyType} · ${listing.beds} beds · ${listing.bathrooms} bathrooms</p>
            <p>${listing.price} per night</p>
            <p>${listing.location}</p>
            <p>Distance from you: ${distance}</p>
            <p>Amenities: ${listing.amenities.join(", ")}</p>
        </div>
    `;

    new google.maps.Marker({
        position: { lat: listing.latitude, lng: listing.longitude },
        map,
        title: listing.title
    });

    return listingCard;
})}

// Inside the fetch function in the search button event listener

// * Map Feature
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 }, // Centered at some default location
        zoom: 8
    });
}
