import { useGetLinksQuery } from '@/services/linksApi';
import { getErrorMessage } from '@/lib/errorUtils';

export const useLinks = () => {
  const { data, isLoading, error } = useGetLinksQuery(undefined); // Pass undefined explicitly
  
  return {
    links: data || [],
    isLoading,
    error: error ? getErrorMessage(error) : null
  };
};