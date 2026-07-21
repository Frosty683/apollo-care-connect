import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileHeart, Trash2, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/records")({
  head: () => ({
    meta: [
      { title: "Health Records — Apollo Healthcare" },
      { name: "description", content: "Store prescriptions, visits and health notes securely." },
    ],
  }),
  component: RecordsPage,
});

type Record = { id: string; title: string; doctor: string | null; date: string | null; notes: string | null };

function RecordsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Record[]>([]);
  const [title, setTitle] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return navigate({ to: "/auth" });
      setReady(true);
      load();
    })();
  }, [navigate]);

  const load = async () => {
    const { data, error } = await supabase.from("health_records").select("*").order("date", { ascending: false, nullsFirst: false });
    if (error) return toast.error(error.message);
    setItems((data ?? []) as Record[]);
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: sess } = await supabase.auth.getSession();
    const user_id = sess.session?.user.id;
    if (!user_id) return;
    const { error } = await supabase.from("health_records").insert({
      user_id,
      title,
      doctor: doctor || null,
      date: date || null,
      notes: notes || null,
    });
    if (error) return toast.error(error.message);
    toast.success("Record saved");
    setTitle(""); setDoctor(""); setDate(""); setNotes("");
    load();
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("health_records").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center text-teal-foreground"
            style={{ backgroundColor: "var(--teal)" }}
          >
            <FileHeart className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Health Records</h1>
            <p className="text-sm text-muted-foreground">All your visits and reports in one place.</p>
          </div>
        </div>

        <form
          onSubmit={add}
          className="rounded-2xl bg-card border border-border p-6 mb-8 space-y-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annual checkup" className="mt-1" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="doctor">Doctor</Label>
              <Input id="doctor" value={doctor} onChange={(e) => setDoctor(e.target.value)} placeholder="Dr. Smith" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Diagnosis, prescriptions, follow-up..." className="mt-1" rows={4} />
          </div>
          <Button type="submit" className="w-full">Save record</Button>
        </form>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">No records yet.</p>
          ) : (
            items.map((r) => (
              <div
                key={r.id}
                className="rounded-xl bg-card border-l-4 border-border p-5 relative"
                style={{ borderLeftColor: "var(--teal)" }}
              >
                <button
                  onClick={() => remove(r.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <h3 className="font-semibold text-foreground pr-8">{r.title}</h3>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  {r.doctor && <span className="flex items-center gap-1"><User className="h-3 w-3" />{r.doctor}</span>}
                  {r.date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{r.date}</span>}
                </div>
                {r.notes && <p className="text-sm text-foreground/80 mt-3 whitespace-pre-wrap">{r.notes}</p>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}