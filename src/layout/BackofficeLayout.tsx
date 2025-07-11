// src/layout/BackofficeLayout.tsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/Header';
import { Outlet } from 'react-router-dom';

export default function BackofficeLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AppHeader />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
