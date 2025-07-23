import type { FC, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

type ColumnType<T> = {
  key: keyof T;
  header: ReactNode;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

interface DataTableProps<T> {
  columns: ColumnType<T>[];
  data: T[];
  loading: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  actions?: boolean;
  emptyMessage?: string;
  emptyIcon?: FC<{ className?: string }>;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  actions = true,
  emptyMessage = "Không có dữ liệu",
  emptyIcon: EmptyIcon = CiUser
}: DataTableProps<T>) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
    {loading ? (
      <div className="p-8">
        <LoadingSpinner size="lg" />
      </div>
    ) : data.length === 0 ? (
      <div className="text-center py-12">
        <EmptyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Sửa"
                        >
                          <CiEdit className="h-4 w-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Xóa"
                        >
                          <CiTrash className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
export default DataTable;
