import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Bell, FileHeart, Stethoscope, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  {
    icon: Bell,
    title: "Medicine Reminders",
    desc: "Never miss a dose. Track your daily medications with simple reminders.",
    to: "/reminders" as const,
  },
  {
    icon: FileHeart,
    title: "Health Records",
    desc: "Keep every prescription, report, and visit organized in one secure place.",
    to: "/records" as const,
  },
  {
    icon: Stethoscope,
    title: "Symptom Checker",
    desc: "Describe how you feel and get quick guidance on next steps.",
    to: "/symptom-checker" as const,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <section
        className="text-primary-foreground"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your health, organized in one place.
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
              Apollo Healthcare helps you stay on top of medicines, records, and everyday wellness — all from a single calm dashboard.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/auth">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white/60 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/symptom-checker">Try symptom checker</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-72 h-72 rounded-full bg-white/15 backdrop-blur flex items-center justify-center border border-white/25">
              <ShieldCheck className="h-32 w-32 opacity-90" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Everything you need to stay well</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Three simple tools built around the moments that matter most.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rounded-2xl border border-border bg-card p-7 hover:-translate-y-1 transition-all"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-teal-foreground"
                style={{ backgroundColor: "var(--teal)" }}
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Apollo Healthcare. For personal wellness use.
      </footer>
    </div>
  );
}
