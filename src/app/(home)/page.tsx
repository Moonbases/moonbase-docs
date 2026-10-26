import Link from 'next/link';
import { Rocket, Puzzle, Code2, CreditCard, Zap, Shield, KeyRound, BadgePercent, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 border-b">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Moonbase
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Self-hosted storefront and license delivery for digital products: payments, subscriptions, signed license tokens, SDKs and plugins.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/docs/guide"
            className="inline-flex items-center gap-2 px-5 py-2.5 underline-offset-4 hover:underline"
          >
            <Rocket className="size-4" />
            Get Started
          </Link>
        </div>
      </div>

      <div className="px-4 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Documentation Sections</h2>
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
            <p className="text-muted-foreground mb-4">
              Install, upgrade from 1.8, configure payments and use every store feature, step by step.
            </p>
            <div className="text-sm text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1">
              Learn more
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/docs/plugin"
            className="group p-6 border rounded-xl hover:shadow-lg transition-all bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-950/20 hover:border-blue-500/50"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
              <Puzzle className="size-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Plugin System
            </h3>
            <p className="text-muted-foreground mb-4">
              Extend the API and the dashboard without touching core code, and migrate 1.8 plugins.
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
              <Code2 className="size-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
              API Reference
            </h3>
            <p className="text-muted-foreground mb-4">
              License tokens and SDKs for your loaders, the admin and reseller APIs, webhooks, and the legacy v1 API.
            </p>
            <div className="text-sm text-pink-600 dark:text-pink-400 font-medium flex items-center gap-1">
              View API docs
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="px-4 py-16 md:py-24 border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <CreditCard className="size-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Payments and Subscriptions</h3>
              <p className="text-muted-foreground">
                Stripe, PayPal and Coinbase Commerce, automatic renewals, invoices, credit notes and Stripe Tax.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <KeyRound className="size-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Licensing for Your Software</h3>
              <p className="text-muted-foreground">
                Ed25519-signed license tokens, device limits, seats and floating licenses, with SDKs for Node.js, Python, C#, C++ and Lua.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <BadgePercent className="size-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Growth Tools</h3>
              <p className="text-muted-foreground">
                Discount and creator codes, gift cards and store credit, bundles, resellers and checkout reminders.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Users className="size-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customers and Staff</h3>
              <p className="text-muted-foreground">
                Customer dashboard, support tickets, reviews, admin permission areas, API keys and an activity log.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Zap className="size-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plugin Architecture</h3>
              <p className="text-muted-foreground">
                Extend functionality with backend and frontend plugins without modifying core code.
              </p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition-all hover:border-primary/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Shield className="size-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Hosted Control</h3>
              <p className="text-muted-foreground">
                Full control over your data and infrastructure, with encrypted secrets and per-account rate limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
