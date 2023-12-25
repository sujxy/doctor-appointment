import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home";
import BookingPage from "./pages/bookingPage";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8080";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/book/:doc_id" element={<BookingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
