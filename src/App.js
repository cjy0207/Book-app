import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import DetailPage from './pages/DetailPage/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path=":id" element={<DetailPage/>}></Route>
      <Route path="/search" element={<SearchPage/>}></Route>
    </Routes>
  );
}

export default App;
