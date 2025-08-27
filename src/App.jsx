import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ProtectedRoute from "./context/ProtectedRoute";
import PublicRoute from "./context/PublicRoute";
import PenyuluhPage from "./pages/penyuluh/PenyuluhPage";
import TambahDataPenyuluhPage from "./pages/penyuluh/TambahDataPenyuluhPage";
import EditDataPenyuluhPage from "./pages/penyuluh/EditDataPenyuluhPage";
import TimesheetPage from "./pages/timesheet/TimesheetPage";
import CreateTimesheet from "./pages/timesheet/Create";
import EmployeePage from "./pages/employee/EmployeePage";
import HrPage from "./pages/hr/HrPage";
import EditEmployee from "./pages/employee/Edit";
import EditTimesheet from "./pages/timesheet/Edit";
import CheckerPage from "./pages/checker/CheckerPage";
import ProceedTimesheet from "./pages/checker/Proceed";
import { AdminPage } from "./pages/admin/AdminPage";

function App() {
  return (
    <main style={{ minHeight: "100vh", width: "100vw" }}>
      <Routes>
        {/* Route untuk root path - redirect ke halaman sesuai autentikasi */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute> 
              <SignupPage /> 
            </PublicRoute>
          }
        />
        <Route 
          path="/penyuluh" 
          element={
            <ProtectedRoute> 
              <PenyuluhPage /> 
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/penyuluhan/tambah" 
          element={
            <ProtectedRoute> 
              <TambahDataPenyuluhPage /> 
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/penyuluhan/edit/:id" 
          element={
            <ProtectedRoute> 
              <EditDataPenyuluhPage /> 
            </ProtectedRoute>
          } 
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/timesheet"
          element={
            <ProtectedRoute>
              <TimesheetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet/create"
          element={
            <ProtectedRoute>
              <CreateTimesheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet/edit/:timesheetId"
          element={
            <ProtectedRoute>
              <EditTimesheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checker"
          element={
            <ProtectedRoute>
              <CheckerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timesheet/proceed/:timesheetId"
          element={
            <ProtectedRoute>
              <ProceedTimesheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr"
          element={
            <ProtectedRoute>
              <HrPage />
            </ProtectedRoute>
          }
        />
        
        {/* Fallback route untuk handle 404 */}
        <Route 
          path="*" 
          element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </main>
  );
}

export default App;