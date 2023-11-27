import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import Movies from './pages/movies.jsx';
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsCard from "./components/DetailsCard";
import ErrorPage from "./pages/ErrorPage";



function App() {
  return (      
        <BrowserRouter>
          <Header />
          <Routes>
          <Route path="/" element={<Movies />}></Route>
            <Route path="/movies" element={<Movies />}></Route>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/signup" element={<Signup />}></Route>
            <Route path="/movies/:movieId" element={<DetailsCard />}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
        </BrowserRouter>
  )
}

export default App

