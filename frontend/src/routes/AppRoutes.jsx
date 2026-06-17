import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import ChangePasswordPage from "../pages/auth/ChangePasswordPage";

// Contractor
import ContractorLayout from "../layouts/ContractorLayout";
import DashboardPage from "../pages/contractor/DashboardPage";
import MyTasksPage from "../pages/contractor/MyTasksPage";
import TaskDetailsPage from "../pages/contractor/TaskDetailsPage";
import SubmissionsPage from "../pages/contractor/SubmissionsPage";
import ProfilePage from "../pages/contractor/ProfilePage";
import ReportsPage from "../pages/contractor/ReportsPage";
import NotificationsPage from "../pages/contractor/NotificationsPage";

// Supervisor
import DashboardLayout from "../components/layout/DashboardLayout";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard";
import SupervisorSubmissions from "../pages/supervisor/SupervisorSubmissions";
import SupervisorReports from "../pages/supervisor/SupervisorReports";
import SupervisorNotifications from "../pages/supervisor/SupervisorNotifications";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import ContractorManagement from "../pages/admin/ContractorManagement";
import AddContractor from "../pages/admin/AddContractor";
import UserManagement from "../pages/admin/UserManagement";
import TaskMaster from "../pages/admin/TaskMaster";
import TaskAssignment from "../pages/admin/TaskAssignment";
import AdminReports from "../pages/admin/AdminReports";
import AdminSettings from "../pages/admin/AdminSettings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />

        {/* Contractor Routes */}
        <Route path="/contractor" element={<ContractorLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks" element={<MyTasksPage />} />
          <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="task/:id" element={<TaskDetailsPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* Supervisor Routes */}
        <Route path="/supervisor" element={<DashboardLayout role="supervisor" />}>
          <Route path="dashboard" element={<SupervisorDashboard />} />
          <Route path="submissions" element={<SupervisorSubmissions />} />
          <Route path="reports" element={<SupervisorReports />} />
          <Route path="notifications" element={<SupervisorNotifications />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="contractors" element={<ContractorManagement />} />
          <Route path="contractors/new" element={<AddContractor />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="tasks" element={<TaskMaster />} />
          <Route path="assignments" element={<TaskAssignment />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;