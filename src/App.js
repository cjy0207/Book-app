import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import Layout from "./components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import BookDetailPage from './pages/DetailPage/BookDetailPage';
import AuthorDetailPage from './pages/DetailPage/AuthorDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />

      <Route path="/detail">
        <Route path="book/:id" element={<BookDetailPage />} />
        <Route path="author/:author" element={<AuthorDetailPage />} />
        
      </Route>
    </Routes>
  );
}

export default App;