import React from "react";
import { useSearchBookQuery } from "../../../hooks/useSearchBook";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const BookSearchResults = ({ keyword, currentPage, resultsPerPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const { data: bookResults, isLoading, error } = useSearchBookQuery({ keyword });

  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  const totalResults = bookResults?.items?.length || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const displayedResults = bookResults?.items?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <Row>
      <Col>
        <h2>Book Search Results</h2>
        <p style={{ marginBottom: "20px" }}>
          <strong>Total Results:</strong> {totalResults}
        </p>
        {displayedResults?.length ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {displayedResults.map((book) => {
              const { id, volumeInfo } = book;
              const { title, authors, publisher, publishedDate, description, imageLinks } = volumeInfo;

              const shortDescription = description
                ? description.length > 150
                  ? `${description.slice(0, 150)}...`
                  : description
                : "No description available.";

              return (
                <li
                  key={id}
                  onClick={() => navigate(`/detail/book/${id}`)}
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "20px",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Image"}
                    alt={title}
                    style={{
                      width: "128px",
                      height: "192px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h3>{title || "No Title Available"}</h3>
                    <p>
                      <strong>Authors:</strong> {authors?.join(", ") || "Unknown Author"}
                    </p>
                    <p>
                      <strong>Publisher:</strong> {publisher || "Unknown Publisher"}
                    </p>
                    <p>
                      <strong>Published Date:</strong> {publishedDate || "Unknown Date"}
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>{shortDescription}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No books found for "{keyword}".</p>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              cursor: "pointer",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                padding: "5px 10px",
                margin: "0 5px",
                cursor: "pointer",
                backgroundColor: currentPage === index + 1 ? "#007BFF" : "white",
                color: currentPage === index + 1 ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              cursor: "pointer",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Next
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default BookSearchResults;
