import React, { useState } from "react";
import { useGoogleBooksCategory } from "../../hooks/useGoogleBooksCategory";

const Homepage = () => {
  const [category, setCategory] = useState("Fiction"); 
  const { data, isLoading, isError, error } = useGoogleBooksCategory(category);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value); 
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.error("Error:", error);
    return <h1>Error occurred</h1>;
  }

  console.log("Books in Category:", category, data);

  return (
    <div>
      <h1>Google Books Category Search</h1>
      <label htmlFor="category">Choose a category:</label>
      <select id="category" onChange={handleCategoryChange} value={category}>
        <option value="Fiction">Fiction</option>
        <option value="Computers">Computers</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        <option value="Art">Art</option>
      </select>

      <div>
        {data && data.length > 0 ? (
          <ul>
            {data.map((book) => (
              <li key={book.id}>
                <h2>{book.volumeInfo.title}</h2>
                <p>Author: {book.volumeInfo.authors?.join(", ")}</p>
                <p>{book.volumeInfo.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;