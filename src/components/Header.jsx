import icon from '../icons/cryptDash.jpeg';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Link to="/" className='header'>
      <img src={icon} alt="header_logo" />
      <span>Crypt Dash</span>
    </Link>
  )
}

export default Header
