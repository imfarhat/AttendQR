import React from "react";

function Header() {
  return (
    <header>
      <nav>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-n"
        >
          <img
            src="https://raw.githubusercontent.com/imfarhat/AttendQR/main/public/apple-touch-icon.png"
            alt="AttendQR Logo"
            className="h-12 rounded shadow-sm"
          />
        </a>

        <a
          href="https://farhateservices.pages.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link-n"
        >
          <img
            src="https://farhateservices.pages.dev/logo-head-black.png"
            alt="Farhat e Services & Assitance"
            className="h-12 rounded shadow-sm bg-white"
          />
        </a>
      </nav>
    </header>
  );
}

export default Header;
