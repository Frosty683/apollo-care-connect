import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Stethoscope, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/symptom-checker")({
  head: () => ({
    meta: [
      { title: "Symptom Checker — Apollo Healthcare" },
      { name: "description", content: "Describe your symptoms and get general guidance." },
    ],
  }),
  component: SymptomPage,
});

type Result = { severity: "low" | "moderate" | "high"; summary: string; advice: string[] };

function analyze(symptoms: string): Result {
  const s = symptoms.toLowerCase();
  const high = ["chest pain", "shortness of breath", "unconscious", "bleeding heavily", "stroke", "seizure", "suicidal"];
  const moderate = ["fever", "vomiting", "diarrhea", "severe", "migraine", "rash", "dizzy", "infection"];
  if (high.some((k) => s.includes(k))) {
    return {
      severity: "high",
      summary: "Your symptoms may need urgent attention.",
      advice: ["Seek emergency care immediately.", "Do not drive yourself if severely unwell.", "Call your local emergency number."],
    };
  }
  if (moderate.some((k) => s.includes(k))) {
    return {
      severity: "moderate",
      summary: "Your symptoms suggest a doctor's visit is advisable.",
      advice: ["Book a consultation with your physician soon.", "Rest, hydrate, and monitor your temperature.", "Note when symptoms worsen or change."],
    };
  }
  return {
    severity: "low",
    summary: "Symptoms appear mild. Home care is usually sufficient.",
    advice: ["Rest and stay hydrated.", "Track how you feel over the next 24–48 hours.", "See a doctor if things don't improve."],
  };
}

function SymptomPage() {
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(analyze(symptoms));
  };

  const severityColor =
    result?.severity === "high"
      ? "var(--destructive)"
      : result?.severity === "moderate"
      ? "oklch(0.72 0.16 65)"
      : "var(--teal)";

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center text-teal-foreground"
            style={{ backgroundColor: "var(--teal)" }}
          >
            <Stethoscope className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Symptom Checker</h1>
            <p className="text-sm text-muted-foreground">Quick, general guidance — not a diagnosis.</p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl bg-card border border-border p-6 mb-6 space-y-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div>
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" min={0} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 34" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="symptoms">Describe your symptoms</Label>
            <Textarea
              id="symptoms"
              required
              rows={5}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Sore throat and mild fever since yesterday..."
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">Check symptoms</Button>
        </form>

        {result && (
          <div
            className="rounded-xl bg-card border-l-4 p-5"
            style={{ borderLeftColor: severityColor }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded"
                style={{ backgroundColor: severityColor, color: "white" }}
              >
                {result.severity}
              </span>
              <h3 className="font-semibold text-foreground">{result.summary}</h3>
            </div>
            <ul className="text-sm text-foreground/80 space-y-1 mt-3 list-disc list-inside">
              {result.advice.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        )}

        <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>This tool provides general information only and is not a substitute for professional medical advice, diagnosis, or treatment.</p>
        </div>
      </div>
    </div>
  );
}