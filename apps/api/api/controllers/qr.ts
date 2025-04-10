import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { Link } from '../models/Link.model.js';
import dbConnect from '../lib/dbConnect.js';

export const generateQR = async (req: Request, res: Response): Promise<void> => {
    await dbConnect();
    try {
        const { shortCode } = req.params;
        const userId = req.user!.id;


        const link = await Link.findOne({
            shortCode,
            userId
        });

        if (!link) {
            res.status(404).json({ message: 'Link not found' });
        }

        const fullUrl = `${process.env.BASE_URL}/${shortCode}`;

        const qrImage = await QRCode.toDataURL(fullUrl, {
            errorCorrectionLevel: 'H',
            margin: 2,
            width: 400,
            type: "image/png"
        });

        res.json({
            qr: qrImage,
            url: fullUrl
        });

    } catch (error) {
        console.error('QR Generation Error:', error);
        res.status(500).json({ message: 'Failed to generate QR code' });
    }
};