import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import LoginPage from "../pages/auth/LoginPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";
import DashboardPage from "../pages/contractor/DashboardPage";
import TasksPage from "../pages/contractor/TasksPage";
import TaskDetailsPage from "../pages/contractor/TaskDetailsPage";

function AppRoutes() {
return ( <BrowserRouter> <Routes>

    <Route
      path="/"
      element={<RoleSelectionPage />}
    />

    <Route
      path="/login/:role"
      element={<LoginPage />}
    />

    <Route
      path="/change-password"
      element={<ChangePasswordPage />}
  />
  
  <Route
    path="/contractor/dashboard"
    element={<DashboardPage />}
  />

  <Route
    path="/contractor/tasks"
    element={<TasksPage />}
  />
  
  <Route
    path="/contractor/task/:id"
    element={<TaskDetailsPage />}
/>

  </Routes>
</BrowserRouter>

);
}

export default AppRoutes;
