import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from '../../components/CarouselImage';
import "./HomePage.css";

const Homepage = () => {
  const [books, setBooks] = useState([]); // API에서 가져온 책 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  const slides = [
    { id: 1, src: "/images/image1.jpg", alt: "Image 1"},
    { id: 2, src: "/images/image2.jpg", alt: "Image 2"},
    { id: 3, src: "/images/image3.jpg", alt: "Image 3"},
  ];

  // 구글 북스 API 호출
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=bestsellers&maxResults=12" // 12개의 책 데이터 요청
        );
        const data = await response.json();
        if (data.items) {
          setBooks(data.items); // 책 데이터 설정
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 슬라이더 설정
  const sliderSettings = {
    dots: true, // 하단 페이지 점 표시
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 전환 속도
    slidesToShow: 4, // 한 화면에 보여줄 책 개수
    slidesToScroll: 4, // 한 번에 스크롤할 책 개수
    responsive: [
      {
        breakpoint: 1024, // 화면 너비 1024px 이하
        settings: {
          slidesToShow: 3, // 한 화면에 3개씩 표시
          slidesToScroll: 3, // 한 번에 스크롤 3개
        },
      },
      {
        breakpoint: 768, // 화면 너비 768px 이하
        settings: {
          slidesToShow: 2, // 한 화면에 2개씩 표시
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // 화면 너비 480px 이하
        settings: {
          slidesToShow: 1, // 한 화면에 1개씩 표시
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
     <Carousel>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            {/* CarouselImage 컴포넌트로 이미지 렌더링 */}
            <CarouselImage src={slide.src} alt={slide.alt} />
            <Carousel.Caption>
              <h3>{slide.text}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h3>Bestsellers</h3>
      {loading ? (
        <p>Loading...</p> // 로딩 중일 때 표시
      ) : (
        <Slider {...sliderSettings}>
          {books.map((book) => (
            <div key={book.id} style={{ padding: "10px" }}>
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail || "/path/to/default.jpg"
                }
                alt={book.volumeInfo.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                {book.volumeInfo.title}
              </p>
            </div>
          ))}
        </Slider>
      )}

<h3>Bestsellers</h3>
      {loading ? (
        <p>Loading...</p> // 로딩 중일 때 표시
      ) : (
        <Slider {...sliderSettings}>
          {books.map((book) => (
            <div key={book.id} style={{ padding: "10px" }}>
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail || "/path/to/default.jpg"
                }
                alt={book.volumeInfo.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p style={{ textAlign: "center", marginTop: "10px" }}>
                {book.volumeInfo.title}
              </p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Homepage;
