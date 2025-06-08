'use client';

import { useEffect, useState } from "react";
import LogTable from "../components/LogTable";

type LogEntry = {
  group: string;
  message: string;
  timestamp: string;
};

const PAGE_SIZE = 10;

export default function DashboardPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
      })
      .catch((err) => {
        console.error("Fout bij ophalen logs:", err);
      });
  }, []);

  // Bepaal welke logs getoond worden op basis van de huidige pagina
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagedLogs = logs.slice(start, end);
  const totalPages = Math.ceil(logs.length / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700 dark:text-purple-300 tracking-tight">
          Telegram Bot Log
        </h1>
        <LogTable logs={pagedLogs} />
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="px-3 py-1 rounded bg-blue-200 dark:bg-gray-700 text-blue-900 dark:text-purple-200 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Vorige
          </button>
          <span className="mx-2 text-gray-700 dark:text-gray-300">
            Pagina {currentPage} van {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-blue-200 dark:bg-gray-700 text-blue-900 dark:text-purple-200 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  );
}