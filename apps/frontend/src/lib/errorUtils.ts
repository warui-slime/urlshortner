export function getErrorMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    if (typeof error === 'object' && error !== null) {
      const apiError = error as {
        status?: number;
        data?: { message?: string };
      };
      return apiError.data?.message || 'Unknown error';
    }
    return 'Unknown error';
  }