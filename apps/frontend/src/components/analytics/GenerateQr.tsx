"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface QRResponse {
    qr: string;
    url: string;
}

interface GenerateQrProps {
    link: string;
}

export const GenerateQr: React.FC<GenerateQrProps> = ({ link }) => {
    const [qrData, setQrData] = useState<QRResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchQR = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<QRResponse>(`${process.env.NEXT_PUBLIC_API_URL}/qr/${link}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setQrData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'An error occurred while fetching the QR code.');
            } finally {
                setLoading(false);
            }
        };

        fetchQR();
    }, [link]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    if (!qrData) {
        return null;
    }

    return (
        <div>
            <Image src={qrData.qr} alt={`QR code for ${link}`} width={75} height={75}/>
        </div>
    );
};
