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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Loader2, Github, Trash2, CheckCircle2, ArrowRight, Terminal, Pin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Zod Schema
const messageSchema = z.object({
  message: z.string().min(1, 'Message is required').max(500, 'Message too long'),
});

import { GuestbookEntry, MessageForm } from '@/types/types';

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<GuestbookEntry | null>(null);
  const [mounted, setMounted] = useState(false);

  const { data: session, status } = useSession();

  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

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
    } catch {
      console.error('Failed to load guestbook');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: MessageForm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEntry = await response.json();
        setEntries((prev) => [newEntry, ...prev]);
        form.reset();
        toast.success('Message posted.');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to post.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    const entry = entries.find((e) => e.id === messageId);
    if (!entry) return;

    setEntryToDelete(entry);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!entryToDelete) return;

    setDeletingId(entryToDelete.id);
    setDeleteModalOpen(false);

    try {
      const response = await fetch(`/api/guestbook?id=${entryToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== entryToDelete.id));
        toast.success('Message deleted successfully.');
      } else {
        toast.error('Failed to delete message.');
      }
    } catch {
      toast.error('Error deleting message.');
    } finally {
      setDeletingId(null);
      setEntryToDelete(null);
    }
  };

  const togglePin = async (messageId: string, currentlyPinned: boolean) => {
    try {
      const action = currentlyPinned ? 'unpin' : 'pin';
      const response = await fetch(`/api/guestbook?id=${messageId}&action=${action}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        const updatedEntry = await response.json();
        // Update local state with the returned entry
        setEntries((prev) => prev.map((entry) => (entry.id === messageId ? updatedEntry : entry)));
        // Re-fetch to ensure proper sorting
        await fetchGuestbook();
        toast.success(currentlyPinned ? 'Message unpinned.' : 'Message pinned.');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to toggle pin.');
      }
    } catch {
      toast.error('Error toggling pin.');
    }
  };

  // Full page skeleton while mounting
  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-8">
        {/* Header Skeleton */}
        <div className="mb-12 space-y-2">
          <div className="h-10 w-48 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full max-w-md animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Authentication / Input Area Skeleton */}
        <div className="mb-16">
          <div className="border border-dashed border-border rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-48 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
            <div className="h-10 w-24 rounded-md animate-pulse bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>

        {/* Message Feed Skeleton */}
        <div className="space-y-0 divide-y divide-border/40">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-6 first:pt-0 flex gap-3 sm:gap-4 px-2 -mx-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-16 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="h-4 w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isAdmin = session?.user?.username === 'MannuVilasara';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-8 animate-in fade-in duration-700">
      {/* 1. Header: Minimal & Clean */}
      <div className="mb-12 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Guestbook</h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
          Leave a permanent mark. Share thoughts, feedback, or just verify your visit.
        </p>
      </div>

      {/* 2. Authentication / Input Area */}
      <div className="mb-16">
        {status === 'loading' ? (
          <div className="h-24 w-full bg-muted/10 animate-pulse rounded-md border border-border/50" />
        ) : session ? (
          <div className="space-y-4">
            {/* User State */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                <span>
                  Signed in as{' '}
                  <span className="font-medium text-foreground">{session.user.name}</span>
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="text-xs hover:text-foreground transition-colors text-muted-foreground underline decoration-muted-foreground/30 hover:decoration-foreground"
              >
                Sign out
              </button>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative group">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message..."
                          {...field}
                          rows={3}
                          className="resize-none bg-background border-muted-foreground/20 focus:border-foreground transition-all rounded-md px-4 py-3 text-sm sm:text-base"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-muted-foreground">
                    {form.watch('message')?.length || 0}/500
                  </span>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.formState.isValid}
                    size="sm"
                    className="rounded-full px-5 bg-foreground text-background hover:bg-foreground/80 transition-opacity"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Post</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          /* Guest State: Simple Call to Action */
          <div className="border border-dashed border-border rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-muted/5">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="p-3 bg-background border border-border rounded-full shrink-0">
                <Terminal className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">Sign in to write</p>
                <p className="text-xs text-muted-foreground">
                  Authenticate via GitHub to prevent spam.
                </p>
              </div>
            </div>
            <Button
              onClick={() => signIn('github')}
              variant="outline"
              className="bg-background hover:bg-muted border-border text-foreground h-10 px-6 shrink-0"
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        )}
      </div>

      {/* 3. Message Feed */}
      <div className="space-y-8">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 opacity-50">
                <div className="h-10 w-10 rounded-full bg-muted/20 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/4 bg-muted/20 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-muted/20 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No entries yet. Be the first.
          </div>
        ) : (
          <div className="flex flex-col gap-0 divide-y divide-border/40">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="group py-6 first:pt-0 flex gap-3 sm:gap-4 transition-colors hover:bg-muted/5 px-2 -mx-2 rounded-md"
              >
                {/* Avatar */}
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-border/50 shrink-0">
                  <AvatarImage src={entry.avatar} alt={entry.author} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                    {entry.author?.[0]}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-foreground">{entry.author}</span>

                      {entry.pinned && (
                        <div title="Pinned message">
                          <Pin className="h-3 w-3 text-blue-600 fill-current" />
                        </div>
                      )}

                      {entry.username === 'MannuVilasara' && (
                        <Badge
                          variant="secondary"
                          className="bg-green-500/10 text-green-700 border-green-500/20 text-xs px-1.5 py-0.5"
                        >
                          Author
                        </Badge>
                      )}

                      {entry.verified && (
                        <div className="text-foreground" title="Verified User">
                          <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-foreground text-background" />
                        </div>
                      )}

                      <span className="text-xs text-muted-foreground/60 select-none">•</span>
                      <span
                        className="text-xs text-muted-foreground"
                        title={new Date(entry.timestamp).toLocaleString()}
                      >
                        {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1">
                      {session?.user.username === 'MannuVilasara' && (
                        <button
                          onClick={() => togglePin(entry.id, entry.pinned ?? false)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-blue-500/10 hover:text-blue-600 rounded-md text-muted-foreground"
                          title={entry.pinned ? 'Unpin message' : 'Pin message'}
                        >
                          <Pin className={`h-3.5 w-3.5 ${entry.pinned ? 'fill-current' : ''}`} />
                        </button>
                      )}

                      {/* Delete Action */}
                      {session && (entry.username === session.user.username || isAdmin) && (
                        <button
                          onClick={() => deleteMessage(entry.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-500/10 hover:text-red-600 rounded-md text-muted-foreground"
                          title="Delete message"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-[15px] leading-relaxed text-foreground/80 wrap-break-word whitespace-pre-wrap font-normal">
                    {entry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && entryToDelete && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-background border border-border rounded-lg shadow-lg max-w-[400px] w-full p-6 space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                Delete Message
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Are you sure you want to remove this message? This action cannot be undone.
              </p>
            </div>

            {/* Minimal Preview */}
            <div className="bg-muted/30 border border-border/50 rounded-md p-3">
              <p className="text-sm text-foreground/80 line-clamp-2 italic">
                "{entryToDelete.message}"
              </p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setEntryToDelete(null);
                }}
                className="h-9 text-muted-foreground hover:text-foreground"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deletingId === entryToDelete.id}
                className="h-9 bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                {deletingId === entryToDelete.id ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-2" />
                ) : null}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
