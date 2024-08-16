import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllUsersPage from "./pages/AllUsersPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ProfilePage from "./pages/ProfilePage";
import MatchingPage from "./pages/MatchingPage";

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <FlashProvider>
          <ApiProvider>
            <UserProvider>
              <Header />
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <RegistrationPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="/" element={<AllUsersPage />} />
                        <Route path="/user/:id" element={<UserPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/matching" element={<MatchingPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                      </Routes>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </UserProvider>
          </ApiProvider>
        </FlashProvider>
      </BrowserRouter>
    </Container>
  );
}
