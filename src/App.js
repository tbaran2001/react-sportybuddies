import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllUsersPage from "./pages/AllUsersPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import ApiProvider from "./contexts/ApiProvider";

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <ApiProvider>
          <Header />
          <Routes>
            <Route path="/" element={<AllUsersPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </Container>
  );
}
