import { Request, Response } from 'express';
import { Link } from '../models/Link.model.js';
import { customAlphabet } from 'nanoid';
import { CreateLinkSchema } from '@repo/shared/LinkSchema';
import dbConnect from '../lib/dbConnect.js';

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const generateCode = customAlphabet(alphabet, 6);

export const createLink = async (req: Request, res: Response): Promise<void> => {
    await dbConnect()
    try {

        console.log(req.body);
        
        const validatedData = CreateLinkSchema.parse(req.body)
        console.log(validatedData);
        const userId = req.user!.id;
        console.log(userId);
        
        
        


        if (!isValidUrl(validatedData.longUrl)) {
            res.status(400).json({ message: 'Invalid URL format' });
        }


        if (validatedData.customAlias) {
            const existing = await Link.findOne({ shortCode: validatedData.customAlias });
            if (existing) {
                res.status(409).json({ message: 'Custom alias already exists' });
                return;
            }
        }

        const newLink = await Link.create({
            longUrl: validatedData.longUrl,
            shortCode: validatedData.customAlias || generateCode(),
            userId,
            expirationDate: validatedData.expirationDate || null
        });

        res.status(201).json(newLink);

    } catch (error) {
        res.status(500).json({ message: 'Error creating link' });
    }
};

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const getLinks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const skip = (Number(page) - 1) * Number(limit);

        const query = {
            userId: req.user!.id,
            $or: [
                { longUrl: { $regex: search, $options: 'i' } },
                { shortCode: { $regex: search, $options: 'i' } }
            ]
        };

        const [links, total] = await Promise.all([
            Link.find(query)
                .skip(skip)
                .limit(Number(limit))
                .sort({ createdAt: -1 }),

            Link.countDocuments(query)
        ]);

        res.json({
            links,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page)
        });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching links' });
    }
};