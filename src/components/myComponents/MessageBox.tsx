'use client';

import { useState, useEffect } from 'react';
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
import { Loader2, Send, CheckCircle, XCircle, Clock } from 'lucide-react';

// Enhanced Zod schema with better validation
const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message must be less than 2000 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DiscordMessageBox() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [messageLength, setMessageLength] = useState(0);
  const [lastSent, setLastSent] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });

  // Load draft from localStorage
  useEffect(() => {
    const draft = localStorage.getItem('message-draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        form.setValue('email', parsed.email || '');
        form.setValue('message', parsed.message || '');
        setMessageLength(parsed.message?.length || 0);
      } catch (e) {
        console.warn('Failed to parse message draft:', e);
      }
    }
  }, [form]);

  // Save draft to localStorage
  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem(
        'message-draft',
        JSON.stringify({
          email: values.email || '',
          message: values.message || '',
          timestamp: Date.now(),
        })
      );
      setMessageLength(values.message?.length || 0);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Rate limiting check
  const canSend = () => {
    if (!lastSent) return true;
    const timeSinceLastSend = Date.now() - lastSent;
    return timeSinceLastSend > 30000; // 30 seconds cooldown
  };

  // Enhanced toast notifications
  useEffect(() => {
    if (status === 'success') {
      toast.success('Message sent successfully!', {
        description: "Thanks for reaching out! I'll get back to you soon.",
        duration: 5000,
      });
      setLastSent(Date.now());
      // Clear draft on success
      localStorage.removeItem('message-draft');
    } else if (status === 'error') {
      toast.error('Failed to send message', {
        description: 'Please check your connection and try again.',
        duration: 5000,
      });
    }
  }, [status]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (form.formState.isValid && status === 'idle' && canSend()) {
          form.handleSubmit(onSubmit)();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [form]);

  async function onSubmit(values: FormValues) {
    if (!canSend()) {
      toast.error('Please wait 30 seconds before sending another message', {
        description: 'Rate limiting helps prevent spam.',
      });
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `📧 **Email:** ${values.email}\n💬 **Message:** ${values.message}\n⏰ **Sent:** ${new Date().toLocaleString()}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        setMessageLength(0);
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}`);
      }
    } catch (error) {
      console.error('Message send error:', error);
      setStatus('error');
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Send className="h-4 w-4" />;
    }
  };

  const getCooldownTime = () => {
    if (!lastSent) return 0;
    const timeSinceLastSend = Date.now() - lastSent;
    return Math.max(0, 30 - Math.floor(timeSinceLastSend / 1000));
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  Your Email
                  {form.formState.errors.email && (
                    <span className="text-xs text-red-500">Required</span>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    {...field}
                    type="email"
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                    autoComplete="email"
                  />
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
                <FormLabel className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    Your Message
                    {form.formState.errors.message && (
                      <span className="text-xs text-red-500">Required</span>
                    )}
                  </span>
                  <span
                    className={`text-xs transition-colors ${
                      messageLength > 1800
                        ? 'text-red-500'
                        : messageLength > 1500
                          ? 'text-yellow-500'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {messageLength}/2000
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your message here... (Ctrl+Enter to send)"
                    {...field}
                    rows={4}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 resize-none"
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={status === 'sending' || !canSend()}
              className="flex items-center gap-2 transition-all duration-200"
            >
              {getStatusIcon()}
              {status === 'sending'
                ? 'Sending...'
                : !canSend()
                  ? `Wait ${getCooldownTime()}s`
                  : 'Send Message'}
            </Button>

            {lastSent && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Last sent {Math.floor((Date.now() - lastSent) / 1000)}s ago
              </div>
            )}
          </div>
        </form>
      </Form>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Messages are sent via Discord webhook</p>
        <p>
          • Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Ctrl</kbd> +{' '}
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send quickly
        </p>
        <p>• Your draft is automatically saved</p>
      </div>
    </div>
  );
}
