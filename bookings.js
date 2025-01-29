const MYURL = 'http://localhost:3000';
const ITEMS = document.querySelector('.items');

function appendTripsInCart(trips) {
    ITEMS.innerHTML = '';
    document.querySelector('#has-cart').style.display = 'initial';
    document.querySelector('#empty-cart').style.display = 'none';

    trips.forEach(trip => {
        ITEMS.innerHTML += `
            <li class="item-list">
                <span class="il-trip">${trip.departure} > ${trip.arrival}</span>
                <span class="il-hour">${trip.date}</span>
                <span class="il-price"><span>${trip.price}</span>€</span>
                <span class="il-depart-in">${trip.date}</span>
            </li>
        `;
    });
}

async function getCarts() {
    try {
        const response = await fetch(`${MYURL}/bookings`);
        const data = await response.json();

        const { result, bookings } = data;

        if (!result) {
            return result;
        }

    for (let i = 0; i < bookings.length; i++) {
        appendTripsInCart(bookings[i].trips);
    }
        

        return true;
    } catch (e) {
        console.error('Error With getCards =>', e);
        return false;
    }
}

getCarts();
