import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardPage from "@/components/page/dashboard";
import Note from "@/components/page/note";
import Home from "@/components/page/home";
import LogInPage from "@/components/page/login";
import SignUpPage from "@/components/page/sign-up";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/note/:id" element={<Note />} />
      </Route>
    )
  );

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
