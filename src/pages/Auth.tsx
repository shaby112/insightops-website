import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const freemailDomains = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
];

function extractDomain(email: string): string {
  return email.split("@")[1]?.trim().toLowerCase().replace(/\.+$/, "") || "";
}

function isKuantraBypassDomain(domain: string): boolean {
  return domain === "kuantra.io";
}

function isBlockedFreemailDomain(domain: string): boolean {
  return freemailDomains.some((blocked) => domain === blocked || domain.endsWith(`.${blocked}`));
}

const authSchema = z
  .object({
    email: z.string().email("Please enter a valid email address."),
  })
  .superRefine((data, ctx) => {
    const domain = extractDomain(data.email);

    if (isKuantraBypassDomain(domain)) {
      return;
    }

    if (isBlockedFreemailDomain(domain)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please use your work email address.",
        path: ["email"],
      });
    }
  });

type AuthFormValues = z.infer<typeof authSchema>;

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
    },
  });

  const emailValue = form.watch("email");
  const currentDomain = extractDomain(emailValue || "");
  const isKuantraBypass = isKuantraBypassDomain(currentDomain);

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    console.log("Proceeding with:", data.email);
    // Here it would typically hand off to the next step
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Welcome to Kuantra
          </h1>
          <p className="text-sm text-white/60">
            Enter your work email to continue
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="name@company.com"
                className={`h-12 bg-black/20 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-1 focus-visible:ring-white/20 focus-visible:border-white/20 ${
                  form.formState.errors.email ? "border-red-500/50 focus-visible:ring-red-500/50" : ""
                }`}
                {...form.register("email")}
                autoComplete="email"
                autoFocus
              />
            </div>
            {form.formState.errors.email && (
              <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                <span>{form.formState.errors.email.message}</span>
              </div>
            )}
            {!form.formState.errors.email && isKuantraBypass && (
              <div className="mt-2 text-sm text-emerald-300">
                Kuantra team domain detected. Dev/staging bypass enabled.
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-white text-black hover:bg-white/90 font-medium transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                <span>Continuing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full">
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
