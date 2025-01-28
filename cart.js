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
                <span class="il-delete"><button class="delete-button" data-tripID="${trip._id}">X</button></span>
            </li>
        `;
    });

    document.querySelector('#total-price').textContent = calculateTotal();
}

function calculateTotal() {
    return Array.from(document.querySelectorAll('.il-price > span')).reduce((acc, price) => {
        acc += Number(price.textContent);
        return acc;
    }, 0)
}

async function getCarts() {
    try {
        const response = await fetch(`${MYURL}/carts${window.location.search}`);
        const data = await response.json();

        const { result, cart } = data;

        if (!result) {
            return result;
        }

        ITEMS.dataset.cartid = cart._id;

        appendTripsInCart(cart.trips);

        return true;
    } catch (e) {
        console.error('Error With getCards =>', e);
        return false;
    }
}

function updateDOMCartWhenDelete(target) {
    target.parentNode.parentNode.remove();

    if (document.querySelectorAll('.item-list').length === 0) {
        document.querySelector('#has-cart').style.display = 'none';
        document.querySelector('#empty-cart').style.display = 'initial';

        return false;
    }

    document.querySelector('#total-price').textContent = calculateTotal();
    return true;
}

async function deleteCart(target, cartID, tripID) {
    try {
        const response = await fetch(`${MYURL}/carts/delete/${cartID}/${tripID}`, {
            method: 'DELETE',
        });

        await response.json();

        return updateDOMCartWhenDelete(target);
    } catch (e) {
        console.error('Error With getCards =>', e);
        return false;
    }
}

getCarts();

ITEMS.addEventListener('click', async (e) => {
    const target = e.target;

    if (target.classList.contains('delete-button')) {
        const cartID = new URLSearchParams(window.location.search).get('cartID') || '';
        deleteCart(target, cartID, target.dataset.tripid)
    }
});

document.querySelector('#purchase-button').addEventListener('click', async (e) => {
    try {
        const response = await fetch(`${MYURL}/bookings/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({cartID : ITEMS.dataset.cartid})
        });
        
        const data = await response.json();
        const { result } = data;

        if (!result) {
            return false;
        }

        const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
        const redirectUrl = `${basePath}/bookings.html`;
        window.location.assign(redirectUrl);
    } catch (e) {
        console.error('Error With getCards =>', e);
        return false;
    }
});