import React,{ useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Outlet, useLocation,Link } from "react-router-dom";
import { useGoogleBooksCategory } from "../hooks/useGoogleBooksCategory";
import "./Layout.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const hideBanner = location.pathname === "/Basket";

  const [category, setCategory] = useState("Fiction");
  const [showCategories, setShowCategories] = useState(false);
  const { data, isLoading, isError, error } = useGoogleBooksCategory(category);
  const [searchQuery, setSearchQuery]=useState("");
  const navigate=useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowCategories(false); // 카테고리 선택 후 드롭다운 닫기
  };

  const handleLogoClick = () => {
    navigate('/'); // 홈 경로로 이동
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.error("Error:", error);
    return <h1>Error occurred</h1>;
  }

  const handleSearch=()=>{
    if(searchQuery.trim()===""){
      alert("검색어를 입력해주세요!")
      return;
    }

    if(searchQuery.toLowerCase().includes("author:")){
      const authorName=searchQuery.replace("author:","").trim();
      navigate(`/search?type=author&query=${encodeURIComponent(authorName)}`)
    }

    else{
      navigate(`/search?type=book&query=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div>
      {!hideBanner && (
        <header className="header">
         <div className="header-main">
            <div className="header-top">
                <p>SHOP FINDER</p>
                <div className="header-buttons">
                  <button className="header-button">ACCOUNT</button>
                  |
                  <button className="header-button" onClick={() => setShowModal(true)}>JOIN</button>
                  |
                  <button className="header-button">WISH LIST</button>
                  |
                  <button className="header-button">BASKET</button>
                </div>
            </div>
            <h1 onClick={handleLogoClick} className="logo">DEMOBOOKS</h1>
         </div>
          
          {/* 네비게이션 */}
          <nav className="navbar">
            <div>
              <button className="nav-button">NEW</button>
              <button className="nav-button">TOP</button>
              <button className="nav-button" onClick={() => setShowCategories(!showCategories)}>BOOKS</button>
            </div>
            {/* 검색창 */}
            <form>
            <input
              type="text"
              className="search-input"
              placeholder="Search books..."
              value={searchQuery} // 입력값 상태로 관리
              onChange={(e) => setSearchQuery(e.target.value)} // 상태 업데이트
            />
            <button
              className="search-button"
              type="button"
              onClick={handleSearch} // 검색 버튼 클릭 시 handleSearch 호출
            >
              Search
            </button>
            </form>
          </nav>
          {/* 카테고리 드롭다운 */}
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

      {/* 로그인 모달 */}
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
            style={{ backgroundColor: '#a38958', borderColor: '#a38958' }} 
            onClick={() => alert("로그인 처리!")}
          >
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Layout;
