function getCookie(name) {
    if (!document.cookie) {
      return null;
    }
    const token = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (token.length === 0) {
      return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
  }

function CartAdd(id) {
    var fieldNameElement = document.getElementById('quantity_'+id);
    var price = document.getElementById('price');
    fetch('http://127.0.0.1:8000/cart_add/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            id: id
        }),
        credentials: 'include',})
        .then((response) => response.json())
        .then((data) =>  {
          fieldNameElement.innerHTML = 'Количество: ' + data['quantity'];
          if(price)
            price.innerHTML = Number(price.textContent) + Number(data['price']);
        });
    }

export default CartAdd;
