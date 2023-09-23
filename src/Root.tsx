import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { SuperheroPage } from "./pages/SuperheroPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AppProvider } from "./components/AppContext/AppContext";

export const Root = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="superhero/:id" element={<SuperheroPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  )
}