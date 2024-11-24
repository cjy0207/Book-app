import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useBookDetailQuery } from "../../hooks/useBookDetail";
import { useGoogleBooksCategory } from "../../hooks/useGoogleBooksCategory";
import { useSearchBookQuery } from "../../hooks/useSearchBook";
import { Container, Row, Col, Button } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const { data, isLoading, error } = useBookDetailQuery({ id });
  const [showFullDescription, setShowFullDescription] = useState(false);
  console.log("data", data)

  const category = data?.volumeInfo?.categories?.[0] || "";
  const {
    data: recommendedBooks,
    isLoading: isLoadingRecommendations,
    error: recommendationsError,
  } = useGoogleBooksCategory(category);

  const author = data?.volumeInfo?.authors?.[0] || "";
  const {
    data: authorBooks,
    isLoading: isLoadingAuthorBooks,
    error: authorBooksError,
  } = useSearchBookQuery({ keyword: `author:${author}`, resultsPerPage: 10 });

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>;

  if (!data || !data.volumeInfo) {
    return <p style={{ textAlign: "center" }}>No data found for the selected book.</p>;
  }

  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    imageLinks,
    categories,
    pageCount,
  } = data.volumeInfo;

  const { saleInfo } = data;

  const cleanDescription = description ? description.replace(/<[^>]+>/g, "") : "";

  const isDescriptionLong = cleanDescription?.length > 500;
  const visibleDescription = isDescriptionLong && !showFullDescription
    ? `${cleanDescription.slice(0, 500)}...`
    : cleanDescription;

  const handleToggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const price = saleInfo?.retailPrice
    ? `${saleInfo.retailPrice.amount} ${saleInfo.retailPrice.currencyCode}`
    : "Price not available";

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 4 },
    desktop: { breakpoint: { max: 1024, min: 768 }, items: 3 },
    tablet: { breakpoint: { max: 768, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Container style={{ padding: "40px 20px" }}>
      <Row>
        <Col md={4} style={{ textAlign: "center" }}>
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
        <Col md={8}>
          <h1>{title || "No Title Available"}</h1>
          <p><strong>Authors:</strong> {authors?.join(", ") || "Unknown Authors"}</p>
          <p><strong>Publisher:</strong> {publisher || "Unknown Publisher"}</p>
          <p><strong>Published Date:</strong> {publishedDate || "Unknown Date"}</p>
          <p><strong>Categories:</strong> {categories?.join(", ") || "No Categories Available"}</p>
          <p><strong>Page Count:</strong> {pageCount || "Unknown Page Count"}</p>
          <p><strong>Price:</strong> {price}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="mt-4">
          <h2>Book Description</h2>
          <div style={{ marginTop: "20px", color: "#666" }}>
            <p style={{ textAlign: "justify" }}>{visibleDescription}</p>
            {isDescriptionLong && (
              <Button
                variant="link"
                onClick={handleToggleDescription}
                style={{
                  padding: 0,
                  fontSize: "16px",
                  marginTop: "10px",
                  color: "#a38958",
                  fontWeight: "bold",
                }}
              >
                {showFullDescription ? "Show Less ▲" : "Show More ▼"}
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="mt-4">
          <h2>
            Other Books by Author
            <Button
              variant="link"
              style={{ float: "right", fontSize: "14px", padding: 0, color:"#a38958" }}
              onClick={() => navigate(`/detail/author/${encodeURIComponent(author)}`)}
            >
              View All
            </Button>
          </h2>
          {isLoadingAuthorBooks ? (
            <p>Loading other books by this author...</p>
          ) : authorBooksError ? (
            <p>Error loading author's books: {authorBooksError.message}</p>
          ) : authorBooks?.items?.length > 0 ? (
            <Carousel responsive={responsive} infinite={true} keyBoardControl={true}>
              {authorBooks.items.map((book) => (
                <div
                  key={book.id}
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => navigate(`/detail/book/${book.id}`)} 
                >
                  <div
                    style={{
                      textAlign: "center",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/150x200?text=No+Image"
                      }
                      alt={book.volumeInfo.title || "Book Image"}
                      style={{ width: "100%", maxWidth: "150px", margin: "0 auto" }}
                    />
                    <h5 style={{ marginTop: "10px", fontSize: "14px", textAlign: "center" }}>
                      {book.volumeInfo.title || "No Title"}
                    </h5>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No other books by this author found.</p>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Recommended Books</h2>
          {isLoadingRecommendations ? (
            <p>Loading recommended books...</p>
          ) : recommendationsError ? (
            <p>Error loading recommendations: {recommendationsError.message}</p>
          ) : recommendedBooks?.length > 0 ? (
            <Carousel responsive={responsive} infinite={true} keyBoardControl={true}>
              {recommendedBooks.map((book) => (
                <div
                  key={book.id}
                  style={{ padding: "10px", cursor: "pointer" }}
                  onClick={() => navigate(`/detail/book/${book.id}`)}
                >
                  <div
                    style={{
                      textAlign: "center",
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={
                        book.volumeInfo.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/150x200?text=No+Image"
                      }
                      alt={book.volumeInfo.title || "Book Image"}
                      style={{ width: "100%", maxWidth: "150px", margin: "0 auto" }}
                    />
                    <h5 style={{ marginTop: "10px", fontSize: "14px", textAlign: "center" }}>
                      {book.volumeInfo.title || "No Title"}
                    </h5>
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No recommended books found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetailPage;
