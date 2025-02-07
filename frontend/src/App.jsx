import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Blogs from "../src/pages/Blogs";
import About from "../src/pages/About";
import Contact from "../src/pages/Contact";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Creators from "./pages/Creators";
import Dashboard from "../src/pages/Dashboard";
import UpdateBlog from './dashboard/UpdateBlog';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';



const App = () => {

  const location = useLocation();
  const hideNavbarFooter = ["/dashboard","/login","/register"].includes(location.pathname);
  const {blogs, isAuthenticated} = useAuth()
  console.log(blogs)
  console.log(isAuthenticated)

  return (
    <div>
      {!hideNavbarFooter && <Navbar></Navbar>}
      <Routes>
        <Route exact path='/' element={isAuthenticated===true?<Home />:<Navigate to={"/login"}/>}/>
        <Route exact path='/blogs' element={<Blogs></Blogs>}/>
        <Route exact path='/about' element={<About></About>}/>
        <Route exact path='/creators' element={<Creators></Creators>}/>
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        
        <Route exact path="/blog/:id" element={<Detail />} />
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Toaster />
      {!hideNavbarFooter && <Footer></Footer>}
    </div>
  )
}

export default App
