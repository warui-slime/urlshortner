'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createLinkSchema, CreateLinkInput } from '@/lib/validations/links';
import { useCreateLinkMutation } from '@/services/linksApi';
import { useRouter } from 'next/navigation';
import { CreateLinkRequest } from '@/types';

export function CreateLinkForm() {
  const router = useRouter();
  const form = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      longUrl: '',
      customAlias: '',       // Set default as an empty string
      expirationDate: ''     // Set default as an empty string
    }
  });

  const [createLink, { isLoading }] = useCreateLinkMutation();

  const onSubmit = async (values: CreateLinkRequest) => {
    const payload = {
      ...values,
      customAlias: values.customAlias?.trim() || undefined,
      expirationDate: values.expirationDate?.trim() || undefined,
    };
  
    try {
      console.log(JSON.stringify(payload));
      
      await createLink(payload).unwrap();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating link:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField<CreateLinkInput>
          control={form.control}
          name="longUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/very-long-url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField<CreateLinkInput>
          control={form.control}
          name="customAlias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Alias (optional)</FormLabel>
              <FormControl>
                <Input placeholder="my-custom-alias" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Short Link'}
        </Button>
      </form>
    </Form>
  );
}
