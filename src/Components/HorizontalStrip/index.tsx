// src/components/HorizontalStrip.tsx
"use client";

import { useRef, useEffect, useCallback } from "react";

export type StripItem<T> = {
  id: T;
  label: string;
  sublabel?: string;
};

type HorizontalStripProps<T extends string | number> = {
  items: StripItem<T>[];
  selectedId: T;
  onSelect: (id: T) => void;
  hideItem?: (item: StripItem<T>) => boolean;
};

export function HorizontalStrip<T extends string | number>({
  items,
  selectedId,
  onSelect,
  hideItem,
}: HorizontalStripProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Map<T, HTMLButtonElement | null>>(new Map());

  const scrollToItem = useCallback((id: T) => {
    const container = scrollRef.current;
    const button = buttonsRef.current.get(id);
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const currentScroll = container.scrollLeft;

    container.scrollTo({
      left: currentScroll + buttonRect.left - containerRect.left - 30,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToItem(selectedId);
  }, [selectedId, scrollToItem]);

  return (
    <div
      ref={scrollRef}
      className="w-full flex gap-3 overflow-x-auto pb-1 scrollbar-none"
    >
      {items.map((item) => {
        const isSelected = selectedId === item.id;
        const hidden = hideItem?.(item) ?? false;

        return (
          <button
            key={String(item.id)}
            ref={(el) => {
              buttonsRef.current.set(item.id, el);
            }}
            onClick={() => onSelect(item.id)}
            className={`
              ${hidden ? "hidden" : ""}
              ${
                isSelected
                  ? "cursor-pointer text-white bg-(--blue-800) px-3 py-1 rounded-2xl shrink-0"
                  : "cursor-pointer border border-black/70 rounded-full px-3 py-1 shrink-0 hover:bg-black/5 transition-colors"
              }
            `}
          >
            {item.label}
            {isSelected && item.sublabel && (
              <>
                , <span className="text-white/60">{item.sublabel}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
