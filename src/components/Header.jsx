import icon from '../icons/cryptDash.jpeg';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Link to="/" className='header'>
      <img src={icon} alt="header_logo" />
      <div>Crypt Dash</div>
    </Link>
  )
}

export default Header
