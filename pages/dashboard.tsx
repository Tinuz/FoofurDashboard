'use client';

import { useEffect, useState } from "react";
import LogTable from "../components/LogTable";

type LogEntry = {
  group: string;
  message: string;
  timestamp: string;
};

export default function DashboardPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    fetch("/api/logs")
      .then((res) => res.json())
      .then(setLogs);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700 dark:text-purple-300 tracking-tight">
          Telegram Bot Log
        </h1>
        <LogTable logs={logs} />
      </div>
    </div>
  );
}