"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared IntersectionObserver pool — one observer per unique
 * (threshold, rootMargin) key. All Reveal components on a page
 * reuse the same observer instead of creating 20+ instances.
 */

interface ObserverEntry {
  observer: IntersectionObserver;
  callbacks: Map<Element, (isIntersecting: boolean) => void>;
}

const observers = new Map<string, ObserverEntry>();

function getObserverKey(threshold: number, rootMargin: string) {
  return `${threshold}|${rootMargin}`;
}

function getSharedObserver(
  threshold: number,
  rootMargin: string,
): ObserverEntry {
  const key = getObserverKey(threshold, rootMargin);
  const existing = observers.get(key);
  if (existing) return existing;

  const callbacks = new Map<Element, (isIntersecting: boolean) => void>();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const cb = callbacks.get(entry.target);
        if (cb) cb(entry.isIntersecting);
      }
    },
    { threshold, rootMargin },
  );

  const entry: ObserverEntry = { observer, callbacks };
  observers.set(key, entry);
  return entry;
}

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView({
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { observer, callbacks } = getSharedObserver(threshold, rootMargin);

    callbacks.set(el, (isIntersecting) => {
      if (isIntersecting) {
        setInView(true);
        if (once) {
          observer.unobserve(el);
          callbacks.delete(el);
        }
      } else if (!once) {
        setInView(false);
      }
    });

    observer.observe(el);

    return () => {
      observer.unobserve(el);
      callbacks.delete(el);
    };
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
