import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Feed from "./pages/feed/Feed";
import GlobalDataProvider from "./context/GlobalData";
import ProtectedRoute from "./context/ProtectedRoute";
import PostCard from './components/post/PostCard';
import PostArea from './components/post/PostArea';
import SingleFeed, { SingleFeedLoader } from './pages/singleFeed/SingleFeed';
import TextPost from './components/post/TextPost';
import EditPost from './components/post/EditPost';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Feed />}>
      <Route index element={<PostCard />} />
      <Route path="submit"
        element={
          <ProtectedRoute>
            <PostArea />
          </ProtectedRoute>
        }
      />
      <Route path="/:id"
        element={
          // <ProtectedRoute>
            <SingleFeed />
          // </ProtectedRoute>
        }
        loader={SingleFeedLoader}
      />
      <Route path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <GlobalDataProvider>
      <RouterProvider router={router} />
    </GlobalDataProvider>
  );
}

export default App;
