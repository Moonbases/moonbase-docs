import { apiSource, getApiPageImage, getPageImage, source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const slugs = slug ?? [];
  const pageSlugs = slugs.slice(0, -1);
  const page =
    pageSlugs[0] === 'api'
      ? apiSource.getPage(pageSlugs.slice(1))
      : source.getPage(pageSlugs);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site="Moonbase Documentation" />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  const docsParams = source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));

  const apiParams = apiSource.getPages().map((page) => ({
    lang: page.locale,
    slug: getApiPageImage(page).segments,
  }));

  return [...docsParams, ...apiParams];
}
