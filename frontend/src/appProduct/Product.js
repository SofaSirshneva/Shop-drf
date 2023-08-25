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
      fetch(`${process.env.REACT_APP_API_URL}/` + id)
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
                <img src={`${process.env.REACT_APP_API_URL}${item.img}`} alt={item.name} className="img-thumbnail" style={{ height: '350px', width: '350px' }} />
                <div className='p-3'>
                  <h1>{item.name}</h1>
                  <h5>Цена: {item.price}руб.</h5>
                  <i>Категории:</i> {item.categories.map((c) => (
                    <>{c.name} </>))}<br />
                  <i>В наличии:</i> {item.amount} штуки <br />
                  <i>Состав:</i> {item.compound}<br />
                  <i>Вес:</i> {item.weight}г<br />
                  <i>Пищевая ценность в 100г продукта:</i> <br />
                  <ul>
                  <li>Калории: {item.calories}</li>
                  <li>Белки: {item.proteins}г</li>
                  <li>Жиры: {item.fats}г</li>
                  <li>Углеводы: {item.carbohydrates}г</li>
                  </ul>
                </div>
              </div>
           </div>
        );
      }
    }
  }

  export default withParams(Product);