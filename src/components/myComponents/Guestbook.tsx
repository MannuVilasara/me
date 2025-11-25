'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Send,
  Loader2,
  Github,
  User,
  LogOut,
  Trash2,
  Sparkles,
  Quote,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const messageSchema = z.object({
  message: z.string().min(1, 'Message is required').max(500, 'Message too long'),
});

type MessageForm = z.infer<typeof messageSchema>;

type GuestbookEntry = {
  id: string;
  author: string;
  username?: string;
  avatar?: string;
  message: string;
  timestamp: string;
  verified?: boolean;
};

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const { data: session, status } = useSession();

  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  // Prevent hydration mismatch for dates
  useEffect(() => {
    setMounted(true);
    fetchGuestbook();
  }, []);

  const fetchGuestbook = async () => {
    try {
      const response = await fetch('/api/guestbook');
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      }
    } catch (error) {
      console.error('Failed to load guestbook:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: MessageForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries((prev) => [newEntry, ...prev]);
        form.reset();
        toast.success('Message added to guestbook!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to add message');
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
      toast.error('Failed to add message');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    // Optimistic UI or wait for server? Let's verify first.
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    setDeletingId(messageId);
    try {
      const response = await fetch(`/api/guestbook?id=${messageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== messageId));
        toast.success('Message deleted successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to delete message');
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error('Failed to delete message');
    } finally {
      setDeletingId(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-10 animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Guestbook</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Leave a mark for future visitors! Share your thoughts, feedback, or just say hello. 💝
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-2 shadow-sm relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-16 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />

        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-muted-foreground" />
            Sign the Guestbook
          </CardTitle>
          <CardDescription>Join the conversation with the community.</CardDescription>
        </CardHeader>

        <CardContent>
          {status === 'loading' ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Checking authentication...</p>
            </div>
          ) : session ? (
            <div className="space-y-6">
              {/* Authenticated User Banner */}
              <div className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarImage
                      src={session.user.avatar || undefined}
                      alt={session.user.name || 'User'}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {session.user.name?.[0] || <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">Signed in as</p>
                    <p className="font-bold text-base">{session.user.name || 'Anonymous'}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              placeholder="Write your message here..."
                              {...field}
                              rows={4}
                              className="resize-none pr-4 pb-8 text-base bg-background/50 focus:bg-background transition-colors"
                              disabled={isSubmitting}
                            />
                            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-0.5 rounded-full pointer-events-none">
                              {field.value?.length || 0}/500
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.formState.isValid}
                    className="w-full sm:w-auto min-w-[150px]"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Post Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-6 bg-muted/20 rounded-xl border border-dashed border-border">
              <div className="p-4 bg-background rounded-full shadow-sm">
                <Github className="h-8 w-8" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h4 className="font-semibold text-lg">Login to Contribute</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your GitHub account to verify your identity and leave a message.
                </p>
              </div>
              <Button onClick={() => signIn('github')} size="lg" className="font-semibold">
                <Github className="h-5 w-5 mr-2" />
                Continue with GitHub
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Messages Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Recent Messages
            <Badge variant="secondary" className="ml-2 rounded-full px-2.5">
              {entries.length}
            </Badge>
          </h3>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-muted-foreground">Loading recent messages...</p>
          </div>
        ) : entries.length === 0 ? (
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="py-12 text-center">
              <div className="inline-flex items-center justify-center p-4 bg-background rounded-full shadow-sm mb-4">
                <Sparkles className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h4 className="text-lg font-semibold text-foreground/80">No messages yet</h4>
              <p className="text-muted-foreground">Be the first to sign the guestbook! 🚀</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry) => (
              <Card
                key={entry.id}
                className="group relative transition-all hover:shadow-md hover:border-primary/20"
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <Avatar className="h-10 w-10 border border-border shrink-0">
                      <AvatarImage src={entry.avatar} alt={entry.author} />
                      <AvatarFallback>
                        <User className="h-5 w-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm sm:text-base truncate">
                            {entry.author}
                          </span>

                          {entry.verified && (
                            <Badge
                              variant="secondary"
                              className="h-5 px-1.5 text-[10px] gap-0.5 bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"
                            >
                              <span className="font-bold">✓</span> Verified
                            </Badge>
                          )}

                          <span className="text-xs text-muted-foreground">•</span>
                          <span
                            className="text-xs text-muted-foreground font-medium"
                            title={new Date(entry.timestamp).toLocaleString()}
                          >
                            {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base leading-relaxed text-foreground/90 break-words whitespace-pre-wrap">
                        {entry.message}
                      </p>
                    </div>

                    {/* Delete Action (Only for owner) */}
                    {session && entry.username === session.user.username && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteMessage(entry.id)}
                          disabled={deletingId === entry.id}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          {deletingId === entry.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
