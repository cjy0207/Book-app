import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AuthorSearchResults from "./components/AuthorSearchResults";
import BookSearchResults from "./components/BookSearchResults";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;
  return (
    <Container style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ marginBottom: "40px" }}>
        <BookSearchResults
          keyword={keyword}
          currentPage={currentPage}
          resultsPerPage={resultsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <div style={{ marginTop: "40px" }}>
        <AuthorSearchResults keyword={keyword} />
      </div>
    </Container>
  );
};

export default SearchPage;
