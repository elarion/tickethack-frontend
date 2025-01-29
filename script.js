const MYURL = "http://localhost:3000";

document.querySelector('#travelDate').min = new Date().toISOString().split('T')[0];
document.querySelector('#tripsList').style.display = 'none';

function appendTripsSearched(trips) {
	if (trips.length > 0) {
		document.querySelector('#contents').style.display = 'none';
		document.querySelector('#tripsList').style.display = 'initial';
		document.querySelector("#tripsList").innerHTML = "";

		for (const trip of trips) {
			document.querySelector("#tripsList").innerHTML += `
				<div class="trips">
					<p class="trip">${trip.arrival} > ${trip.departure}</p>
					<p class="tripHour">${trip.hours}</p>
					<p class="tripPrice">${trip.price}</p>
					<button type="button" class="bookTrip-btn" id="bookTrip-btn" data-tripid="${trip._id}">Book</button>
				</div>
			`;
		}
	} else {
		document.querySelector("#contents").style.display = 'initial';
		document.querySelector("#tripsList").style.display = 'none';

		document.querySelector("#image > img").src = './images/notfound.png';
		document.querySelector("#text > p").textContent = 'No trip found.';
	}
}

document.querySelector('#btn-search').addEventListener('click', async () => {
	let data = {
		departure: document.querySelector("#search-departure").value,
		arrival: document.querySelector("#search-arrival").value,
		date: document.querySelector("#travelDate").value,
	};

	const response = await fetch(`${MYURL}/trips/search`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});

	data = await response.json();

	appendTripsSearched(data.trips);
}); 


document.querySelector('#tripsList').addEventListener('click', async (e) => {
	const target = e.target;

	if (target.classList.contains('bookTrip-btn')) {
		const response = await fetch(`${MYURL}/carts/save`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ tripID: target.dataset.tripid }),
		});

		data = await response.json();
		window.location.assign('cart.html');
	}
});