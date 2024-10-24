import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Article from './components/Article';
import AddUser from './components/AddUser';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; 
import Designation from './components/Designation';
import ArticleDetailPage from './components/ArticleDetailPage';
import ArticleCreation from './components/ArticleCreation';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Login />} /> 
        {/* Routes protégées */}
        <Route path="/home" element={<PrivateRoute element={ArticleCreation} />} /> 
        <Route path="/articles" element={<PrivateRoute element={Article} />} />
        <Route path="/articles/:id" element={<PrivateRoute element={ArticleDetailPage} />} />
        <Route path="/create-article" element={<PrivateRoute element={ArticleCreation} />} />
        <Route path="/users" element={<PrivateRoute element={AddUser} />} />
        <Route path="/navbar" element={<PrivateRoute element={Navbar} />} />
        <Route path="/designations" element={<PrivateRoute element={Designation} />} />
      </Routes>
    </Router>
  );
}

export default App;
