import React from 'react';

const dataSource = [
  { key: '1', name: 'Sản phẩm 1', price: 100000 },
  { key: '2', name: 'Sản phẩm 2', price: 200000 },
];

export default function ProductList() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Danh sách sản phẩm</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-2 px-4 text-left font-semibold">Tên sản phẩm</th>
              <th className="py-2 px-4 text-left font-semibold">Giá</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((item) => (
              <tr key={item.key} className="border-b last:border-none hover:bg-gray-50">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.price.toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
