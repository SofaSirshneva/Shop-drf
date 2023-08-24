import React from 'react';
import { useParams } from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class Product extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        item: null
      };
    }
  
    componentDidMount() {
      const id = this.props.params.id;
      fetch('http://127.0.0.1:8000/' + id)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              item: result
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
      const { error, isLoaded, item } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div className='p-3'>
              <div style={{ display: 'inline-flex' }}>
                <img src={`${process.env.REACT_APP_API_URL}${item.img}`} className="img-thumbnail" style={{ height: '350px', width: '350px' }} />
                <div className='p-3'>
                  <h1>{item.name}</h1>
                  <h5>Цена: {item.price}руб.</h5>
                  Категории: {item.categories.map((c) => (
                    <>{c.name}</>))}<br />
                  В наличии: {item.amount} штуки <br />
                  Состав: {item.compound}

                </div>
              </div>
           </div>
        );
      }
    }
  }

  export default withParams(Product);