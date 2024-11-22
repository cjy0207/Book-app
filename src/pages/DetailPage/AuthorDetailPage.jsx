import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthorDetailQuery } from "../../hooks/useAuthorDetail";
import { Container, Row, Col } from "react-bootstrap";

const AuthorDetailPage = () => {
  const { author } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useAuthorDetailQuery(author);

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>;

  return (
    <Container style={{ padding: "40px 20px" }}>
      <Row>
        <Col>
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Books by {author}</h1>
          {data?.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {data.map((book) => {
                const { id, volumeInfo } = book;
                const { title, imageLinks, description, publisher, publishedDate } = volumeInfo;

                const shortDescription = description
                  ? description.length > 150
                    ? `${description.slice(0, 150)}...`
                    : description
                  : "No description available.";

                const publisherInfo = publisher || "Unknown Publisher";
                const publishedInfo = publishedDate || "Unknown Date";

                return (
                  <li
                    key={id}
                    onClick={() => navigate(`/detail/book/${id}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginBottom: "20px",
                      cursor: "pointer",
                      padding: "10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <img
                      src={
                        imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x192?text=No+Image"
                      }
                      alt={title || "No Title"}
                      style={{
                        width: "128px",
                        height: "192px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                    <div>
                      <h5 style={{ marginBottom: "10px" }}>{title || "No Title Available"}</h5>
                      <p style={{ marginBottom: "5px" }}>
                        <strong>Publisher:</strong> {publisherInfo}
                      </p>
                      <p style={{ marginBottom: "5px" }}>
                        <strong>Published Date:</strong> {publishedInfo}
                      </p>
                      <p style={{ fontSize: "14px", color: "#666" }}>{shortDescription}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ textAlign: "center" }}>No books found for this author.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthorDetailPage;
