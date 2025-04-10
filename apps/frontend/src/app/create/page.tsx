'use client';
import { CreateLinkForm } from '@/components/links/CreateLinkForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateLinkPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Short Link</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateLinkForm />
        </CardContent>
      </Card>
    </div>
  );
}