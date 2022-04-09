import React from "react";
import { Route, Routes } from "react-router-dom";
import { HOME_PAGE, LOGIN, REGISTER, UNAUTHORIZED } from "./constants";
import FourOhFour from "./pages/FourOhFour";
import Layout from "./pages/Layout";
import Overview from "./pages/Overview";
import './css/App.css'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Everything inside this will have a menu and a footer */}
        <Route path={HOME_PAGE} element={<Layout />}>
          
          {/* Public Routes */}
          <Route path={HOME_PAGE} element={<Overview />} />
        
        </Route>

        {/* 404 route */}
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </div>
  );
};

export default App;
