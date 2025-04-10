import { useGetAnalyticsQuery } from '@/services/analyticsApi';
import { getErrorMessage } from '@/lib/errorUtils';

export const useAnalytics = () => {
  const { data, isLoading, error, refetch } = useGetAnalyticsQuery(undefined);

  return {
    analytics: data || { timeSeries: [], devices: [], links: [] }, 
    isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
};
