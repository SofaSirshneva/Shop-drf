import { Link } from "react-router-dom";

function handleKeyPress (e) {
    if(e.key === 'Enter'){
        let x = document.getElementById('search');
        window.location.href = `http://127.0.0.1:3000/search/?key=${x.value}`;
    }
   }

const Header = () => {

    return (
            <header className="p-3 text-bg-dark">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <p className="d-flex align-items-center mb-2 mb-lg-0 text-white">
                        <img src={`${process.env.REACT_APP_API_URL}/media/imp/mish.jpg`} alt='mish' width='80px'></img>
                    </p>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><h1 className="fs-2 px-3">Shop-DRF</h1></li>
                        <li><p className="nav-link px-2 text-white">Акции</p></li>
                    </ul>

                    <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input id="search" className="form-control" onKeyDown={handleKeyPress} placeholder="Поиск..." aria-label="Search" />
                    </div>

                    <div className="text-end">
                        <Link to='/cart'><button type="button" className="btn btn-warning">Корзина</button></Link>
                    </div>
                </div>
            </div>
        </header>
      )
}

export default Header;