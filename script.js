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
            <p class="trip">${data.trips[i].departure} > ${data.trips[i].arrival}</p>
            <p class="tripHour">${data.trips[i].hours}</p>
            <p class="tripPrice">${data.trips[i].price}</p>
            <button type="button" id="bookTrip-btn">Book</button>
        </div>
        `;
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
        let data = {
            _id: //Trip ID
          };

        const response = await fetch(`${MYURL}/carts/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        data = await response.json();
        })
    }
});

