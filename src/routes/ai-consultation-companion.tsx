import { createFileRoute } from "@tanstack/react-router";
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

const cards = [
  {
    icon: ClipboardList,
    title: "Consultation Summary",
    desc: "A concise overview of your visit and key takeaways.",
  },
  {
    icon: MessageSquare,
    title: "Doctor's Advice",
    desc: "Clear explanations of the guidance your doctor provided.",
  },
  {
    icon: Pill,
    title: "Medicine Explanation",
    desc: "What each medicine does and how to take it safely.",
  },
  {
    icon: Calendar,
    title: "Next Follow-up",
    desc: "Recommended next steps and follow-up timings.",
  },
];

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

        <div className="flex flex-wrap gap-3 mb-10">
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
              <h3 className="text-base font-semibold text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
