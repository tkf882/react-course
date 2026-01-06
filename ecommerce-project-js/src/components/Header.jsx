import { Link, NavLink, useNavigate, useSearchParams} from 'react-router';
import { useState } from 'react';
import './Header.css';

import MobileLogoWhite from '../assets/images/mobile-logo-white.png';
import LogoWhite from '../assets/images/logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';


export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchP = searchParams.get('search');

  const [search, setSearch] = useState(searchP || '');
 
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  })

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  const searchProducts = () => {
    navigate(`/?search=${search}`)
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo"
              src={LogoWhite} />
            <img className="mobile-logo"
              src={MobileLogoWhite} />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search"
            onChange={updateSearch}
          />
          <button className="search-button" 
            onClick={searchProducts}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}