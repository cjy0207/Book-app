import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGoogleBooksCategory } from "../../hooks/useGoogleBooksCategory";

const CategoryPage = () => {
  const { category } = useParams();
  const { data: books, isLoading, error } = useGoogleBooksCategory(category);
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 10; 
  const navigate = useNavigate(); 

  if (isLoading) {
    return <p style={{ textAlign: "center", color: "#a38958" }}>Loading books...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>;
  }

  if (!books || books.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#666" }}>
        "{category}"에 대한 책이 없습니다.
      </p>
    );
  }

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBooks = books.slice(startIndex, startIndex + itemsPerPage);

  
  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{category} Books</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {displayedBooks.map((book) => {
          const { id, volumeInfo } = book;
          const { title, authors, imageLinks } = volumeInfo;

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
              </div>
            </li>
          );
        })}
      </ul>

      {totalPages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              backgroundColor: currentPage === 1 ? "#ccc" : "#a38958",
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
              onClick={() => handlePageChange(index + 1)}
              style={{
                padding: "5px 10px",
                margin: "0 5px",
                cursor: "pointer",
                backgroundColor: currentPage === index + 1 ? "#a38958" : "white",
                color: currentPage === index + 1 ? "white" : "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              backgroundColor: currentPage === totalPages ? "#ccc" : "#a38958",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
