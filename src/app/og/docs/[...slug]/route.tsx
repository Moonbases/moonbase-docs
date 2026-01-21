import { apiSource, getApiPageImage, getGuidePageImage, getPluginPageImage, guideSource, pluginSource } from '@/lib/source';
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
      : pageSlugs[0] === 'guide'
        ? guideSource.getPage(pageSlugs.slice(1))
        : pageSlugs[0] === 'plugin'
          ? pluginSource.getPage(pageSlugs.slice(1))
          : null;
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
  const pluginParams = pluginSource.getPages().map((page) => ({
    lang: page.locale,
    slug: getPluginPageImage(page).segments,
  }));

  const apiParams = apiSource.getPages().map((page) => ({
    lang: page.locale,
    slug: getApiPageImage(page).segments,
  }));

  const guideParams = guideSource.getPages().map((page) => ({
    lang: page.locale,
    slug: getGuidePageImage(page).segments,
  }));

  return [...pluginParams, ...apiParams, ...guideParams];
}
