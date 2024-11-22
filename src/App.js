import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
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