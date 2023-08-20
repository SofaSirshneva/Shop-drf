import './App.css';
import Header from "./appHeader/Header";
import Home from "./appHome/Home";
import Slider from "./appSlider/Slider";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Product from './appProduct/Product';
import Category from './appCategory/Category';
import Cart from './appCart/Cart';
import CartAdd from './appCart/CartAdd';
import Payment from './appPayment/Payment';

function App() {
    return (
        <Router>
        <div>
            <Header/>
            <div style={{ display: 'flex'}}>
                <Slider/>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/product/:id' element={<Product/>} />
                    <Route path='/:name' element={<Category/>} />
                    <Route path='/cart' element={<Cart/>} />
                    <Route path='/cart_add/:id' element={<CartAdd/>} />
                    <Route path='/payment' element={<Payment/>} />
                </Routes>
            </div>
        </div>
        </Router>
    );
}

export default App;