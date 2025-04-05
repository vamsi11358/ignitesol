
import './App.css'
import CategoryPage from './components/CategoryPage';
import Home from './components/Home'
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  

  return (
    <>
    <NavBar/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
