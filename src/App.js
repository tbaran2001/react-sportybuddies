import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllUsersPage from "./pages/AllUsersPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AllUsersPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
