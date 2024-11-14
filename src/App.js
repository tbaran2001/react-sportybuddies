import Container from "react-bootstrap/Container";
import Header from "./components/common/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AllUsersPage from "./pages/all-users/AllUsersPage";
import UserPage from "./pages/user/UserPage";
import LoginPage from "./pages/login/LoginPage";
import RegistrationPage from "./pages/register/RegistrationPage";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import ProfilePage from "./pages/profile/ProfilePage";
import MatchingPage from "./pages/matching/MatchingPage";
import BuddiesPage from "./pages/buddies/BuddiesPage";
import ChatPage from "./pages/chat/ChatPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserProfilePage from "./components/Pages/UserProfile/UserProfilePage";
import UserBuddiesPage from "./components/Pages/UserBuddies/UserBuddiesPage";
import UserMatchingPage from "./components/Pages/UserMatching/UserMatchingPage";
import UserChatPage from "./components/Pages/UserChat/UserChatPage";
import Navbar from "./components/Navbar/Navbar";

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
                        <Route path="/userprofile" element={<UserProfile />} />
                        <Route path="/matching" element={<MatchingPage />} />
                        <Route path="/buddies" element={<BuddiesPage />} />
                        <Route path="/chat/:buddyId" element={<ChatPage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/UserProfilePage" element={<UserProfilePage />} />
                        <Route path="/UserMatchingPage" element={<UserMatchingPage />} />
                        <Route path="/UserBuddiesPage" element={<UserBuddiesPage />} />
                        <Route path="/UserChatPage" element={<UserChatPage />} />
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
