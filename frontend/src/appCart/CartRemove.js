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

function CartRemove(item) {
    fetch(`${process.env.REACT_APP_API_URL}/cart_remove/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            id: item.id
        }),
        credentials: 'include',})
        .then((response) => response.json())
        .then((data) =>  {
            var fieldNameElement = document.getElementById('quantity_'+item.id);
            var price = document.getElementById('price');
            if(price)
                price.innerHTML = Number(price.textContent) - item.price;
            if (data['quantity'] === 0){
                var card = document.getElementById(item.id);
                if (card){
                    card.innerHTML = '';
                }
                else{
                    fieldNameElement.innerHTML = 'Количество: 0'
                }
            }
            else {
                fieldNameElement.innerHTML = 'Количество: ' + data['quantity']
            }
            if (!card){
                if (data['quantity'] < item.amount){
                    var elems = document.getElementsByName("add_"+item.id);
                    for(var i = 0; i < elems.length; i++) {
                        elems[i].disabled = false;
                    }
                }
            }
        });
    }

export default CartRemove;
