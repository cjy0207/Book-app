import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const hideBanner = location.pathname === "/Basket";

  const [searchInput, setSearchInput] = useState(""); // 검색창 입력 상태
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const trimmedInput = searchInput.trim();
    if (trimmedInput) {
      navigate(`/search?keyword=${encodeURIComponent(trimmedInput)}`); // 검색 페이지로 이동
      setSearchInput(""); // 검색어 초기화
    }
  };

  const [showScrollButton, setShowScrollButton] = useState(false); // Added useState hook

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <div>
      {!hideBanner && (
        <header className="header">
          <div className="header-main">
            <div className="header-top">
              <p>SHOP FINDER</p>
              <p>ACCOUNT | JOIN | WISH LIST | BASKET</p>
            </div>
            <h1 className="logo">DEMOBOOKS</h1>
          </div>

          <nav className="navbar">
            <div>
              <button className="nav-button">NEW</button>
              <button className="nav-button">TOP</button>
              <button className="nav-button">BOOKS</button>
            </div>
            {/* 검색창 */}
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Search books..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </nav>
        </header>
      )}
      <main>
        <Outlet />
      </main>

      {showScrollButton ? (
        <Button
          onClick={handleScrollToTop}
          style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgb(163, 137, 88, 0.7)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            border: 'none',
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      ) : null }

    </div>
  );
};

export default Layout;
