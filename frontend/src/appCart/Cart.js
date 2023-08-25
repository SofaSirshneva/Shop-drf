import React from 'react';
import { Link } from 'react-router-dom';
import CartAdd from './CartAdd';
import CartRemove from './CartRemove';

class Cart extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch(`${process.env.REACT_APP_API_URL}/cart/`, {credentials: 'include'})
        .then(res => res.json())
        .then(
          (result) => {
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
      var total_price = 0;
      const { error, isLoaded, items } = this.state;
      items.forEach(element => {
        total_price += element.price * element.quantity;
      });
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
                    <div className="col" id={item.id} key={item.id}>
                    <div className="card shadow-sm">
                      <img className="bd-placeholder-img card-img-top" width="100%" height="240" src={`${process.env.REACT_APP_API_URL}${item.img}`} alt={item.name}></img>
                      <div className="card-body">
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none'}}><h5 className="card-title">{item.name}</h5></Link>
                        <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2 justify-content-center pt-3 pb-4">
                          {item.amount > item.quantity ?
                            (<button className="btn  btn-outline-primary rounded-circle p-2 lh-1" type="button" name={`add_${item.id}`} onClick={() => {CartAdd(item)}}>
                                <img src={`${process.env.REACT_APP_API_URL}/media/imp/plus.png`} alt='plus' className="bi" width="18" height="16"></img>
                            </button>) :
                            (<button className="btn  btn-outline-primary rounded-circle p-2 lh-1" disabled={true} type="button" name={`add_${item.id}`} onClick={() => {CartAdd(item)}}>
                              <img src={`${process.env.REACT_APP_API_URL}/media/imp/plus.png`} alt='plus' className="bi" width="18" height="16"></img>
                              </button>)}
                            <button className="btn btn-outline-primary rounded-circle p-2 lh-1" type="button" onClick={() => {CartRemove(item)}}>
                                <img src={`${process.env.REACT_APP_API_URL}/media/imp/minus.png`} alt='minus' className="bi" width="17" height="16"></img>
                            </button>
                        </div>
                        <small id={`quantity_${item.id}`} className="text-body-secondary p-3">Количество: {item.quantity}</small>
                        <small className="text-body-secondary">{item.price} руб.</small>
                        </div>
                      </div>
                    </div>
                    </div>
                ))}
                <nav className="navbar navbar-expand-md fixed-bottom bg-light" style={{ width: 'calc(100vw - 280px)', marginLeft: '200px'}}>
                      <div className="container-fluid">
                      <h3 className="navbar-brand">Итого к оплате: <small id='price'>{total_price}</small> руб.</h3>
                      </div>
                      <div className="d-flex">
                       <Link to={`/payment/${total_price}`}><button className="btn btn-outline-success">Перейти к оплате</button></Link>
                      </div>
                    </nav>
                  </div>
            </div>
          </div>
        );
      }
    }
  }

  export default Cart;