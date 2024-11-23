import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AuthorSearchResults from "./components/AuthorSearchResults";
import BookSearchResults from "./components/BookSearchResults";

const SearchPage = () => {
  const [searchParams] = useSearchParams(); // URL에서 keyword 파라미터 읽기
  const keyword = searchParams.get("keyword") || ""; // 기본값은 빈 문자열
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const resultsPerPage = 4; // 페이지당 결과 개수

  return (
    <Container style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ marginBottom: "40px" }}>
        <AuthorSearchResults keyword={keyword} />
      </div>

      {/* 검색 결과: 책 */}
      <div style={{ marginTop: "40px" }}>
        <BookSearchResults
          keyword={keyword}
          currentPage={currentPage}
          resultsPerPage={resultsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Container>
  );
};

export default SearchPage;
