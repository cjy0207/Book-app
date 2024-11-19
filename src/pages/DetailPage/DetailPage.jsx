import React from "react";
import { useParams } from "react-router-dom";
import { useBookDetailQuery } from "../../hooks/useBookDetail";
import { Container, Row, Col, Button } from "react-bootstrap";

const DetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useBookDetailQuery({ id });

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>;

  if (!data || !data.volumeInfo) {
    return <p style={{ textAlign: "center" }}>No data found for the selected book.</p>;
  }

  const {
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    averageRating,
    ratingsCount,
    language,
    imageLinks,
  } = data.volumeInfo;

  return (
    <Container style={{ fontFamily: "Arial, sans-serif", padding: "40px 20px" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={4} style={{ textAlign: "center" }}>
          <img
            src={imageLinks?.thumbnail || "https://via.placeholder.com/200x300?text=No+Image"}
            alt={title || "Book Thumbnail"}
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
            {title || "No Title Available"}
          </h1>
          {subtitle && (
            <h2 style={{ fontSize: "18px", fontWeight: "normal", marginBottom: "20px", color: "#666" }}>
              {subtitle}
            </h2>
          )}
          <p><strong>Authors:</strong> {authors ? authors.join(", ") : "Unknown Authors"}</p>
          <p><strong>Publisher:</strong> {publisher || "No Publisher Available"}</p>
          <p><strong>Published Date:</strong> {publishedDate || "No Date Available"}</p>
          <p><strong>Page Count:</strong> {pageCount || "No Page Count Available"}</p>
          <p><strong>Categories:</strong> {categories ? categories.join(", ") : "No Categories Available"}</p>
          <p><strong>Average Rating:</strong> {averageRating || "No Rating Available"}</p>
          <p><strong>Ratings Count:</strong> {ratingsCount || "No Ratings Available"}</p>
          <p><strong>Language:</strong> {language || "No Language Info Available"}</p>
          <p style={{ marginTop: "20px", color: "#666" }}>
            {description
              ? description.length > 300
                ? description.substring(0, 300) + "..."
                : description
              : "No description available."}
          </p>
          <Button variant="outline-secondary" style={{ marginTop: "20px", padding: "10px 20px" }}>
            Add to Basket
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPage;
