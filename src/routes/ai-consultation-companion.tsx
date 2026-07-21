import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Bot,
  Upload,
  History,
  ClipboardList,
  MessageSquare,
  Pill,
  Calendar,
  Sparkles,
  AlertTriangle,
  Stethoscope,
  HeartPulse,
  Apple,
} from "lucide-react";

export const Route = createFileRoute("/ai-consultation-companion")({
  head: () => ({
    meta: [
      { title: "AI Consultation Companion — Apollo Healthcare" },
      {
        name: "description",
        content:
          "Upload medical reports and get AI-powered consultation summaries, advice, and follow-up guidance.",
      },
    ],
  }),
  component: AiConsultationCompanionPage,
});

const demoPatient = {
  name: "Rajesh Kumar",
  age: 56,
  gender: "Male",
  date: "21 July 2026",
  doctor: "Dr. Priya Sharma",
  diagnoses: ["Mild Hypertension", "Type 2 Diabetes Mellitus"],
  medicines: [
    { name: "Metformin", dosage: "500 mg", frequency: "Twice daily", timing: "After breakfast and dinner", purpose: "Helps your body use insulin better and lowers blood sugar." },
    { name: "Amlodipine", dosage: "5 mg", frequency: "Once daily", timing: "In the morning", purpose: "Relaxes and widens blood vessels to lower blood pressure and improve circulation." },
  ],
};

const cards = [
  {
    icon: ClipboardList,
    title: "Consultation Summary",
    content: (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Date:</span> {demoPatient.date}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Doctor:</span> {demoPatient.doctor}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Reason for visit:</span> Routine follow-up for blood pressure and diabetes management.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Key findings:</span> BP 142/88 mmHg, fasting glucose 128 mg/dL, HbA1c 7.1%. Both conditions are stable with current therapy.
        </p>
      </div>
    ),
  },
  {
    icon: MessageSquare,
    title: "Doctor's Advice",
    content: (
      <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
        <li>Limit salt to less than 5 g per day and reduce processed foods.</li>
        <li>Walk briskly for 30 minutes at least 5 days a week.</li>
        <li>Check fasting blood sugar twice weekly and record readings.</li>
        <li>Maintain 7–8 hours of sleep and practice stress-reduction techniques.</li>
      </ul>
    ),
  },
  {
    icon: Pill,
    title: "Medicine Explanation",
    content: (
      <div className="space-y-3">
        {demoPatient.medicines.map((med) => (
          <div key={med.name} className="text-sm">
            <p className="font-medium text-foreground">{med.name} — {med.dosage}</p>
            <p className="text-muted-foreground">Take {med.frequency.toLowerCase()}, {med.timing.toLowerCase()}.</p>
            <p className="text-muted-foreground">{med.purpose}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Calendar,
    title: "Next Follow-up",
    content: (
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Appointment:</span> 18 August 2026 at 10:30 AM
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Bring:</span> Home BP and glucose log, current medication boxes.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Tests:</span> Fasting lipid profile, HbA1c, serum creatinine.
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Urgent contact:</span> Reach the clinic if BP exceeds 160/100 mmHg or glucose is persistently above 250 mg/dL.
        </p>
      </div>
    ),
  },
];

const aiSummary = {
  diagnosis:
    "Mild Hypertension and Type 2 Diabetes Mellitus — both conditions are currently stable on medication. Blood pressure is mildly elevated at 142/88 mmHg, and HbA1c is 7.1%, indicating reasonable long-term glucose control.",
  advice: [
    "Continue Metformin and Amlodipine exactly as prescribed; do not skip doses.",
    "Monitor home blood pressure twice weekly and fasting glucose twice weekly.",
    "Reduce salt intake to under 5 grams per day and limit processed foods.",
    "Aim for 150 minutes of moderate exercise per week, such as brisk walking.",
  ],
  medicines: [
    {
      name: "Metformin 500 mg",
      explanation:
        "Improves how your body responds to insulin and reduces sugar production in the liver. Take after meals to reduce stomach upset.",
    },
    {
      name: "Amlodipine 5 mg",
      explanation:
        "Relaxes blood vessels so blood flows more easily, lowering blood pressure. Take in the morning for best effect.",
    },
  ],
  lifestyle: [
    "Follow a balanced, low-sodium diet rich in vegetables, whole grains, and lean protein.",
    "Maintain a healthy weight and avoid sugary drinks and refined carbohydrates.",
    "Get 7–8 hours of quality sleep and manage stress through light yoga or breathing exercises.",
    "Avoid smoking and limit alcohol consumption.",
  ],
  warningSigns: [
    "Blood pressure above 160/100 mmHg on repeated readings",
    "Fasting glucose persistently above 250 mg/dL",
    "Chest pain, severe headache, or sudden vision changes",
    "Shortness of breath, swelling in legs, or confusion",
  ],
  nextAppointment: {
    date: "18 August 2026 at 10:30 AM",
    doctor: "Dr. Priya Sharma",
    notes:
      "Bring your home BP and glucose log, current medication boxes, and prior test reports.",
    tests: "Fasting lipid profile, HbA1c, serum creatinine",
  },
};

function AiConsultationCompanionPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-11 w-11 rounded-xl flex items-center justify-center text-teal-foreground"
            style={{ backgroundColor: "var(--teal)" }}
          >
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Apollo AI Consultation Companion
            </h1>
            <p className="text-sm text-muted-foreground">
              Understand your medical journey with AI-powered consultation
              summaries and report explanations.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            size="lg"
            onClick={() => toast("Upload Medical Report coming soon")}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Medical Report
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => toast("Previous Consultations coming soon")}
          >
            <History className="h-4 w-4 mr-2" />
            Open Previous Consultation
          </Button>
        </div>

        <div
          className="rounded-2xl border border-border bg-card p-6 mb-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">{demoPatient.name}</h2>
              <p className="text-sm text-muted-foreground">{demoPatient.age} years • {demoPatient.gender}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {demoPatient.diagnoses.map((diagnosis) => (
                <span
                  key={diagnosis}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  {diagnosis}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {demoPatient.medicines.map((med) => (
              <span
                key={med.name}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 border border-teal-100"
                style={{ backgroundColor: "rgba(0,153,230,0.08)", color: "var(--teal)" }}
              >
                <Pill className="h-3 w-3" />
                {med.name} {med.dosage}
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-card border border-border p-6 hover:-translate-y-1 transition-all"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-teal-foreground"
                style={{ backgroundColor: "var(--teal)" }}
              >
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                {card.title}
              </h3>
              {card.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
