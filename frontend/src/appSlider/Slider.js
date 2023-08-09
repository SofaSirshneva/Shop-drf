import React from 'react';
import { Link } from 'react-router-dom';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        fetch("http://127.0.0.1:8000/categories")
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

    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return (
            <div style={{ display: 'inline-flex' }}>
                <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '200px', height: 'calc(100vh -  30px)' }}>
                    <h2>Категории</h2>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-white" aria-current="page">
                                Все товары
                            </Link>
                        </li>
                        {items.map((item) => (
                            <li className="nav-item">
                            <Link to={`/${item.name}`} className="nav-link text-white" aria-current="page">
                                {item.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
      )}
}
}

export default Slider;