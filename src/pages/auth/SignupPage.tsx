import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  MapPin,
  Globe,
} from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import type { UserRole } from "../../lib/store";

export default function SignupPage() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const userRole: UserRole = role === "funder" ? "funder" : "entrepreneur";
  const isEntrepreneur = userRole === "entrepreneur";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
    location: "",
    website: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8)
      errs.password = "Must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!form.agreeTerms) errs.agreeTerms = "You must agree to the terms";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!form.company.trim())
      errs.company = isEntrepreneur
        ? "Company name is required"
        : "Organization name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep1 = () => {
    if (!validateStep1()) return;
    setStep(2);
  };

  const handleStep2 = () => {
    if (!validateStep2()) return;
    navigate(`/verify-email/${role}`, {
      state: {
        email: form.email,
        phone: form.phone,
        fullName: form.fullName,
        company: form.company,
        role: userRole,
      },
    });
  };

  // Password strength
  const getStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = getStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = [
    "",
    "bg-red-400",
    "bg-amber-400",
    "bg-brand-400",
    "bg-brand-500",
  ][strength];

  return (
    <AuthLayout role={userRole} variant="signup">
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2.5 mb-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/25">
            <span className="text-white font-bold text-lg font-[Outfit]">
              G
            </span>
          </div>
          <span className="text-xl font-bold text-slate-800 font-[Outfit] tracking-tight">
            GrantBridge
          </span>
        </Link>
      </div>

      {/* Role Switcher */}
      <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
        <Link
          to="/signup/entrepreneur"
          className={`flex-1 py-2.5 text-center text-[13px] font-medium rounded-lg transition-all ${isEntrepreneur ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          Entrepreneur
        </Link>
        <Link
          to="/signup/funder"
          className={`flex-1 py-2.5 text-center text-[13px] font-medium rounded-lg transition-all ${!isEntrepreneur ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          Funder
        </Link>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-7">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all ${
                step > s
                  ? "bg-brand-500 text-white"
                  : step === s
                    ? "bg-brand-500 text-white"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {step > s ? <CheckCircle2 size={15} /> : s}
            </div>
            <span
              className={`text-[11px] font-medium hidden sm:block ${step >= s ? "text-slate-700" : "text-slate-400"}`}
            >
              {s === 1 ? "Account" : "Details"}
            </span>
            {s < 2 && (
              <div
                className={`flex-1 h-[2px] rounded-full transition-all ${step > s ? "bg-brand-500" : "bg-slate-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h1 className="text-[22px] font-bold text-slate-900 font-[Outfit] mb-1">
              Create your account
            </h1>
            <p className="text-[13px] text-slate-500 mb-6">
              {isEntrepreneur
                ? "Start pitching your ideas to the world"
                : "Start discovering investment opportunities"}
            </p>

            <div className="space-y-3.5">
              <Input
                label="Full Name"
                placeholder={
                  isEntrepreneur ? "e.g. Adaeze Okafor" : "e.g. Sarah Williams"
                }
                icon={<User size={17} />}
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                error={errors.fullName}
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={17} />}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                error={errors.email}
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Minimum 8 characters"
                  icon={<Lock size={17} />}
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  error={errors.password}
                />
                {form.password && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : "bg-slate-200"}`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${strength >= 3 ? "text-brand-600" : strength >= 2 ? "text-amber-600" : "text-red-500"}`}
                    >
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                icon={<Lock size={17} />}
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                error={errors.confirmPassword}
              />

              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => updateField("agreeTerms", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-[12px] text-slate-500 leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-brand-600 hover:underline font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-brand-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-[11px] text-red-500 -mt-1">
                  {errors.agreeTerms}
                </p>
              )}

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleStep1}
                icon={<ArrowRight size={17} />}
              >
                Continue
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[11px] text-slate-400">
                  or sign up with
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-xl text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                <svg
                  className="w-4.5 h-4.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </button>
            </div>

            <p className="mt-6 text-center text-[13px] text-slate-500">
              Already have an account?{" "}
              <Link
                to={`/login/${role}`}
                className="text-brand-600 font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-700 mb-5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} /> Back
            </button>

            <h1 className="text-[22px] font-bold text-slate-900 font-[Outfit] mb-1">
              {isEntrepreneur
                ? "About Your Business"
                : "About Your Organization"}
            </h1>
            <p className="text-[13px] text-slate-500 mb-6">
              {isEntrepreneur
                ? "Help funders learn more about your venture"
                : "Tell us about your investment firm"}
            </p>

            <div className="space-y-3.5">
              <Input
                label={
                  isEntrepreneur
                    ? "Company / Startup Name"
                    : "Organization Name"
                }
                placeholder={
                  isEntrepreneur
                    ? "e.g. AfriWeave Ltd."
                    : "e.g. Lagos Angel Network"
                }
                icon={<Briefcase size={17} />}
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                error={errors.company}
              />
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+234 800 000 0000"
                icon={<Phone size={17} />}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                error={errors.phone}
              />
              <Input
                label="Location"
                placeholder="e.g. Lagos, Nigeria"
                icon={<MapPin size={17} />}
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
              <Input
                label="Website (optional)"
                placeholder="https://yourcompany.com"
                icon={<Globe size={17} />}
                value={form.website}
                onChange={(e) => updateField("website", e.target.value)}
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleStep2}
                icon={<ArrowRight size={17} />}
              >
                Create Account
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
