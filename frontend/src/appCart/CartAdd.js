import React from 'react';
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

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

class CartAdd extends React.Component {
    
      componentDidMount() {
        fetch('http://127.0.0.1:8000/cart_add/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            id: this.props.params.id
        }),
        credentials: 'include',})
        .then((response) => response.json())
        .then((data) => console.log('This is your data', data));
      }

    render(){return (<div>
        OK
    </div>)}
}

export default withParams(CartAdd);