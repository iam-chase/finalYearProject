import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import RegistrationForm from "scenes/auth/Register";
import LoginForm from "scenes/auth/Login";
import ForgotPassword from "scenes/auth/ForgotPassword";
import ProductsList from "scenes/products";
import CreateProduct from "scenes/products/CreateProduct";
import UpdateProduct from "scenes/products/UpdateProduct";
import LandingPage from "pages/LandingPage";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Redirect root to login page */}
            <Route path="*" element={<Navigate to="/landingpage" replace />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/register" element={<RegistrationForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<Layout />}>
              {/* Dashboard and core routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />

              {/* Products routes */}
              <Route path="/products" element={<ProductsList />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/products/:id" element={<UpdateProduct />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


