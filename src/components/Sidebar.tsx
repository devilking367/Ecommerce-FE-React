// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MESSAGES } from '../constants/messages';

const menu = [
  { label: MESSAGES.SIDEBAR.DASHBOARD, path: '/' },
  { label: MESSAGES.SIDEBAR.PRODUCT, path: '/pim/products' },
  { label: MESSAGES.SIDEBAR.CATEGORY, path: '/pim/categories' },
  { label: MESSAGES.SIDEBAR.USER, path: '/users' },
  { label: MESSAGES.SIDEBAR.POST, path: '/pim/posts' },
];

export default function Sidebar() {
  return (
    <aside className="w-56 h-screen bg-white border-r p-4">
      <nav>
        <ul className="space-y-2">
          {menu.map(item => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded hover:bg-gray-100 text-base ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
