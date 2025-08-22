import { Route, Routes } from "react-router-dom";
import MainLayout from './layout/MainLayout'; 
import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import RegisterLayout from "./layout/RegisterLayout";
import AccountPage from "./page/AccountPage";
import MainContent from "./component/MainContent";
import PlaylistDetailsPage from "./page/PlaylistDetailsPage";
import ArtistsDetailPage from "./page/ArtistsDetailPage";
import ProfileDetailPage from "./page/ProfileDetailPage";
import PodcastDetailPage from "./page/PodcastDetailPage";
import LibraryPage from "./page/LibraryPage";
import LyricsPage from "./page/LyricsPage";
import SearchPage from "./page/SearchPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainContent />} />
          <Route path="playlist/:id" element={<PlaylistDetailsPage />} />
          <Route path="podcasts/:id" element={<PodcastDetailPage />} />
          <Route path="artists/:id" element={<ArtistsDetailPage />} />
          <Route path="lyrics/:id" element={<LyricsPage />} />
          <Route path="profile" element={<ProfileDetailPage />} />
          <Route path="search" element={<SearchPage/>} />
          <Route path="library" element={<LibraryPage/>} />
        </Route>

        <Route path="/register" element={<RegisterLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
}

export default App;
