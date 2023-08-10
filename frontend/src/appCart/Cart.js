import React from 'react';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("http://127.0.0.1:8000/cart/", {credentials: 'include'})
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="album py-3 bg-body-tertiary" style={{ width: 'calc(100vw - 200px)'}}>
              <h1 className='text-center'>Корзина</h1>
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
              {items.map((item) => (
                    <div className="col" key={item.id}>
                    <div className="card shadow-sm">
                      <img className="bd-placeholder-img card-img-top" width="100%" height="240" src={`http://127.0.0.1:8000${item.img}`} alt={item.name}></img>
                      <div className="card-body">
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none'}}><p className="card-text">{item.name}</p></Link>
                        <div className="d-flex justify-content-between align-items-center">
                        <div class="d-flex gap-2 justify-content-center pt-3 pb-4">
                            <Link to={`/cart_add/${item.id}`}>
                            <button className="btn  btn-outline-primary rounded-circle p-2 lh-1" type="button">
                                <img src='http://127.0.0.1:8000/media/imp/plus.png' alt='plus' className="bi" width="18" height="16"></img>
                            </button>
                            </Link>
                            <button className="btn btn-outline-primary rounded-circle p-2 lh-1" type="button">
                                <img src='http://127.0.0.1:8000/media/imp/minus.png' alt='minus' className="bi" width="17" height="16"></img>
                            </button>
                        </div>
                        <small className="text-body-secondary">Количество: {item.quantity}</small>
                        <small className="text-body-secondary">{item.price} руб.</small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        );
      }
    }
  }

  export default Cart;