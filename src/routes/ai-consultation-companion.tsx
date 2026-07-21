import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Bot, Upload, History, ClipboardList, MessageSquare, Pill, Calendar, Sparkles, TriangleAlert as AlertTriangle, Stethoscope, Apple, FlaskConical, Info, HeartPulse } from "lucide-react";

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

type LabStatus = "normal" | "borderline" | "high";

type LabResult = {
  id: string;
  name: string;
  value: string;
  unit: string;
  icon: typeof FlaskConical;
  status: LabStatus;
  measures: string;
  whyItMatters: string;
  simpleExplanation: string;
};

const labResults: LabResult[] = [
  {
    id: "hba1c",
    name: "HbA1c",
    value: "6.8",
    unit: "%",
    icon: FlaskConical,
    status: "borderline",
    measures:
      "HbA1c (glycated haemoglobin) reflects your average blood sugar over the past 2–3 months. Unlike a fasting sugar test, it shows the overall trend rather than a single moment.",
    whyItMatters:
      "It is the key marker used to diagnose and monitor diabetes. Higher values mean more sugar has been attached to your red blood cells over time, which can slowly damage blood vessels, nerves, kidneys, and eyes.",
    simpleExplanation:
      "Think of it as a 3-month average of your blood sugar. Your result of 6.8% is slightly above the normal range (below 5.7%). Between 5.7% and 6.4% is considered pre-diabetes, and 6.5% or above usually means diabetes. At 6.8% your sugar control needs attention, but it is not dangerously high — small changes in diet, activity, and medication can bring it down.",
  },
  {
    id: "ldl",
    name: "LDL Cholesterol",
    value: "156",
    unit: "mg/dL",
    icon: HeartPulse,
    status: "high",
    measures:
      "LDL (low-density lipoprotein) is often called 'bad' cholesterol. It carries cholesterol from the liver into the bloodstream, where it can settle on the walls of arteries and form plaques.",
    whyItMatters:
      "Over time, plaque narrows the arteries and reduces blood flow, raising the risk of heart attack and stroke. Keeping LDL low is one of the most effective ways to protect long-term heart health.",
    simpleExplanation:
      "Your LDL of 156 mg/dL is in the high range — ideally it should be under 100 mg/dL (or under 70 mg/dL if you have diabetes or existing heart disease). This doesn't mean something is wrong today, but it is a warning sign worth acting on. Less saturated fat, more fibre, regular walking, and sometimes medication can lower it steadily.",
  },
  {
    id: "hdl",
    name: "HDL Cholesterol",
    value: "42",
    unit: "mg/dL",
    icon: HeartPulse,
    status: "borderline",
    measures:
      "HDL (high-density lipoprotein) is the 'good' cholesterol. It acts like a clean-up crew, picking up excess cholesterol from the blood and carrying it back to the liver for removal.",
    whyItMatters:
      "Higher HDL helps clear the arteries and lowers the risk of heart disease. Low HDL means less of this protective cleaning is happening, which can work against you even if your other numbers look okay.",
    simpleExplanation:
      "Your HDL of 42 mg/dL is borderline — for men, 40 mg/dL or above is acceptable, but 60 mg/dL or more is considered protective. The good news is that exercise is the most effective way to raise HDL. Regular brisk walking, stopping smoking, and healthy fats (like nuts, olive oil, and fish) all help.",
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    value: "18",
    unit: "ng/mL",
    icon: FlaskConical,
    status: "borderline",
    measures:
      "Vitamin D helps your body absorb calcium and phosphorus, the minerals that keep bones, teeth, and muscles strong. It also supports your immune system.",
    whyItMatters:
      "Long-term low vitamin D can lead to weak bones, bone pain, muscle aches, and a higher risk of falls in older adults. It has also been linked to tiredness and low mood.",
    simpleExplanation:
      "Your level of 18 ng/mL is considered insufficient — 30 ng/mL or above is generally adequate. This is very common, especially with limited sun exposure. A simple daily supplement, along with 15–20 minutes of morning sunlight a few times a week, usually brings it back to a healthy range within a few months.",
  },
  {
    id: "blood-pressure",
    name: "Blood Pressure",
    value: "145/90",
    unit: "mmHg",
    icon: HeartPulse,
    status: "high",
    measures:
      "Blood pressure is the force of blood pushing against your artery walls. The first number (systolic) is the pressure when the heart beats; the second (diastolic) is the pressure when the heart rests between beats.",
    whyItMatters:
      "If it stays high over time, the extra strain damages arteries, the heart, the brain, and the kidneys — increasing the risk of heart attack, stroke, and kidney disease. Because it usually has no symptoms, regular checking is the only way to catch it early.",
    simpleExplanation:
      "Your reading of 145/90 mmHg is high. A normal reading is below 120/80 mmHg; 120–129/80–89 is elevated; and 130/80 or above is generally considered hypertension. Yours is in Stage 1 hypertension. The good news is it often responds well to less salt, regular walking, weight management, and the medication you are already taking. Keep checking it at home and sharing the readings with your doctor.",
  },
];

const statusConfig: Record<
  LabStatus,
  { label: string; className: string; dotClass: string }
> = {
  normal: {
    label: "Normal",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotClass: "bg-emerald-500",
  },
  borderline: {
    label: "Borderline",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    dotClass: "bg-amber-500",
  },
  high: {
    label: "High",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    dotClass: "bg-rose-500",
  },
};

function AiConsultationCompanionPage() {
  const [showSummary, setShowSummary] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeResult, setActiveResult] = useState<LabResult | null>(null);

  const handleGenerate = () => {
    if (showSummary) {
      toast("AI summary is already displayed");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSummary(true);
      toast("AI consultation summary generated");
    }, 1400);
  };

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
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            {isGenerating ? "Generating summary..." : "Generate AI Summary"}
          </Button>
          <Button
            size="lg"
            variant="outline"
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

        {showSummary && (
          <div
            className="mt-10 rounded-2xl border border-primary/20 bg-card p-1 animate-enter"
            style={{
              boxShadow: "var(--shadow-soft), 0 0 0 1px var(--primary) / 10%",
              background:
                "linear-gradient(135deg, var(--card) 0%, oklch(0.97 0.02 210 / 0.6) 100%)",
            }}
          >
            <div className="rounded-xl bg-card/80 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center text-primary-foreground"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    AI Consultation Summary
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Generated for {demoPatient.name} • {demoPatient.date}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <section className="animate-fade-in" style={{ animationDelay: "0.05s" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Stethoscope className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        Today's Diagnosis
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {aiSummary.diagnosis}
                    </p>
                  </section>

                  <section className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        Doctor's Advice
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                      {aiSummary.advice.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Pill className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        Medicine Explanations
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {aiSummary.medicines.map((med) => (
                        <div
                          key={med.name}
                          className="rounded-xl border border-border bg-background/60 p-3"
                        >
                          <p className="text-sm font-medium text-foreground">
                            {med.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {med.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="space-y-6">
                  <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Apple className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        Lifestyle Recommendations
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                      {aiSummary.lifestyle.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section
                    className="animate-fade-in rounded-xl border border-destructive/20 bg-destructive/5 p-4"
                    style={{ animationDelay: "0.25s" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <h3 className="text-sm font-semibold text-destructive uppercase tracking-wide">
                        Warning Signs
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                      {aiSummary.warningSigns.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                        Next Appointment
                      </h3>
                    </div>
                    <div className="rounded-xl border border-border bg-background/60 p-4 space-y-2">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Date:</span>{" "}
                        {aiSummary.nextAppointment.date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Doctor:</span>{" "}
                        {aiSummary.nextAppointment.doctor}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Notes:</span>{" "}
                        {aiSummary.nextAppointment.notes}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Tests:</span>{" "}
                        {aiSummary.nextAppointment.tests}
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Explain My Report section */}
        <div
          className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center text-teal-foreground"
              style={{ backgroundColor: "var(--teal)" }}
            >
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Explain My Report
              </h2>
              <p className="text-sm text-muted-foreground">
                Sample laboratory results — tap Explain on any test for a plain-language breakdown.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {labResults.map((result) => {
              const status = statusConfig[result.status];
              return (
                <div
                  key={result.id}
                  className="group rounded-xl border border-border bg-background/60 p-4 transition-all hover:border-primary/30 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">\n                    <div className="flex items-start gap-3">
                      <div
                        className="h-10 w-10 rounded-lg flex items-center justify-center text-teal-foreground shrink-0"
                        style={{ backgroundColor: "var(--teal)" }}
                      >
                        <result.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {result.name}
                        </p>
                        <p className="text-2xl font-bold text-foreground leading-tight">
                          {result.value}
                          <span className="ml-1 text-sm font-normal text-muted-foreground">
                            {result.unit}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.className}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                      />
                      {status.label}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full group-hover:border-primary/40"
                    onClick={() => setActiveResult(result)}
                  >
                    <Info className="h-3.5 w-3.5 mr-1.5" />
                    Explain
                  </Button>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-amber-500 shrink-0" />
            <span>
              These results are sample values for demonstration only. Always
              discuss your actual reports with a qualified doctor before making
              any health decisions.
            </span>
          </p>
        </div>

        <Sheet
          open={activeResult !== null}
          onOpenChange={(open) => {
            if (!open) setActiveResult(null);
          }}
        >
          <SheetContent
            side="right"
            className="w-full sm:max-w-md p-0 flex flex-col"
          >
            {activeResult && (
              <>
                <SheetHeader
                  className="px-6 pt-6 pb-4 border-b border-border"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--card) 0%, oklch(0.97 0.02 210 / 0.6) 100%)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center text-teal-foreground shrink-0"
                      style={{ backgroundColor: "var(--teal)" }}
                    >
                      <activeResult.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <SheetTitle className="text-lg">
                        {activeResult.name}
                      </SheetTitle>
                      <SheetDescription>
                        {activeResult.value} {activeResult.unit}
                      </SheetDescription>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge
                      variant="outline"
                      className={
                        statusConfig[activeResult.status].className
                      }
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                          statusConfig[activeResult.status].dotClass
                        }`}
                      />
                      {statusConfig[activeResult.status].label}
                    </Badge>
                  </div>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6 py-6">
                  <div className="space-y-6">
                    <section>
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                        <FlaskConical className="h-4 w-4 text-primary" />
                        What this test measures
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activeResult.measures}
                      </p>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                        <HeartPulse className="h-4 w-4 text-primary" />
                        Why it matters
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activeResult.whyItMatters}
                      </p>
                    </section>

                    <section>
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground uppercase tracking-wide mb-2">
                        <Info className="h-4 w-4 text-primary" />
                        Your result, explained simply
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activeResult.simpleExplanation}
                      </p>
                    </section>

                    <div
                      className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-amber-800 leading-relaxed">
                          This explanation is for general information only and is
                          not a substitute for professional medical advice. Please
                          consult your doctor before making any decisions about
                          your health, diet, or medication.
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
