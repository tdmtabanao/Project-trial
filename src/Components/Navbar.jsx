import logo from '@/assets/logo-dark.png';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { useContext } from 'react';
import UserContext from '@/Context/UserContext';

function Navbar() {
  const { user, logOut } = useContext(UserContext);

  const LogoutButton = () => {
    const handleLogout = () => {
      logOut();
    };

    return (
      <button
        type="button"
        className="dropdown-item h-full text-danger fw-semibold"
        onClick={handleLogout}
      >
        Log Out
      </button>
    );
  };

  const LoginButton = () => {
    if (user !== null) {
      return <LogoutButton />;
    }

    return (
      <NavLink className="dropdown-item h-full" to="/login">
        Log In
      </NavLink>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-light">
      <div className="container-fluid px-5">
        <NavLink className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Adolfo-Eraldo Home Furnishing"
            width="64"
            height="64"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-md-auto gap-2">
            <li className="nav-item rounded">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item rounded">
              <NavLink className="nav-link" to="/testimonials">
                Testimonials
              </NavLink>
            </li>
            <li className="nav-item rounded">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item rounded">
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </li>

            <li className="nav-item dropdown rounded">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <NavLink className="dropdown-item" to="/account">
                    Account
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <LoginButton />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;