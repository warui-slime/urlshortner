import { Request, Response } from 'express';
import { Analytics } from '../models/Analytics.model.js';
import { Link } from '../models/Link.model.js';
import dbConnect from '../lib/dbConnect.js';


export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
    await dbConnect();
  try {
    const userId = req.user!.id;
    

    const links = await Link.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);
    
    const timeSeries = await Analytics.aggregate([
      { $match: { 
        linkId: { $in: links.map(l => l._id) },
        timestamp: { $gte: startDate }
      }},
      { $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);

 
    const devices = await Analytics.aggregate([
      { $match: { linkId: { $in: links.map(l => l._id) } }},
      { $group: {
        _id: "$device",
        count: { $sum: 1 }
      }}
    ]);

    res.json({
      links,
      timeSeries: timeSeries.map(t => ({ date: t._id, clicks: t.count })),
      devices: devices.map(d => ({ device: d._id, count: d.count }))
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics' });
  }
};