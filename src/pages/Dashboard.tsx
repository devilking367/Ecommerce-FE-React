import React from 'react';
import { MESSAGES } from '../constants/messages';

const stats = [
  { title: MESSAGES.DASHBOARD.STATS.TOTAL_PRODUCTS, value: 120, color: 'bg-blue-500' },
  { title: MESSAGES.DASHBOARD.STATS.TOTAL_USERS, value: 45, color: 'bg-green-500' },
  { title: MESSAGES.DASHBOARD.STATS.NEW_ORDERS, value: 8, color: 'bg-yellow-500' },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{MESSAGES.DASHBOARD.TITLE}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {stats.map((item) => (
          <div key={item.title} className={`rounded-lg shadow p-6 text-white ${item.color}`}>
            <div className="text-3xl font-bold">{item.value}</div>
            <div className="text-lg mt-2">{item.title}</div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-700">{MESSAGES.DASHBOARD.WELCOME}</p>
        </div>
      </div>
    </div>
  );
}
