import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from "layout/mainLayout";
import MyFile from 'pages/file';
import Masters from 'pages/masters';
import Receipe from 'pages/receipe';
import Report from 'pages/report';
import Dashboard from 'pages/dashboard';
import Stockreport from 'pages/stock_report';
import Purchase from 'pages/purchase';
import Login from 'pages/login';
import { LoadingUI } from 'components/Loader/loadingui';
import ItemGroup from 'pages/itemgroup';
import UniformMaster from 'pages/jobWorkOrder';

const App: React.FC = () => {

  return (
    <Router>
      <LoadingUI />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job-work-order" element={<UniformMaster />} />
          <Route path="/inventory/rm-group-master" element={<ItemGroup />} />
          <Route path="/inventory/rm-subgroup" element={<MyFile />} />
          <Route path="/inventory/inventory-list" element={<Purchase />} />
          <Route path="/receipe" element={<Receipe />} />
          <Route path="/stock-report/date-wise-stock-report" element={<Stockreport />} />
          <Route path="/report/datebased-consolidated-sales" element={<Report />} />
          <Route path='/master/company-conf' element={<Masters />} />
          <Route path="/receipe/product" element={<Purchase />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;