import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import AuthorSearchResults from "./components/AuthorSearchResults";
import BookSearchResults from "./components/BookSearchResults";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = searchParams.get("keyword") || "";
  const resultsPerPage = 4;

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchParams({ keyword: input });
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <Row className="mb-4">
        <Col>
          <h1 style={{ textAlign: "center" }}>Book and Author Search</h1>
        </Col>
      </Row>

      <Row className="mb-4" style={{ textAlign: "center" }}>
        <Col md={8} className="mx-auto">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Search for books or authors..."
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </Col>
        <Col md="auto">
          <Button
            onClick={handleSearch}
            style={{
              fontSize: "16px",
              backgroundColor: "#007BFF",
              borderColor: "#007BFF",
            }}
          >
            Search
          </Button>
        </Col>
      </Row>

      <div style={{ marginBottom: "40px" }}>
        <AuthorSearchResults keyword={keyword} />
      </div>

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
