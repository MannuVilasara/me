'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

// 1️⃣ Define Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DiscordMessageBox() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });

  // 2️⃣ Use useEffect to show toast when status changes
  useEffect(() => {
    if (status === 'success') {
      toast.success('Message sent successfully!');
    } else if (status === 'error') {
      toast.error('Failed to send message. Please try again later.');
    }
  }, [status]);

  async function onSubmit(values: FormValues) {
    setStatus('sending');
    try {
      const res = await axios.post('/api/send-message', {
        content: `📧 Email: ${values.email}\n💬 Message: ${values.message}`,
      });

      if (res.status === 200) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Email</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your message here..." {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </Form>
  );
}
