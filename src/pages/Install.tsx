import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
export default function Install() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <Helmet>
        <title>Install | Kuantra</title>
        <meta name="description" content="Quick start instructions for self-hosted Kuantra deployment using Docker Compose." />
      </Helmet>

      <section className="mx-auto max-w-4xl space-y-6">

      <header className="mb-8 flex items-center border-b border-border/50 pb-6">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="font-bold text-xl tracking-tight text-primary">Kuantra</span>
        </Link>
      </header>
        <header>
          <h1 className="text-3xl font-bold">Installation Guide</h1>
          <p className="text-muted-foreground">Quick start instructions for self-hosted Kuantra.</p>
        </header>

        <div className="rounded-xl border border-border/60 bg-card/40 p-5">
          <h2 className="font-semibold">1. Download release files</h2>
          <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
{`curl -sL https://releases.kuantra.dev/latest/docker-compose.yml -o docker-compose.yml\ncurl -sL https://releases.kuantra.dev/latest/.env.example -o .env.example`}
          </pre>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/40 p-5">
          <h2 className="font-semibold">2. Configure environment</h2>
          <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
{`cp .env.example .env\n# set CLERK_* GOOGLE_API_KEY ENCRYPTION_KEY`}
          </pre>
        </div>

        <div className="rounded-xl border border-border/60 bg-card/40 p-5">
          <h2 className="font-semibold">3. Start services</h2>
          <pre className="mt-2 overflow-x-auto rounded bg-muted p-3 text-xs">
{`docker compose up -d --build`}
          </pre>
        </div>
      </section>
    </main>
  );
}
