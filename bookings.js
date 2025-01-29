const MYURL = 'https://tickethack-backend-pied.vercel.app';
const ITEMS = document.querySelector('.items');

function appendTripsInCart(trips) {
    document.querySelector('#has-cart').style.display = 'initial';
    document.querySelector('#empty-cart').style.display = 'none';

    trips.forEach(trip => {
        ITEMS.innerHTML += `
            <li class="item-list">
                <span class="il-trip">${trip.departure} > ${trip.arrival}</span>
                <span class="il-hour">${trip.hours}</span>
                <span class="il-price"><span>${trip.price}</span>€</span>
                <span class="il-depart-in">${trip.timeLeft}</span>
            </li>
        `;
    });
}

async function getCarts() {
    try {
        const response = await fetch(`${MYURL}/bookings`);
        const data = await response.json();

        const { result, trips } = data;

        if (!result) {
            return result;
        }

    
        appendTripsInCart(trips);
    
        

        return true;
    } catch (e) {
        console.error('Error With getCards =>', e);
        return false;
    }
}

getCarts();
