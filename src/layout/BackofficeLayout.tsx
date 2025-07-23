// src/layout/BackofficeLayout.tsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function BackofficeLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-6">
          <div className="w-full px-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
