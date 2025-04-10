export const DEFAULT_PAGINATION = {
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1
  };
  
  export const LINK_EXPIRATION_OPTIONS = [
    { value: '1h', label: '1 Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];
  
  export const API_ENDPOINTS = {
    LINKS: '/links',
    ANALYTICS: '/analytics',
    LOGIN: '/auth/login'
  };