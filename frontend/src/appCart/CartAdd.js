import React from 'react';
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class CartAdd extends React.Component {
    
      componentDidMount() {
        fetch('http://127.0.0.1:8000/cart_add/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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