import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login"
import { Home } from "./pages/Home";
import { Layout } from "./component/Layout";
import { Signup } from "./pages/Signup";
import { Explore } from "./pages/Explore";
import { Bookmark } from "./pages/Bookmark";
import { Liked } from "./pages/Liked";
import { PostPage } from "./pages/PostPage";
import { RequireAuth } from "./Auth/RequireAuth"
import { Profile } from "./pages/Profile";
import "./App.css";
import { MockAPI } from "./pages/Mockman";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route
            index
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/explore"
            element={
              <RequireAuth>
                <Explore />
              </RequireAuth>
            }
          />
          <Route
            path="/bookmark"
            element={
              <RequireAuth>
                <Bookmark />
              </RequireAuth>
            }
          />
          <Route
            path="/liked"
            element={
              <RequireAuth>
                <Liked />
              </RequireAuth>
            }
          />
          <Route
            path="/posts/:postId"
            element={
              <RequireAuth>
                <PostPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile/:username"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/posts/:postId" element={<PostPage />} />
        </Route>

        <Route path="/mockman" element={<MockAPI />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App
