'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/validations/auth';
import { useLoginMutation } from '@/services/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { setCredentials } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/lib/hooks';

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);

      const res = await login(values).unwrap();

      localStorage.setItem('token', res.data.token);

      dispatch(setCredentials({
        user: res.user,
        token: res.token
      }));

      toast('Login Successful', {
        description: 'Redirecting to dashboard...',
      });


      router.push('/dashboard');

    } catch (err: any) {

      console.log(err);

      toast('Login Failed', {

        description: err.data?.message || 'Invalid email or password',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email (rohan@example.com)</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password (testpass)</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </Form>
  );
}