const container = document.getElementById("phoneContainer");
const details = document.getElementById("details");

function searchPhone() {
    const input = document.getElementById("searchInput").value;

    fetch(`https://openapi.programming-hero.com/api/phones?search=${input}`)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
}

function displayPhones(phones) {
    container.innerHTML = "";

    phones.forEach(phone => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <img src="${phone.image}" width="100%">
            <h3>${phone.phone_name}</h3>
            <p>${phone.brand}</p>
        `;

        div.onclick = () => loadDetails(phone.slug);

        container.appendChild(div);
    });
}

function loadDetails(id) {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.data));
}

function showDetails(phone) {
    details.innerHTML = `
        <h2>${phone.name}</h2>
        <p>Release Date: ${phone.releaseDate || "Not Available"}</p>
        <p>Chipset: ${phone.mainFeatures.chipSet}</p>
        <p>Display: ${phone.mainFeatures.displaySize}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
        <p>Sensors: ${phone.mainFeatures.sensors.join(", ")}</p>
    `;
}

function showAll(){
    searchPhone(); 
}