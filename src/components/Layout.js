import React,{ useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useGoogleBooksCategory } from "../hooks/useGoogleBooksCategory";
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const hideBanner = location.pathname === "/Basket";

  const [category, setCategory] = useState("Fiction");
  const [showCategories, setShowCategories] = useState(false);
  const { data, isLoading, isError, error } = useGoogleBooksCategory(category);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowCategories(false); // 카테고리 선택 후 드롭다운 닫기
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.error("Error:", error);
    return <h1>Error occurred</h1>;
  }

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
          
          {/* 네비게이션 */}
          <nav className="navbar">
            <div>
              <button className="nav-button">NEW</button>
              <button className="nav-button">TOP</button>
              <button className="nav-button" onClick={() => setShowCategories(!showCategories)}>BOOKS</button>
            </div>
            {/* 검색창 */}
            <form>
              <input type="text" className="search-input" placeholder="Search books..." />
              <button className="search-button">Search</button>
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
    </div>
  );
};

export default Layout;
