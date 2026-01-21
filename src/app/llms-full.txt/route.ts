import { apiSource, getLLMText, guideSource, pluginSource } from '@/lib/source';

export const revalidate = false;

export async function GET() {
  const scan = [...pluginSource.getPages(), ...apiSource.getPages(), ...guideSource.getPages()].map(
    getLLMText,
  );
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
