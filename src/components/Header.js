import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media col-lg-12">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <a className="navbar-brand" href="/"><h5>Yöntem Bilimsel Analiz</h5></a>
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${active === "home" ? "active" : ""
                      }`}
                    onClick={() => setActive("home")}
                  >
                    <h6>Ana Sayfa</h6>
                  </li>
                </Link>

                <Link to="/create" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${active === "create" ? "active" : ""
                      }`}
                    onClick={() => setActive("create")}
                  >
                    <h6>Tablo Oluştur</h6>
                  </li>
                </Link>

                <Link to="/forum" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${active === "forum" ? "active" : ""
                      }`}
                    onClick={() => setActive("forum")}
                  >
                    <h6>Forum</h6>
                  </li>
                </Link>
                <Link to="/about" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${active === "about" ? "active" : ""
                      }`}
                    onClick={() => setActive("about")}
                  >
                    <h6>Yöntembilim Nedir?</h6>
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo" style={{ marginTop: '5px' }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="logo"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "15px",
                          }}
                        />
                      </div>
                      <h6 style={{ marginTop: "15px", marginLeft: "5px", }}>
                        Merhaba, {user?.displayName}
                      </h6>
                      <li className="nav-item nav-link" onClick={handleLogout}>
                        <p>Çıkış</p>
                      </li>
                    </>
                  ) : (
                    <Link to="/auth" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${active === "login" ? "active" : ""
                          }`}
                        onClick={() => setActive("login")}
                      >
                        Giriş Yap
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;
