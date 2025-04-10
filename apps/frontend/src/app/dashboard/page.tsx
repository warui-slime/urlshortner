'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/LinksTable';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { useAnalytics } from '@/hooks/useAnalytics';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function DashboardPage() {

  const { analytics, isLoading: analyticsLoading, error: analyticsError, refetch } = useAnalytics();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  if (analyticsLoading) return <div className="text-center py-8">Loading...</div>;

  if (analyticsError) return <div className="text-center py-8 text-red-500">Error: {analyticsError}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <Button asChild>
          <Link href="/create">Create New Link</Link>
        </Button>
      </div>

      <AnalyticsCharts data={analytics} />
      <div className='mt-10'>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => refetch()} variant="secondary" className='hover:cursor-pointer'>
                <RefreshCw className={isRefreshing ? 'animate-spin' : ''} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh</p>
            </TooltipContent>
          </Tooltip>

        </TooltipProvider>
        <div className='mt-2'>

          <DataTable data={analytics.links} />
        </div>
      </div>
    </div>
  );
}