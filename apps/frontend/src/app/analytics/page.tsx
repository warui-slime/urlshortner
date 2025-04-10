'use client';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { useAnalytics } from '@/hooks/useAnalytics';

export default function AnalyticsPage() {
  const { analytics, isLoading, error } = useAnalytics();

  if (isLoading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>
      <AnalyticsCharts data={analytics} />
    </div>
  );
}