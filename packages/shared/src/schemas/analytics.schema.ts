import { z } from 'zod';

export const AnalyticsSchema = z.object({
    linkId: z.string(),
    ip: z.string(),
    device: z.enum(['desktop', 'mobile', 'tablet']),
    browser: z.string(),
    timestamp: z.string().optional().refine(
        (date) => date === undefined || !isNaN(Date.parse(date)),
        {
            message: 'Invalid timestamp format',
        }
    ),
    country: z.string().optional()
});

export type AnalyticsInput = z.infer<typeof AnalyticsSchema>;