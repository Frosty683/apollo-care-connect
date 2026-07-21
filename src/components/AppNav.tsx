import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

export function AppNav() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const linkCls = "text-sm font-semibold text-foreground/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Apollo Healthcare</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <Link to="/" className={linkCls} activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/reminders" className={linkCls} activeProps={{ className: "text-primary" }}>Reminders</Link>
          <Link to="/records" className={linkCls} activeProps={{ className: "text-primary" }}>Records</Link>
          <Link to="/symptom-checker" className={linkCls} activeProps={{ className: "text-primary" }}>Symptom Checker</Link>
        </nav>
        {email ? (
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            Sign out
          </Button>
        ) : (
          <Button asChild size="sm">
            <Link to="/auth">Sign in</Link>
          </Button>
        )}
      </div>
    </header>
  );
}