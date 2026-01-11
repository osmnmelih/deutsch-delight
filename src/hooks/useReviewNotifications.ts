import { useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface UseReviewNotificationsOptions {
  dueWords: number;
  enabled?: boolean;
}

export function useReviewNotifications({ dueWords, enabled = true }: UseReviewNotificationsOptions) {
  const lastNotificationTime = useRef<number>(0);
  const hasShownInitialNotification = useRef(false);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }, []);

  // Show browser notification
  const showBrowserNotification = useCallback((title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'review-reminder',
      });
    }
  }, []);

  // Show in-app toast notification
  const showToastNotification = useCallback((dueCount: number) => {
    const now = Date.now();
    // Don't show more than once per 5 minutes
    if (now - lastNotificationTime.current < 5 * 60 * 1000) {
      return;
    }
    
    lastNotificationTime.current = now;
    
    toast.info(
      `📚 ${dueCount} Wörter zur Wiederholung fällig!`,
      {
        description: `${dueCount} words due for review. Übe jetzt!`,
        duration: 8000,
        action: {
          label: 'Üben / Review',
          onClick: () => {
            // This will be handled by the parent component
            window.dispatchEvent(new CustomEvent('start-review'));
          },
        },
      }
    );
  }, []);

  // Check and notify about due reviews
  useEffect(() => {
    if (!enabled || dueWords === 0) return;

    // Show initial notification when component mounts with due words
    if (!hasShownInitialNotification.current && dueWords > 0) {
      hasShownInitialNotification.current = true;
      // Delay to not overwhelm user on page load
      const timeout = setTimeout(() => {
        showToastNotification(dueWords);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [enabled, dueWords, showToastNotification]);

  // Set up periodic reminders (every 30 minutes if there are due words)
  useEffect(() => {
    if (!enabled) return;

    const checkAndNotify = () => {
      if (dueWords > 0) {
        showToastNotification(dueWords);
      }
    };

    // Check every 30 minutes
    const interval = setInterval(checkAndNotify, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [enabled, dueWords, showToastNotification]);

  return {
    requestPermission,
    showBrowserNotification,
    showToastNotification,
  };
}
