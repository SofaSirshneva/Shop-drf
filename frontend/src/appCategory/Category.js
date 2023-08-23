import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import CartAdd from '../appCart/CartAdd';
import CartRemove from '../appCart/CartRemove';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        name: 'default'
      };
    }
  
    componentDidMount() {
      const name = this.props.params.name;
      fetch("http://127.0.0.1:8000/category/" + name, {credentials: 'include'})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result,
              name: name
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

    componentDidUpdate(){
      const name = this.props.params.name;
      if (name !== this.state.name){
        this.setState({
          name: name,
        });
        fetch("http://127.0.0.1:8000/category/" + name, {credentials: 'include'})
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
  }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="album py-3 bg-body-tertiary" style={{ width: 'calc(100vw - 200px)' }}>
            <h1 className='text-center'>{this.props.params.name}</h1>
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                {items.map((item) => (
                  <div className="col" key={item.id}>
                    <div className="card shadow-sm">
                      <img className="bd-placeholder-img card-img-top" width="100%" height="240" src={`http://127.0.0.1:8000${item.img}`} alt={item.name}></img>
                      <div className="card-body">
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}><p className="card-text">{item.name}</p></Link>
                        <div className="d-flex justify-content-between align-items-center">
                        {item.amount ? (
                        <><div className="d-flex gap-2 justify-content-center pt-3 pb-4">
                            {item.amount > item.quantity ?
                            (<button className="btn  btn-outline-primary rounded-circle p-2 lh-1" type="button" name={`add_${item.id}`} onClick={() => {CartAdd(item)}}>
                                <img src='http://127.0.0.1:8000/media/imp/plus.png' alt='plus' className="bi" width="18" height="16"></img>
                            </button>) :
                            (<button className="btn  btn-outline-primary rounded-circle p-2 lh-1" disabled={true} type="button" name={`add_${item.id}`} onClick={() => {CartAdd(item)}}>
                              <img src='http://127.0.0.1:8000/media/imp/plus.png' alt='plus' className="bi" width="18" height="16"></img>
                              </button>)}
                            <button className="btn btn-outline-primary rounded-circle p-2 lh-1" type="button" onClick={() => { CartRemove(item); } }>
                              <img src='http://127.0.0.1:8000/media/imp/minus.png' alt='minus' className="bi" width="17" height="16"></img>
                            </button>
                          </div><small id={`quantity_${item.id}`} className="text-body-secondary">Количество: {item.quantity}</small><small className="text-body-secondary">{item.price} руб.</small></> ) :
                          <div className='text-center' style={{ color: 'red'}}>Нет в наличии</div>}
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

  export default withParams(Category);