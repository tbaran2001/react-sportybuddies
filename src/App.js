import Container from "react-bootstrap/Container";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";
import ProfileProvider from "./contexts/ProfileProvider";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import ProfilePage from "./components/Pages/Profile/ProfilePage";
import UserBuddiesPage from "./components/Pages/Buddies/UserBuddiesPage";
import UserMatchingPage from "./components/Pages/Matching/UserMatchingPage";
import UserChatPage from "./components/Pages/Chat/UserChatPage";
import Navbar from "./components/Navbar/Navbar";
import SignInPage from "./components/Pages/SignIn/SignInPage";
import SignUp from "./components/Pages/SignUp/SignUpPage";

export default function App() {
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <FlashProvider>
          <ApiProvider>
            <ProfileProvider>
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
                        <Route path="*" element={<Navigate to="/ProfilePage" />} />
                        <Route path="/ProfilePage" element={<ProfilePage />} />
                        <Route path="/UserMatchingPage" element={<UserMatchingPage />} />
                        <Route path="/UserBuddiesPage" element={<UserBuddiesPage />} />
                        <Route path="/UserChatPage/:conversationId" element={<UserChatPage />} />
                      </Routes>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </ProfileProvider>
          </ApiProvider>
        </FlashProvider>
      </BrowserRouter>
    </Container>
  );
}
