import { Helmet } from "react-helmet-async";

export default function Install() {
  return (
    <main className="min-h-screen px-6 py-12">
      <Helmet>
        <title>Install | Kuantra</title>
        <meta
          name="description"
          content="Quick start instructions for self-hosted Kuantra deployment using Docker Compose."
        />
      </Helmet>

      <section className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-white">Installation Guide</h1>
          <p className="text-white/65">Quick start instructions for self-hosted Kuantra.</p>
        </header>

        <div className="relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <h2 className="font-semibold text-white">1. Download release files</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-white/80">
{`curl -sL https://releases.kuantra.dev/latest/docker-compose.yml -o docker-compose.yml
curl -sL https://releases.kuantra.dev/latest/.env.example -o .env.example`}
          </pre>
        </div>

        <div className="relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <h2 className="font-semibold text-white">2. Configure environment</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-white/80">
{`cp .env.example .env
# set CLERK_* GOOGLE_API_KEY ENCRYPTION_KEY`}
          </pre>
        </div>

        <div className="relative flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
          <h2 className="font-semibold text-white">3. Start services</h2>
          <pre className="mt-2 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-white/80">
{`docker compose up -d --build`}
          </pre>
        </div>
      </section>
    </main>
  );
}
