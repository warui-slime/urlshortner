'use client';

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { CopyToClipboard } from '../CopyToClipboard';
import { GenerateQr } from '@/components/analytics/GenerateQr';
import { X } from 'lucide-react';
import Link from 'next/link';

type LinkType = {
  shortCode: string;
  longUrl: string;
  clicks: number;
  createdAt: string;
  expirationDate?: string;
};

const ITEMS_PER_PAGE = 5;

export function DataTable({ data }: { data: LinkType[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShortCode, setSelectedShortCode] = useState<string>('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((link) =>
      link.longUrl.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const openModal = (shortCode: string) => {
    setSelectedShortCode(shortCode);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedShortCode('');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search by Long URL..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Short Url</TableHead>
            <TableHead>Long Url</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Expire At</TableHead>
            <TableHead>QR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((linkdata) => (
            <TableRow key={linkdata.shortCode}>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={process.env.NEXT_PUBLIC_API_URL!.replace(/api$/, linkdata.shortCode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='hover:underline'>
                    {process.env.NEXT_PUBLIC_API_URL!.replace(/api$/, linkdata.shortCode)}
                  </Link>
                  <CopyToClipboard text={process.env.NEXT_PUBLIC_API_URL!.replace(/api$/, linkdata.shortCode)} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <div title={linkdata.longUrl}>
                    {linkdata.longUrl.length > 40
                      ? `${linkdata.longUrl.slice(0, 40)}...`
                      : linkdata.longUrl}
                  </div>
                  <CopyToClipboard text={linkdata.longUrl} />
                </div>
              </TableCell>
              <TableCell>{linkdata.clicks}</TableCell>
              <TableCell>
                {new Date(linkdata.createdAt).toLocaleString("en-US", {
                  timeZone: "UTC",
                  hour12: false,
                })}
              </TableCell>
              <TableCell>
                {linkdata.expirationDate
                  ? new Date(linkdata.expirationDate).toLocaleString("en-GB", {
                    timeZone: "UTC",
                    hour12: false,
                  })
                  : "Nothing"}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => openModal(linkdata.shortCode)}
                  className="text-blue-500 hover:underline hover:cursor-pointer focus:outline-none"
                >
                  Click Here
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-full sm:max-w-md">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-black">QR Code</h2>
            <div className="flex justify-center items-center">
              <GenerateQr link={selectedShortCode} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
