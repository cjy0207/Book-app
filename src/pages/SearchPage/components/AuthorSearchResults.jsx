import React, { useState } from "react";
import { useSearchBookQuery } from "../../../hooks/useSearchBook";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const AuthorSearchResults = ({ keyword }) => {
  const navigate = useNavigate();
  const [showAllAuthors, setShowAllAuthors] = useState(false);

  const { data: authorResults, isLoading, error } = useSearchBookQuery({
    keyword: keyword ? `author:${keyword}` : "",
  });

  if (!keyword) return null;
  if (isLoading) 
    return <p style={{ textAlign: "center", color: "#007BFF" }}>저자 정보를 불러오는 중...</p>;
  if (error) 
    return <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>오류: {error.message}</p>;

  const authorsList = Array.from(
    new Map(
      authorResults?.items?.map((book) => [
        book.volumeInfo.authors?.[0],
        {
          name: book.volumeInfo.authors?.[0],
          title: book.volumeInfo.title,
          count: 0,
        },
      ])
    ).values()
  );

  authorsList.forEach((author) => {
    author.count = authorResults.items.filter(
      (item) => item.volumeInfo.authors?.[0] === author.name
    ).length;
  });

  const displayedAuthors = showAllAuthors ? authorsList : authorsList.slice(0, 4);

  return (
    <Row>
      <Col>
        <h2 style={{ marginBottom: "20px" }}>저자 검색 결과</h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          총 {authorsList.length}명
        </p>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {displayedAuthors.map((author, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
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
                  width: "32px",
                  height: "32px",
                  objectFit: "cover",
                }}
              />
              <div>
                <p
                  style={{
                    margin: 0,
                    cursor: "pointer",
                    color: "#a38958",
                    fontWeight: "bold",
                  }}
                  onClick={() =>
                    navigate(`/detail/author/${encodeURIComponent(author.name)}`)
                  }
                >
                  {author.name || "알 수 없는 저자"}
                </p>
                <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                  &lt;{author.title}&gt; 외 {author.count}권
                </p>
              </div>
            </li>
          ))}
        </ul>
        {authorsList.length > 4 && (
          <p
            onClick={() => setShowAllAuthors((prev) => !prev)}
            style={{
              cursor: "pointer",
              color: "#a38958",
              textAlign: "center",
              marginTop: "10px",
              fontWeight: "bold",
            }}
          >
            {showAllAuthors ? "저자 숨기기 ▲" : "저자 더 보기 ▼"}
          </p>
        )}
      </Col>
    </Row>
  );
};

export default AuthorSearchResults;
