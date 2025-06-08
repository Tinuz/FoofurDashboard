import React from "react";

type LogEntry =
  | { group: string; message: string; timestamp: string | number }
  | { raw: { group: string; message: string; timestamp: string | number } };

type Props = {
  logs: LogEntry[];
};

function getLogFields(log: LogEntry) {
  if ("raw" in log) {
    return log.raw;
  }
  return log;
}

export default function LogTable({ logs }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="table-auto w-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <thead className="bg-blue-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 border-b border-gray-200 dark:border-gray-700 text-left font-semibold text-blue-900 dark:text-purple-200">
              Group
            </th>
            <th className="p-3 border-b border-gray-200 dark:border-gray-700 text-left font-semibold text-blue-900 dark:text-purple-200">
              Message
            </th>
            <th className="p-3 border-b border-gray-200 dark:border-gray-700 text-left font-semibold text-blue-900 dark:text-purple-200">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            const { group, message, timestamp } = getLogFields(log);
            return (
              <tr
                key={index}
                className={`border-b border-gray-100 dark:border-gray-800 ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-800/50"
                    : "bg-white dark:bg-gray-900"
                }`}
              >
                <td className="p-3">{group}</td>
                <td className="p-3">{message}</td>
                <td className="p-3 text-xs text-gray-500 dark:text-gray-400">
                  {typeof timestamp === "number"
                    ? new Date(timestamp).toLocaleString()
                    : timestamp}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}