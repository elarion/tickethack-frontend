const MYURL = 'http://localhost:3000';
const CART_ID = '';

document.querySelector('#test').addEventListener('click', async (e) => {
    let data = {
        departure: 'Paris',
        arrival: 'Lyon',
        date: '28/01/2025'
    }

    const response = await fetch(`${MYURL}/trips/search`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    })

    data = await response.json();
});

document.querySelector('#test2').addEventListener('click', async (e) => {
    let data = {
        tripID : '6798997b6f700f2af68e0207',
        // tripID : '6798997b6f700f2af68e0210',
        cartID : '0',
    }

    const response = await fetch(`${MYURL}/carts/save`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data),
    });

    data = await response.json();

    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
    // const redirectUrl = `${basePath}/cart.html?cartID=${data.cartID}`;
    const redirectUrl = `${basePath}/cart.html`;

    window.location.assign(redirectUrl);
});