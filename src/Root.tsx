import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from './App';
import { HomePage } from './pages/HomePage';
import { SuperheroPage } from './pages/SuperheroPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='superhero/:id' element={<SuperheroPage />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}