import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }
  
    componentDidMount() {
      fetch("http://127.0.0.1:8000/")
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
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className="album py-5 bg-body-tertiary" style={{ width: 'calc(100vw - 200px)'}}>
            <div className="container">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
              {items.map((item) => (
                    <div className="col" key={item.id}>
                    <div className="card shadow-sm">
                      <img className="bd-placeholder-img card-img-top" width="100%" height="240" src={`http://127.0.0.1:8000${item.img}`} alt={item.name}></img>
                      <div className="card-body">
                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none'}}><p className="card-text">{item.name}</p></Link>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">В корзину</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">تعديل</button>
                          </div>
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

  export default Home;