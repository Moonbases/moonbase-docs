import Link from 'next/link';
import { Rocket, Package, Server } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <div className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 border-b">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Moonbase Documentation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Moonbase is a self-hosted digital storefront platform with built-in payment processing,
          extensible plugin architecture, and a comprehensive REST API. Deploy your own store
          with support for Stripe, PayPal, and Coinbase Commerce.
        </p>
      </div>

      <div className="px-4 py-12 md:py-16 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center mb-8">Choose Your Path</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/docs/guide"
            className="group p-6 border rounded-xl hover:shadow-lg transition-all bg-linear-to-br from-teal-50/50 to-transparent dark:from-teal-950/20 hover:border-teal-500/50"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-4">
              <Rocket className="size-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              Moonbase Guide
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Install, configure, and run your self-hosted Moonbase instance. Set up payment providers and manage your store.
            </p>
            <div className="text-sm text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1">
              Get started
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/docs/plugin"
            className="group p-6 border rounded-xl hover:shadow-lg transition-all bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 hover:border-blue-500/50"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <Package className="size-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Plugin Docs
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Extend Moonbase with custom backend and frontend plugins. Build integrations without touching core code.
            </p>
            <div className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
              Explore plugins
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/docs/api"
            className="group p-6 border rounded-xl hover:shadow-lg transition-all bg-linear-to-br from-pink-50/50 to-transparent dark:from-pink-950/20 hover:border-pink-500/50"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mb-4">
              <Server className="size-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              API Reference
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              REST endpoints for authentication, user data, and file downloads. JWT-based auth with comprehensive examples.
            </p>
            <div className="text-sm text-pink-600 dark:text-pink-400 font-medium flex items-center gap-1">
              View API docs
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
