import { useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAppStore } from "../../lib/store";
import type { UserRole } from "../../lib/store";

export default function LoginPage() {
  const { role } = useParams<{ role: string }>();
  // const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const userRole: UserRole = role === "funder" ? "funder" : "entrepreneur";
  const isEntrepreneur = userRole === "entrepreneur";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLogin = () => {
    const errs: Record<string, string> = {};
    if (!form.email.trim()) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    login({
      id: "1",
      email: form.email,
      fullName: isEntrepreneur ? "Adaeze Okafor" : "Sarah Williams",
      role: userRole,
      company: isEntrepreneur ? "AfriWeave Ltd." : "Lagos Angel Network",
      verificationStatus: "submitted",
    });
    // navigate("/dashboard");
  };

  return (
    <AuthLayout role={userRole} variant="login">
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
          to="/login/entrepreneur"
          className={`flex-1 py-2.5 text-center text-[13px] font-medium rounded-lg transition-all ${isEntrepreneur ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          Entrepreneur
        </Link>
        <Link
          to="/login/funder"
          className={`flex-1 py-2.5 text-center text-[13px] font-medium rounded-lg transition-all ${!isEntrepreneur ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
        >
          Funder
        </Link>
      </div>

      <h1 className="text-[22px] font-bold text-slate-900 font-[Outfit] mb-1">
        Log in to your account
      </h1>
      <p className="text-[13px] text-slate-500 mb-6">
        {isEntrepreneur
          ? "Access your entrepreneur dashboard"
          : "Access your funder dashboard"}
      </p>

      <div className="space-y-3.5">
        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={17} />}
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon={<Lock size={17} />}
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-[12px] text-slate-500">Remember me</span>
          </label>
          <Link
            to={`/forgot-password/${role}`}
            className="text-[12px] text-brand-600 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={handleLogin}>
          Log In
          <ArrowRight size={17} />
        </Button>
      </div>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-[11px] text-slate-400">
            or continue with
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
          <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </button>
      </div>

      <p className="mt-6 text-center text-[13px] text-slate-500">
        Don't have an account?{" "}
        <Link
          to={`/signup/${role}`}
          className="text-brand-600 font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
