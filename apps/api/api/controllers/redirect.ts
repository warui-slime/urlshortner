import { Request, Response } from 'express';
import { Link } from '../models/Link.model.js';
import { Analytics } from '../models/Analytics.model.js';
import { detect } from 'detect-browser';
import dbConnect from '../lib/dbConnect.js';

export const redirect = async (req: Request, res: Response): Promise<void> => {
    await dbConnect();
  try {
    const { shortCode } = req.params;
    const link = await Link.findOne({ shortCode });

    if (!link || (link.expirationDate && new Date() > link.expirationDate)) {
      res.status(404).json({ message: 'Link not found or expired' });
      return;
    }

  
    setTimeout(async () => {
      try {
        const browser = detect(req.headers['user-agent']);
        await Analytics.create({
          linkId: link._id,
          ip: req.ip,
          device: getDeviceType(req),
          browser: browser?.name || 'unknown',
          country: req.headers['cf-ipcountry']?.toString() || 'unknown'
        });
        
        await Link.updateOne({ _id: link._id }, { $inc: { clicks: 1 } });
      } catch (analyticsError) {
        console.error('Analytics error:', analyticsError);
      }
    }, 0);

    res.redirect(link.longUrl);

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDeviceType = (req: Request) => {
  const ua = req.headers['user-agent'] || '';
  if (/(tablet|ipad|playbook|silk)/i.test(ua)) return 'tablet';
  if (/mobile/i.test(ua)) return 'mobile';
  return 'desktop';
};