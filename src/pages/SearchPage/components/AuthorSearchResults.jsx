import React, { useState } from "react";
import { useSearchBookQuery } from "../../../hooks/useSearchBook";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const AuthorSearchResults = ({ keyword }) => {
  const navigate = useNavigate();

  const { data: authorResults, isLoading, error } = useSearchBookQuery({
    keyword: keyword ? `author:${keyword}` : "", 
  });

  const [showAllAuthors, setShowAllAuthors] = useState(false);

  if (!keyword) return null;
  if (isLoading) return <p>저자 정보를 불러오는 중...</p>;
  if (error) return <p style={{ color: "red" }}>오류: {error.message}</p>;

  const authorsList =
    authorResults?.items?.map((book) => ({
      name: book.volumeInfo.authors?.[0],
      title: book.volumeInfo.title,
      count: authorResults.items.filter(
        (item) => item.volumeInfo.authors?.[0] === book.volumeInfo.authors?.[0]
      ).length,
    })) || [];

  const uniqueAuthors = Array.from(
    new Map(authorsList.map((item) => [item.name, item])).values()
  );

  const displayedAuthors = showAllAuthors ? uniqueAuthors : uniqueAuthors.slice(0, 4);

  return (
    <Row>
      <Col>
        <h2 style={{ marginBottom: "20px" }}>저자 검색 결과</h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          총 {uniqueAuthors.length}명
        </p>
        {uniqueAuthors.length ? (
          <>
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
                        color: "#007BFF",
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
            {uniqueAuthors.length > 4 && (
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
                {showAllAuthors ? "저자 숨기기 ▲" : "저자 더 보기 ▼"}
              </p>
            )}
          </>
        ) : (
          <p>"{keyword}"에 대한 저자 검색 결과가 없습니다.</p>
        )}
      </Col>
    </Row>
  );
};

export default AuthorSearchResults;
