import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Layers,
  MapPin,
  Rocket,
  Send,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useCreatePitch } from "../../lib/hooks/usePitches";
import { useAppStore } from "../../lib/store";

const categories = [
  "AgriTech",
  "Clean Energy",
  "EdTech",
  "Fashion & Textile",
  "FinTech",
  "HealthTech",
  "Logistics",
  "Other",
];
const stages = [
  { value: "idea", label: "Idea" },
  { value: "mvp", label: "MVP" },
  { value: "growth", label: "Growth" },
  { value: "scale", label: "Scale" },
] as const;

const initialForm = {
  title: "",
  category: "FinTech",
  stage: "idea" as "idea" | "mvp" | "growth" | "scale",
  location: "",
  companyName: "",
  description: "",
  problem: "",
  solution: "",
  fundingGoal: "",
  useOfFunds: "",
  timeline: "",
  milestones: "",
  tags: "",
};

const steps = [
  { label: "Project details", icon: FileText },
  { label: "Funding details", icon: Wallet },
  { label: "Review & submit", icon: CheckCircle2 },
];

export default function SubmitProjectPage() {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const createPitch = useCreatePitch();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tags = useMemo(
    () =>
      form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    [form.tags],
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateCurrentStep = () => {
    const nextErrors: Record<string, string> = {};

    if (step === 0) {
      if (!form.title.trim()) nextErrors.title = "Project title is required";
      if (!form.companyName.trim())
        nextErrors.companyName = "Company name is required";
      if (!form.location.trim()) nextErrors.location = "Location is required";
      if (!form.description.trim())
        nextErrors.description = "Project description is required";
      if (!form.problem.trim())
        nextErrors.problem = "Problem statement is required";
      if (!form.solution.trim())
        nextErrors.solution = "Solution summary is required";
    }

    if (step === 1) {
      if (!form.fundingGoal || Number(form.fundingGoal) <= 0)
        nextErrors.fundingGoal = "Enter a valid funding goal";
      if (!form.useOfFunds.trim())
        nextErrors.useOfFunds = "Explain how the funds will be used";
      if (!form.timeline.trim())
        nextErrors.timeline = "Funding timeline is required";
      if (!form.milestones.trim())
        nextErrors.milestones = "Add at least one milestone";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateCurrentStep()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleSubmit = () => {
    if (!validateCurrentStep()) return;

    createPitch.mutate(
      {
        title: form.title,
        category: form.category,
        stage: form.stage,
        location: form.location,
        companyName: form.companyName,
        description: `${form.description}\n\nProblem: ${form.problem}\n\nSolution: ${form.solution}\n\nUse of funds: ${form.useOfFunds}\n\nTimeline: ${form.timeline}\n\nMilestones: ${form.milestones}`,
        fundingGoal: Number(form.fundingGoal),
        tags,
        entrepreneurId: user?.id,
        entrepreneurName: user?.fullName,
      },
      {
        onSuccess: () => navigate("/dashboard/entrepreneur/projects"),
        onError: (error) => {
          setErrors({
            submit:
              error instanceof Error
                ? error.message
                : "Unable to submit project",
          });
        },
      },
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-6">
        <Link
          to="/dashboard/entrepreneur/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 transition-colors mb-4"
        >
          <ArrowLeft size={16} /> Back to projects
        </Link>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold mb-3">
              <Sparkles size={14} /> Entrepreneur pitch builder
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[Outfit]">
              Submit a Project
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Create a clear funding-ready project profile in three continuous
              steps.
            </p>
          </div>
          <div className="text-sm text-slate-500 bg-white border border-slate-100 rounded-xl px-4 py-3">
            Step <span className="font-bold text-brand-600">{step + 1}</span> of{" "}
            {steps.length}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <aside className="bg-white rounded-2xl border border-slate-100 p-4 h-fit sticky top-24">
          <div className="space-y-2">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const active = step === index;
              const done = step > index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => index < step && setStep(index)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${active ? "bg-brand-50 text-brand-700" : done ? "text-emerald-700 hover:bg-emerald-50" : "text-slate-400"}`}
                >
                  <span
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? "bg-brand-500 text-white" : done ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}
                  >
                    {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                  </span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-700 mb-1">
              Submission tip
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Be specific about traction, the exact funding amount, and
              measurable milestones funders can track.
            </p>
          </div>
        </aside>

        <section className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="h-2 bg-slate-100">
            <div
              className="h-full bg-brand-500 transition-all"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div className="p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-[Outfit]">
                      1. Project details
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Tell funders what you are building and why it matters.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Project title"
                      placeholder="e.g. Solar Cold Rooms for Farmers"
                      icon={<Rocket size={17} />}
                      value={form.title}
                      onChange={(e) => updateField("title", e.target.value)}
                      error={errors.title}
                    />
                    <Input
                      label="Company / Startup"
                      placeholder="Your company name"
                      icon={<Layers size={17} />}
                      value={form.companyName}
                      onChange={(e) =>
                        updateField("companyName", e.target.value)
                      }
                      error={errors.companyName}
                    />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Category
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) =>
                          updateField("category", e.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      >
                        {categories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Stage
                      </label>
                      <select
                        value={form.stage}
                        onChange={(e) => updateField("stage", e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      >
                        {stages.map((stageOption) => (
                          <option
                            key={stageOption.value}
                            value={stageOption.value}
                          >
                            {stageOption.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      label="Location"
                      placeholder="Lagos, Nigeria"
                      icon={<MapPin size={17} />}
                      value={form.location}
                      onChange={(e) => updateField("location", e.target.value)}
                      error={errors.location}
                    />
                    <Input
                      label="Tags"
                      placeholder="AI, Agriculture, Marketplace"
                      value={form.tags}
                      onChange={(e) => updateField("tags", e.target.value)}
                    />
                  </div>

                  <TextArea
                    label="Short project description"
                    placeholder="Summarize the product, customer, traction, and impact..."
                    value={form.description}
                    onChange={(value) => updateField("description", value)}
                    error={errors.description}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextArea
                      label="Problem"
                      placeholder="What urgent problem are you solving?"
                      value={form.problem}
                      onChange={(value) => updateField("problem", value)}
                      error={errors.problem}
                    />
                    <TextArea
                      label="Solution"
                      placeholder="How does your solution work?"
                      value={form.solution}
                      onChange={(value) => updateField("solution", value)}
                      error={errors.solution}
                    />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="funding"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-[Outfit]">
                      2. Funding details
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Define exactly how much you need and what it will
                      accomplish.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Funding goal (NGN)"
                      type="number"
                      min="0"
                      placeholder="10000000"
                      icon={<Target size={17} />}
                      value={form.fundingGoal}
                      onChange={(e) =>
                        updateField("fundingGoal", e.target.value)
                      }
                      error={errors.fundingGoal}
                    />
                    <Input
                      label="Funding timeline"
                      placeholder="e.g. 6 months runway"
                      value={form.timeline}
                      onChange={(e) => updateField("timeline", e.target.value)}
                      error={errors.timeline}
                    />
                  </div>
                  <TextArea
                    label="Use of funds"
                    placeholder="Break down hiring, product, operations, marketing, equipment..."
                    value={form.useOfFunds}
                    onChange={(value) => updateField("useOfFunds", value)}
                    error={errors.useOfFunds}
                    rows={5}
                  />
                  <TextArea
                    label="Milestones funders can track"
                    placeholder="Example: Month 1: buy equipment. Month 3: launch pilot. Month 6: reach 2,000 users."
                    value={form.milestones}
                    onChange={(value) => updateField("milestones", value)}
                    error={errors.milestones}
                    rows={5}
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-[Outfit]">
                      3. Review & submit
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Confirm the details before publishing your project for
                      funder review.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="bg-linear-to-br from-brand-500 to-emerald-600 p-6 text-white">
                      <p className="text-sm text-white/70">
                        {form.category} ·{" "}
                        {stages.find((s) => s.value === form.stage)?.label}
                      </p>
                      <h3 className="text-2xl font-bold font-[Outfit] mt-1">
                        {form.title || "Untitled project"}
                      </h3>
                      <p className="text-sm text-white/80 mt-2">
                        {form.companyName || "Company"} ·{" "}
                        {form.location || "Location"}
                      </p>
                    </div>
                    <div className="p-5 grid sm:grid-cols-3 gap-4 border-b border-slate-100">
                      <ReviewMetric
                        label="Funding goal"
                        value={`₦${Number(form.fundingGoal || 0).toLocaleString()}`}
                      />
                      <ReviewMetric
                        label="Timeline"
                        value={form.timeline || "Not set"}
                      />
                      <ReviewMetric
                        label="Tags"
                        value={tags.length ? tags.join(", ") : "None"}
                      />
                    </div>
                    <div className="p-5 space-y-4">
                      <ReviewBlock
                        title="Description"
                        value={form.description}
                      />
                      <ReviewBlock title="Problem" value={form.problem} />
                      <ReviewBlock title="Solution" value={form.solution} />
                      <ReviewBlock
                        title="Use of funds"
                        value={form.useOfFunds}
                      />
                      <ReviewBlock title="Milestones" value={form.milestones} />
                    </div>
                  </div>

                  {errors.submit && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600">
                      {errors.submit}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/60">
            <Button
              variant="ghost"
              size="md"
              onClick={goBack}
              disabled={step === 0}
              icon={<ArrowLeft size={16} />}
            >
              Back
            </Button>
            {step < steps.length - 1 ? (
              <Button variant="primary" size="md" onClick={goNext}>
                Continue
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleSubmit}
                disabled={createPitch.isPending}
                icon={<Send size={16} />}
              >
                {createPitch.isPending ? "Submitting..." : "Submit Project"}
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  error,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-brand-400 focus:ring-2 focus:ring-brand-100 ${error ? "border-red-400 focus:border-red-400 focus:ring-red-100" : ""}`}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function ReviewMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function ReviewBlock({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
        {title}
      </p>
      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
        {value || "Not provided"}
      </p>
    </div>
  );
}
