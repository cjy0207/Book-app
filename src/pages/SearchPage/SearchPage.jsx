import React, { useEffect, useState } from "react";
import { useSearchBookQuery } from "../../hooks/useSearchBook";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllAuthors, setShowAllAuthors] = useState(false); 
  const resultsPerPage = 4; 

  const keyword = searchParams.get("keyword") || "";

  const { data: bookResults, isLoading: isLoadingBooks, error: bookError } = useSearchBookQuery({ keyword });
  const { data: authorResults, isLoading: isLoadingAuthors, error: authorError } = useSearchBookQuery({
    keyword: `inauthor:${keyword}`,
  });

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

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

  const totalPages = Math.ceil((bookResults?.items?.length || 0) / resultsPerPage);

  const displayedResults = bookResults?.items?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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

      {(isLoadingBooks || isLoadingAuthors) ? (
        <Row>
          <Col>
            <p style={{ textAlign: "center" }}>Loading...</p>
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              {authorError && (
                <p style={{ textAlign: "center", color: "red" }}>
                  Error: {authorError.message}
                </p>
              )}
              {bookError && (
                <p style={{ textAlign: "center", color: "red" }}>
                  Error: {bookError.message}
                </p>
              )}
            </Col>
          </Row>

          {/* 작가 검색 결과 */}
          <Row>
            <Col>
              <h2>Author Search Results</h2>
              <p>Total Authors: {authorResults?.items?.length || 0}</p>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {(showAllAuthors ? authorResults?.items : authorResults?.items?.slice(0, 4))?.map(
                  (book, index) => {
                    const { authors, title } = book.volumeInfo;
                    return (
                      <li
                        key={`${book.id}-${index}`}
                        style={{
                          marginBottom: "10px",
                          borderBottom: "1px solid #ccc",
                          paddingBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src="https://via.placeholder.com/32x32?text=A"
                          alt="Author"
                          style={{
                            marginRight: "10px",
                            borderRadius: "50%",
                          }}
                        />
                        <p style={{ margin: "0" }}>
                          <strong>{authors?.[0] || "Unknown Author"}</strong> -{" "}
                          {title || "No Title Available"}
                        </p>
                      </li>
                    );
                  }
                )}
              </ul>
              {authorResults?.items?.length > 4 && (
                <p
                  onClick={() => setShowAllAuthors((prev) => !prev)}
                  style={{
                    cursor: "pointer",
                    color: "#007BFF",
                    textAlign: "center",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {showAllAuthors ? "작가 숨기기 ▲" : "작가 더 보기 ▼"}
                </p>
              )}
            </Col>
          </Row>

          {/* 작품 검색 결과 */}
          <Row>
            <Col>
              <h2>Book Search Results</h2>
              <p>Total Books: {bookResults?.items?.length || 0}</p>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {displayedResults?.map((book) => {
                  const {
                    title,
                    authors,
                    publisher,
                    publishedDate,
                    imageLinks,
                  } = book.volumeInfo;

                  return (
                    <li
                      key={book.id}
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "20px",
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "20px",
                        alignItems: "flex-start",
                      }}
                    >
                      <img
                        src={
                          imageLinks?.thumbnail ||
                          "https://via.placeholder.com/128x192?text=No+Image"
                        }
                        alt={title}
                        style={{
                          width: "128px",
                          height: "192px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <h3 style={{ margin: "0 0 10px" }}>
                          {title || "No Title Available"}
                        </h3>
                        <p style={{ margin: "0 0 5px" }}>
                          <strong>Authors:</strong>{" "}
                          {authors?.join(", ") || "Unknown Author"}
                        </p>
                        <p style={{ margin: "0 0 5px" }}>
                          <strong>Publisher:</strong>{" "}
                          {publisher || "Unknown Publisher"}
                        </p>
                        <p style={{ margin: "0 0 5px" }}>
                          <strong>Published:</strong>{" "}
                          {publishedDate || "Unknown Date"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>

          {/* Pagination */}
          <Row className="mt-4">
            <Col>
              <div style={paginationStyles.container}>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={paginationStyles.button}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    style={{
                      ...paginationStyles.page,
                      ...(currentPage === i + 1
                        ? paginationStyles.activePage
                        : {}),
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={paginationStyles.button}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

const paginationStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    gap: "10px",
  },
  button: {
    background: "none",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: "5px 10px",
    cursor: "pointer",
  },
  page: {
    background: "none",
    border: "1px solid #ccc",
    borderRadius: "50%",
    padding: "5px 10px",
    cursor: "pointer",
  },
  activePage: {
    background: "#007BFF",
    color: "white",
    border: "none",
  },
};

export default SearchPage;
