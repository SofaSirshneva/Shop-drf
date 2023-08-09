import './App.css';
import {Fragment} from "react";
import Header from "./appHeader/Header";
import Home from "./appHome/Home";
import Slider from "./appSlider/Slider";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Product from './appProduct/Product';
import Category from './appCategory/Category';

function App() {
    return (
        <Router>
        <div>
            <Header/>
            <div style={{ display: 'flex'}}>
                <Slider/>
                <Routes>
                    <Route exact path='/' exact element={<Home />} />
                    <Route path='/product/:id' element={<Product/>} />
                    <Route path='/:name' element={<Category/>} />
                    {/* <Route path='/blogs' element={<Blogs/>} />
                    <Route path='/sign-up' element={<SignUp/>} /> */}
                </Routes>
            </div>
        </div>
        </Router>
    );
}

export default App;