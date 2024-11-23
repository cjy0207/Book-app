import React from "react";
import { useSearchBookQuery } from "../../../hooks/useSearchBook";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const BookSearchResults = ({ keyword, currentPage, resultsPerPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const { data: bookResults, isLoading, error } = useSearchBookQuery({ keyword });

  if (!keyword) return null; // 키워드가 없으면 컴포넌트를 렌더링하지 않음
  if (isLoading)
    return <p style={{ textAlign: "center", color: "#007BFF" }}>책 정보를 불러오는 중...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>오류: {error.message}</p>;

  const totalResults = bookResults?.items?.length || 0;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const displayedResults = bookResults?.items?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <Row>
      <Col>
        <h2 style={{ marginBottom: "20px" }}>책 검색 결과</h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          <strong>총 검색 결과:</strong> {totalResults}권
        </p>
        {displayedResults?.length ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {displayedResults.map((book) => {
              const { id, volumeInfo } = book;
              const {
                title,
                authors,
                publisher,
                publishedDate,
                description,
                imageLinks,
              } = volumeInfo;

              const shortDescription = description
                ? description.length > 150
                  ? `${description.slice(0, 150)}...`
                  : description
                : "설명이 없습니다.";

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
                    alt={title || "No Title"}
                    style={{
                      width: "128px",
                      height: "192px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <h3>{title || "제목 없음"}</h3>
                    <p>
                      <strong>저자:</strong> {authors?.join(", ") || "알 수 없음"}
                    </p>
                    <p>
                      <strong>출판사:</strong> {publisher || "알 수 없음"}
                    </p>
                    <p>
                      <strong>출판일:</strong> {publishedDate || "알 수 없음"}
                    </p>
                    <p style={{ fontSize: "14px", color: "#666" }}>{shortDescription}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            "{keyword}"에 대한 책 검색 결과가 없습니다.
          </p>
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: "5px 10px",
                margin: "0 5px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                backgroundColor: currentPage === 1 ? "#ccc" : "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              이전
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
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                backgroundColor: currentPage === totalPages ? "#ccc" : "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              다음
            </button>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default BookSearchResults;
