import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; 
import Login from './components/Login';
import Article from './components/Article';
import AddUser from './components/AddUser';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Login />} /> 
        {/* Routes protégées */}
        <Route path="/home" element={<PrivateRoute element={Home} />} /> 
        <Route path="/articles" element={<PrivateRoute element={Article} />} />
        <Route path="/users" element={<PrivateRoute element={AddUser} />} />
        <Route path="/navbar" element={<PrivateRoute element={Navbar} />} />
      </Routes>
    </Router>
  );
}

export default App;
