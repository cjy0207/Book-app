import React, { useState } from "react";
import { useSearchBookQuery } from "../../hooks/useSearchBook";

const SearchPage = () => {
  const [input, setInput] = useState(""); // 검색 입력값
  const [keyword, setKeyword] = useState(""); // 실제 검색어

  const { data, isLoading, error } = useSearchBookQuery({ keyword });
    console.log("search", data)
  // 입력 필드 업데이트
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // 검색 실행
  const handleSearch = () => {
    setKeyword(input); // 입력값을 검색어로 설정
  };

  // Enter 키로 검색 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h1>Book Search</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for books..."
          style={{ width: "80%", padding: "10px", fontSize: "16px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data?.items?.map((book) => {
          const {
            title,
            authors,
            publisher,
            publishedDate,
            categories,
            description,
            averageRating,
            ratingsCount,
            imageLinks,
          } = book.volumeInfo;

          return (
            <li key={book.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
              {/* 이미지 */}
              <img
                src={imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image"}
                alt={title}
                style={{ width: "128px", height: "192px", marginBottom: "10px" }}
              />

              {/* 책 제목 */}
              <h3>{title || "No Title Available"}</h3>

              {/* 작가 / 출간 년도 / 출판사 */}
              <p>
                {authors?.join(", ") || "Unknown Author"} | {publishedDate || "Unknown Year"} |{" "}
                {publisher || "Unknown Publisher"}
              </p>

              {/* 카테고리 */}
              <p>Categories: {categories?.join(", ") || "No Categories Listed"}</p>

              {/* 줄거리 */}
              <p>Description: {description || "No description available."}</p>

              {/* 별점 */}
              <p>
                Rating:{" "}
                {averageRating
                  ? `${averageRating} / 5 (${ratingsCount || 0} ratings)`
                  : "No ratings available"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchPage;
