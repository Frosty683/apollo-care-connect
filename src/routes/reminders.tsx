import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Bell, Trash2, Clock, Pill } from "lucide-react";

export const Route = createFileRoute("/reminders")({
  head: () => ({
    meta: [
      { title: "Medicine Reminders — Apollo Healthcare" },
      { name: "description", content: "Track your daily medications and dosages." },
    ],
  }),
  component: RemindersPage,
});

type Medicine = { id: string; name: string; dosage: string | null; time: string };

function RemindersPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Medicine[]>([]);
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setReady(true);
      load();
    })();
  }, [navigate]);

  const load = async () => {
    const { data, error } = await supabase.from("medicines").select("*").order("time");
    if (error) return toast.error(error.message);
    setItems((data ?? []) as Medicine[]);
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: sess } = await supabase.auth.getSession();
    const user_id = sess.session?.user.id;
    if (!user_id) return;
    const { error } = await supabase.from("medicines").insert({ user_id, name, dosage: dosage || null, time });
    if (error) return toast.error(error.message);
    toast.success("Reminder added");
    setName(""); setDosage(""); setTime("");
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("medicines").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center text-teal-foreground"
            style={{ backgroundColor: "var(--teal)" }}
          >
            <Bell className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Medicine Reminders</h1>
            <p className="text-sm text-muted-foreground">Keep your daily doses on track.</p>
          </div>
        </div>

        <form
          onSubmit={add}
          className="rounded-2xl bg-card border border-border p-6 mb-6 space-y-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Medicine name</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Paracetamol" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="dosage">Dosage</Label>
              <Input id="dosage" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g. 500mg" className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="mt-1" />
          </div>
          <Button type="submit" className="w-full">Add reminder</Button>
        </form>

        <div className="space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No reminders yet. Add your first one above.</p>
          ) : (
            items.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-4 rounded-xl bg-card border border-border p-4"
              >
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent)", color: "var(--accent-foreground)" }}
                >
                  <Pill className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                    {m.dosage && <span>{m.dosage}</span>}
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {m.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => remove(m.id)} aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}