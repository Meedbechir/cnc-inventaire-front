import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Article from './components/Article';
import AddUser from './components/AddUser';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/articles" element={<Article />} />
          <Route path="/users" element={<AddUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
