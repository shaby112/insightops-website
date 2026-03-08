import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const downloads = [
  { platform: "macOS", file: "insightops-installer-mac.sh" },
  { platform: "Linux", file: "insightops-installer-linux.sh" },
  { platform: "Windows", file: "insightops-installer-win.ps1" },
];

export default function Downloads() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <section className="mx-auto max-w-4xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold">Downloads</h1>
          <p className="text-muted-foreground">Download installers for self-hosted InsightOps deployments.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>License Key</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-mono text-sm">LIC-PLACEHOLDER-KEY (licensing backend deferred)</p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {downloads.map((d) => (
            <Card key={d.platform}>
              <CardContent className="flex items-center justify-between py-5">
                <div>
                  <p className="font-semibold">{d.platform}</p>
                  <p className="text-xs text-muted-foreground">{d.file}</p>
                </div>
                <Button disabled>Download (Hook Pending)</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
