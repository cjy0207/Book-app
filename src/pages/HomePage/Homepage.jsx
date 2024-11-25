import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../../components/CarouselImage';
import "./HomePage.css";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [recommendBooks, setRecommendBooks] = useState([]); // 추천 도서 상태 추가
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // useNavigate 훅 추가

  const slides = [
    { id:"TWBlEAAAQBAJ", src: "/images/image1.png", alt: "채식주의자" },
    { id:"jMtaDwAAQBAJ", src: "/images/image2.png", alt: "흰" },
    { id:"Q7uTBgAAQBAJ", src: "/images/image3.png", alt: "소년이 온다" },
  ];

  const handleBookClick = (id) => {
    navigate(`/detail/book/${id}`);
  };
  

  // Bestsellers API 호출
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=12"
        );
        const data = await response.json();
        if (data.items) {
          setBooks(data.items);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Recommend API 호출
  useEffect(() => {
    const fetchRecommendBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=12"
        );
        const data = await response.json();
        if (data.items) {
          setRecommendBooks(data.items);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
        setLoading(false);
      }
    };
    fetchRecommendBooks();
  }, []);

  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Carousel */}
      <Carousel className="Carousel">
        {slides.map((slide) => (
          <Carousel.Item key={slide.id} onClick={()=>handleBookClick(slide.id)}>
            <CarouselImage src={slide.src} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel>
      {/* Bestsellers Section */}
      <h5>Bestsellers</h5>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...sliderSettings} className="Slider">
  {books.map((book) => (
    <div
      key={book.id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={() => handleBookClick(book.id)}
    >
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail || "/path/to/default.jpg"
        }
        alt={book.volumeInfo.title}
        style={{
          width: "200px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "15px",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {book.volumeInfo.title}
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#777",
        }}
      >
        {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
      </p>
    </div>
  ))}
</Slider>

      )}

      {/* Recommend Section */}
      <h5>Recommend</h5>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Slider {...sliderSettings} className="Slider">
  {recommendBooks.map((book) => (
    <div
      key={book.id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={() => handleBookClick(book.id)}
    >
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail || "/path/to/default.jpg"
        }
        alt={book.volumeInfo.title}
        style={{
          width: "200px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "15px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {book.volumeInfo.title}
      </p>
      <p
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#777",
        }}
      >
        {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
      </p>
    </div>
  ))}
</Slider>

      )}

<Footer />
    </div>
  );
};

export default HomePage;
