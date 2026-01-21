'use client';

import { cn } from '@/lib/cn';
import { I18nLabel, useI18n } from 'fumadocs-ui/contexts/i18n';
import {
  ScrollProvider,
  TOCItem,
  type TOCItemType,
  type TableOfContents,
  useActiveAnchors,
} from 'fumadocs-core/toc';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { Text } from 'lucide-react';
import type { ReactNode, RefObject } from 'react';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

const WIGGLE_SIZE = 6;

type TocSvg = {
  path: string;
  width: number;
  height: number;
};

export function SteppedToc({ toc }: { toc?: TableOfContents }) {
  const items = toc ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <div
      id="nd-toc"
      className="sticky top-(--fd-docs-row-1) h-[calc(var(--fd-docs-height)-var(--fd-docs-row-1))] flex flex-col [grid-area:toc] w-(--fd-toc-width) pt-12 pe-4 pb-2 max-xl:hidden"
    >
      <h3 id="toc-title" className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground">
        <Text className="size-4" />
        <I18nLabel label="toc" />
      </h3>
      <TocScrollArea>
        <SteppedTocItems items={items} />
      </TocScrollArea>
    </div>
  );
}

function SteppedTocItems({ items }: { items: TableOfContents }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { text } = useI18n();
  const [svg, setSvg] = useState<TocSvg | undefined>();

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    function onResize() {
      if (container.clientHeight === 0) return;

      let width = 0;
      let height = 0;
      const d: string[] = [];

      for (let i = 0; i < items.length; i += 1) {
        const element = container.querySelector(
          `a[href="#${items[i].url.slice(1)}"]`,
        ) as HTMLElement | null;
        if (!element) continue;
        const styles = getComputedStyle(element);
        const offset = getLineOffset(items[i].depth, i) + 1;
        const top = element.offsetTop + parseFloat(styles.paddingTop);
        const bottom = element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom);
        width = Math.max(offset, width);
        height = Math.max(height, bottom);
        d.push(`${i === 0 ? 'M' : 'L'}${offset} ${top}`);
        d.push(`L${offset} ${bottom}`);
      }

      setSvg({
        path: d.join(' '),
        width: width + 1,
        height,
      });
    }

    const observer = new ResizeObserver(onResize);
    onResize();
    observer.observe(container);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="rounded-lg border bg-fd-card p-3 text-xs text-fd-muted-foreground">
        {text.tocNoHeadings}
      </div>
    );
  }

  return (
    <>
      {svg && (
        <div
          className="absolute start-0 top-0 rtl:-scale-x-100"
          style={{
            width: svg.width,
            height: svg.height,
            maskImage: `url("data:image/svg+xml,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svg.width} ${svg.height}"><path d="${svg.path}" stroke="black" stroke-width="1" fill="none" /></svg>`,
            )}")`,
          }}
        >
          <TocThumb
            containerRef={containerRef}
            className="absolute w-full top-(--fd-top) h-(--fd-height) bg-fd-primary transition-[top,height]"
          />
        </div>
      )}
      <div ref={containerRef} className="flex flex-col">
        {items.map((item, index) => (
          <SteppedTocItem
            key={item.url}
            item={item}
            index={index}
            upper={items[index - 1]}
            lower={items[index + 1]}
          />
        ))}
      </div>
    </>
  );
}

function SteppedTocItem({
  item,
  index,
  upper,
  lower,
}: {
  item: TOCItemType;
  index: number;
  upper?: TOCItemType;
  lower?: TOCItemType;
}) {
  const offset = getLineOffset(item.depth, index);
  const upperOffset = upper ? getLineOffset(upper.depth, index - 1) : offset;
  const lowerOffset = lower ? getLineOffset(lower.depth, index + 1) : offset;

  return (
    <TOCItem
      href={item.url}
      style={{ paddingInlineStart: getItemOffset(item.depth) }}
      className={cn(
        'prose relative py-1.5 text-sm text-fd-muted-foreground hover:text-fd-accent-foreground transition-colors wrap-anywhere first:pt-0 last:pb-0 data-[active=true]:text-fd-primary',
      )}
    >
      {offset !== upperOffset && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className="absolute -top-1.5 start-0 size-4 rtl:-scale-x-100"
        >
          <line
            x1={upperOffset}
            y1="0"
            x2={offset}
            y2="12"
            className="stroke-fd-foreground/10"
            strokeWidth="1"
          />
        </svg>
      )}
      <div
        className={cn(
          'absolute inset-y-0 w-px bg-fd-foreground/10',
          offset !== upperOffset && 'top-1.5',
          offset !== lowerOffset && 'bottom-1.5',
        )}
        style={{ insetInlineStart: offset }}
      />
      {item.title}
    </TOCItem>
  );
}

function getItemOffset(depth: number) {
  if (depth <= 2) return 14;
  if (depth === 3) return 26;
  return 36;
}

function getLineOffset(depth: number, index: number) {
  const base = depth >= 3 ? 10 : 0;
  const safeIndex = Math.max(index, 0);
  const wiggle = safeIndex % 2 === 0 ? 0 : WIGGLE_SIZE;
  return base + wiggle;
}

function TocScrollArea({ children }: { children: ReactNode }) {
  const viewRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={viewRef}
      className="relative min-h-0 text-sm ms-px overflow-auto [scrollbar-width:none] mask-[linear-gradient(to_bottom,transparent,white_16px,white_calc(100%-16px),transparent)] py-3"
    >
      <ScrollProvider containerRef={viewRef}>{children}</ScrollProvider>
    </div>
  );
}

function TocThumb({
  containerRef,
  className,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const thumbRef = useRef<HTMLDivElement>(null);
  const active = useActiveAnchors();

  function update(info: readonly [number, number]) {
    const element = thumbRef.current;
    if (!element) return;
    element.style.setProperty('--fd-top', `${info[0]}px`);
    element.style.setProperty('--fd-height', `${info[1]}px`);
  }

  const onPrint = useEffectEvent(() => {
    if (containerRef.current) update(calc(containerRef.current, active));
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const observer = new ResizeObserver(onPrint);
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [containerRef, onPrint]);

  useOnChange(active, () => {
    if (containerRef.current) update(calc(containerRef.current, active));
  });

  return (
    <div
      ref={thumbRef}
      data-hidden={active.length === 0}
      className={cn('transition-opacity data-[hidden=true]:opacity-0', className)}
    />
  );
}

function calc(container: HTMLDivElement, active: string[]) {
  if (active.length === 0 || container.clientHeight === 0) return [0, 0] as const;
  let upper = Number.MAX_VALUE;
  let lower = 0;
  for (const item of active) {
    const element = container.querySelector(`a[href="#${item}"]`) as HTMLElement | null;
    if (!element) continue;
    const styles = getComputedStyle(element);
    upper = Math.min(upper, element.offsetTop + parseFloat(styles.paddingTop));
    lower = Math.max(lower, element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom));
  }
  return [upper, lower - upper] as const;
}
