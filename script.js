const MYURL = "http://localhost:3000";

document.querySelector("#btn-search").addEventListener("click", async (e) => {
  let data = {
    departure: document.querySelector("#search-departure").value,
    arrival: document.querySelector("#search-arrival").value,
    date: document.querySelector("#travelDate").value,
  };
  console.log(data);

  const response = await fetch(`${MYURL}/trips/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  data = await response.json();

  if (data.trips.length > 0) {
    document.querySelector("#contents").innerHTML = "";
    document.querySelector("#tripsList").innerHTML = "";
    for (let i = 0; i < data.trips.length; i++) {
      document.querySelector("#tripsList").innerHTML += `
        <div class="trips">
            <p class="trip">${data.trips[i].arrival} > ${data.trips[i].departure}</p>
            <p class="tripHour">${data.trips[i].hours}</p>
            <p class="tripPrice">${data.trips[i].price}</p>
            <button type="button" id="bookTrip-btn" data-trip-id="${data.trips[i]._id}">Book</button>
        </div>
        `;
        //depart et arrivé inversé
    }
    /* document.querySelector("#image").style.display = "none";
    document.querySelector("#text").style.display = "none";
    document.querySelector("#lign").style.display = "none"; */
  } else {
    document.querySelector("#contents").innerHTML = "";
    document.querySelector("#tripsList").innerHTML = "";
    document.querySelector("#contents").innerHTML += `
        <div id="image">
            <img src="./images/notfound.png" alt="train">
        </div>
        <hr id="lign">
        <div id="text">
           <p>No trip found.</p>
       </div>
        `
  }
  for (let i = 0; i < document.querySelectorAll("#bookTrip-btn").length; i++) {
    document.querySelectorAll('#bookTrip-btn')[i].addEventListener('click', async (e) => {
        
        let tripID = e.target.getAttribute('data-trip-id')
        let cartID = e.target.getAttribute('data-trip-id')

        let data = {
            tripID: tripID,
            cartID: cartID,
            /* departure: ,
            arrival: ,
            hours: ,
            price:  */
          };
          console.log(data);

        const response = await fetch(`${MYURL}/carts/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        data = await response.json();
        window.location.href = 'cart.html'
        })
    }
});

