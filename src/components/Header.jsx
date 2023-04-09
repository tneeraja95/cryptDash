import icon from '../icons/cryptDash.jpeg';
import './Header.css';

function Header() {
  return (
    <div className='header'>
      <img src={icon} alt="header_logo" />
      <span>Crypt Dash</span>
    </div>
  )
}

export default Header
