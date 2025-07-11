// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const menu = [
  { label: 'Dashboard', path: '/' },
  { label: 'Product', path: '/pim/products' },
  { label: 'Category', path: '/pim/categories' },
  { label: 'User', path: '/users' },
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
