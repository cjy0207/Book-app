import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGoogleBooksCategory } from "../hooks/useGoogleBooksCategory";
import "./Layout.css";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const hideBanner = location.pathname === "/Basket";

  const [category, setCategory] = useState("Fiction");
  const [showCategories, setShowCategories] = useState(false);
  const { data, isLoading, isError, error } = useGoogleBooksCategory(category);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowCategories(false); // Close dropdown after selecting a category
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to home
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.error("Error:", error);
    return <h1>Error occurred</h1>;
  }

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    if (searchQuery.trim() === "") {
      alert("검색어를 입력해주세요!");
      return;
    }
    navigate(`/search?keyword=${encodeURIComponent(searchQuery)}`); // Navigate to SearchPage with query
  };

  return (
    <div>
      {!hideBanner && (
        <header className="header">
          <div className="header-main">
            <div className="header-top">
              <p>SHOP FINDER</p>
              <div className="header-buttons">
                <button className="header-button">ACCOUNT</button> |{" "}
                <button
                  className="header-button"
                  onClick={() => setShowModal(true)}
                >
                  JOIN
                </button>{" "}
                | <button className="header-button">WISH LIST</button> |{" "}
                <button className="header-button">BASKET</button>
              </div>
            </div>
            <h1 onClick={handleLogoClick} className="logo">
              DEMOBOOKS
            </h1>
          </div>

          {/* Navigation */}
          <nav className="navbar">
            <div>
              <button className="nav-button">NEW</button>
              <button className="nav-button">TOP</button>
              <button
                className="nav-button"
                onClick={() => setShowCategories(!showCategories)}
              >
                BOOKS
              </button>
            </div>
            {/* Search bar */}
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state
              />
              <button className="search-button" type="submit">
                Search
              </button>
            </form>
          </nav>
          {/* Category dropdown */}
          {showCategories && (
            <div className="category-dropdown">
              <button
                className="category-item"
                onClick={() => handleCategoryChange("Fiction")}
              >
                Fiction
              </button>
              <button
                className="category-item"
                onClick={() => handleCategoryChange("Non-fiction")}
              >
                Non-fiction
              </button>
              <button
                className="category-item"
                onClick={() => handleCategoryChange("Mystery")}
              >
                Mystery
              </button>
              <button
                className="category-item"
                onClick={() => handleCategoryChange("Science Fiction")}
              >
                Science Fiction
              </button>
            </div>
          )}
        </header>
      )}
      <main>
        <Outlet />
      </main>

      {/* Login Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>이메일 주소</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            닫기
          </Button>
          <Button
            style={{ backgroundColor: "#a38958", borderColor: "#a38958" }}
            onClick={() => alert("로그인 처리!")}
          >
            로그인
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default Layout;
