import Container from "react-bootstrap/Container";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import FlashProvider from "./contexts/FlashProvider";
import UserProvider from "./contexts/UserProvider";
import PrivateRoute from "./components/common/PrivateRoute";
import PublicRoute from "./components/common/PublicRoute";
import ProfilePage from "./components/Pages/Profile/ProfilePage";
import BuddiesPage from "./components/Pages/Buddies/BuddiesPage";
import MatchingPage from "./components/Pages/Matching/MatchingPage";
import ChatPage from "./components/Pages/Chat/ChatPage";
import Navbar from "./components/Navbar/Navbar";
import SignInPage from "./components/Pages/SignIn/SignInPage";
import SignUp from "./components/Pages/SignUp/SignUpPage";
import LandingPage from "./components/Pages/Index/LandingPage";

export default function App() {
    return (
        <Container fluid className="App" style={{backgroundColor: "#162c46", height: "100vh"}}>
            <BrowserRouter>
                <FlashProvider>
                    <ApiProvider>
                        <UserProvider>
                            <Navbar/>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                    <PublicRoute>
                                        <LandingPage/>
                                    </PublicRoute>
                                }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <PublicRoute>
                                            <SignInPage/>
                                        </PublicRoute>
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        <PublicRoute>
                                            <SignUp/>
                                        </PublicRoute>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={
                                        <PrivateRoute>
                                            <Routes>
                                                <Route path="*" element={<Navigate to="/ProfilePage"/>}/>
                                                <Route path="/ProfilePage" element={<ProfilePage/>}/>
                                                <Route path="/MatchingPage" element={<MatchingPage/>}/>
                                                <Route path="/BuddiesPage" element={<BuddiesPage/>}/>
                                                <Route path="/ChatPage/:conversationId" element={<ChatPage/>}/>
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
