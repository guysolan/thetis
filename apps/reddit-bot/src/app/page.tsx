'use client';

import { useState, useEffect } from 'react';

interface ActivityLog {
  timestamp: string;
  activity: string;
}

interface BotStats {
  processedPosts: number;
  monitoredPosts: number;
  repliesSent: number;
  lastActivity: string;
}

export default function Dashboard() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<BotStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [logsRes, statsRes] = await Promise.all([
        fetch('/api/logs'),
        fetch('/api/stats'),
      ]);

      if (logsRes.ok) {
        const logsData = await logsRes.json();
        setLogs(logsData.logs || []);
      }

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const testCron = async (endpoint: string) => {
    try {
      const response = await fetch(`/api/test/${endpoint}`, {
        method: 'POST',
      });
      const result = await response.json();
      alert(`Test ${endpoint}: ${result.success ? 'Success' : 'Failed'}\n${JSON.stringify(result, null, 2)}`);
      fetchData(); // Refresh data
    } catch (error) {
      alert(`Test failed: ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reddit Bot Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitoring Achilles rupture recovery discussions</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Processed Posts</h3>
            <p className="text-2xl font-bold text-gray-900">{stats?.processedPosts || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Monitored Posts</h3>
            <p className="text-2xl font-bold text-blue-600">{stats?.monitoredPosts || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Replies Sent</h3>
            <p className="text-2xl font-bold text-green-600">{stats?.repliesSent || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Last Activity</h3>
            <p className="text-sm text-gray-900">
              {stats?.lastActivity ? new Date(stats.lastActivity).toLocaleString() : 'Never'}
            </p>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Test Controls</h2>
          <div className="flex gap-4">
            <button
              onClick={() => testCron('monitor-posts')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Test Monitor Posts
            </button>
            <button
              onClick={() => testCron('monitor-comments')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Test Monitor Comments
            </button>
            <button
              onClick={() => testCron('reply-to-posts')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
            >
              Test Reply System
            </button>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="max-h-96 overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500">No activity logs yet</p>
              ) : (
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="flex justify-between items-start p-3 bg-gray-50 rounded">
                      <span className="text-sm text-gray-900">{log.activity}</span>
                      <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}