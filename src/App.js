import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import UserProfilePage from "./components/Pages/UserProfile/UserProfilePage";
import UserBuddiesPage from "./components/Pages/UserBuddies/UserBuddiesPage";
import UserMatchingPage from "./components/Pages/UserMatching/UserMatchingPage";
import UserChatPage from "./components/Pages/UserChat/UserChatPage";
import Navbar from "./components/Navbar/Navbar";
import SignInPage from "./components/Pages/SignIn/SignInPage";
import SignUp from "./components/Pages/SignUp/SignUpPage";

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <FlashProvider>
          <ApiProvider>
            <UserProvider>
              <Navbar />
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <SignInPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PrivateRoute>
                      <Routes>
                        <Route path="*" element={<Navigate to="/UserProfilePage" />} />
                        <Route path="/UserProfilePage" element={<UserProfilePage />} />
                        <Route path="/UserMatchingPage" element={<UserMatchingPage />} />
                        <Route path="/UserBuddiesPage" element={<UserBuddiesPage />} />
                        <Route path="/UserChatPage/:conversationId" element={<UserChatPage />} />
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
