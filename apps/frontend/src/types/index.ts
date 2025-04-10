export interface ApiError {
    status?: number;
    data?: {
        message?: string;
        errors?: Record<string, string[]>;
    };
}

export * from './links';