import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookDetailPage from './pages/DetailPage/BookDetailPage';
import AuthorDetailPage from './pages/DetailPage/AuthorDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />}/>

        <Route path="/search" element={<SearchPage />} />

        <Route path="/detail">
          <Route path="book/:id" element={<BookDetailPage />} />
          <Route path="author/:author" element={<AuthorDetailPage />} />
        </Route> 
      </Route>
    </Routes>
  );
}

export default App;
