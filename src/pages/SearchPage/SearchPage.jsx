import React, { useState } from "react";
import { useSearchBookQuery } from "../../hooks/useSearchBook";

const SearchPage = () => {
  const [input, setInput] = useState(""); 
  const [keyword, setKeyword] = useState(""); 

  const { data, isLoading, error } = useSearchBookQuery({ keyword });
  console.log("search", data);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(input); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Book Search</h1>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for books..."
          style={{
            width: "80%",
            maxWidth: "500px",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </div>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>Error: {error.message}</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {data?.items?.map((book) => {
          const {
            title,
            authors,
            publisher,
            publishedDate,
            categories,
            description,
            averageRating,
            ratingsCount,
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
                style={{ width: "128px", height: "192px", objectFit: "cover" }}
              />

              <div>
                <h3 style={{ margin: "0 0 10px" }}>
                  {title || "No Title Available"}
                </h3>

                <p style={{ margin: "0 0 5px" }}>
                  <strong>Authors:</strong> {authors?.join(", ") || "Unknown Author"}
                </p>
                <p style={{ margin: "0 0 5px" }}>
                  <strong>Publisher:</strong> {publisher || "Unknown Publisher"}
                </p>
                <p style={{ margin: "0 0 10px" }}>
                  <strong>Published:</strong> {publishedDate || "Unknown Year"}
                </p>

                <p style={{ margin: "0 0 10px" }}>
                  <strong>Categories:</strong>{" "}
                  {categories?.join(", ") || "No Categories Listed"}
                </p>

                <p style={{ margin: "0 0 10px" }}>
                  <strong>Description:</strong>{" "}
                  {description
                    ? description.length > 100
                      ? description.substring(0, 100) + "..."
                      : description
                    : "No description available."}
                </p>

                <p style={{ margin: "0" }}>
                  <strong>Rating:</strong>{" "}
                  {averageRating
                    ? `${averageRating} / 5 (${ratingsCount || 0} ratings)`
                    : "No ratings available"}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchPage;
