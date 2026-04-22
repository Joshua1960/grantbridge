import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import type { UserRole } from '../../lib/store';

export default function ResetPasswordPage() {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const userRole: UserRole = role === 'funder' ? 'funder' : 'entrepreneur';

  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const getStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const strength = getStrength(form.password);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-amber-400', 'bg-brand-400', 'bg-brand-500'][strength];

  const handleReset = () => {
    const errs: Record<string, string> = {};
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Must be at least 8 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSuccess(true);
  };

  if (success) {
    return (
      <AuthLayout role={userRole} variant="success">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 150 }}
            className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-brand-100"
          >
            <CheckCircle2 size={40} className="text-brand-500" />
          </motion.div>

          <h1 className="text-[22px] font-bold text-slate-900 font-[Outfit] mb-2">Password Reset!</h1>
          <p className="text-[13px] text-slate-500 leading-relaxed mb-6 max-w-sm mx-auto">
            Your password has been successfully reset. You can now log in with your new password.
          </p>

          <Button variant="primary" size="lg" fullWidth onClick={() => navigate(`/login/${role}`)} icon={<ArrowRight size={17} />}>
            Go to Login
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout role={userRole} variant="reset">
      <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-5 border border-brand-100">
        <ShieldCheck size={28} className="text-brand-500" />
      </div>

      <h1 className="text-[22px] font-bold text-slate-900 font-[Outfit] mb-1">Reset Password</h1>
      <p className="text-[13px] text-slate-500 mb-6 leading-relaxed">Enter your new password below. Make sure it's at least 8 characters and includes a mix of letters, numbers, and symbols.</p>

      <div className="space-y-3.5">
        <div>
          <Input label="New Password" type="password" placeholder="Minimum 8 characters" icon={<Lock size={17} />} value={form.password} onChange={(e) => { setForm(f => ({...f, password: e.target.value})); setErrors({}); }} error={errors.password} />
          {form.password && (
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-1 flex-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor : 'bg-slate-200'}`} />
                ))}
              </div>
              <span className={`text-[10px] font-semibold ${strength >= 3 ? 'text-brand-600' : strength >= 2 ? 'text-amber-600' : 'text-red-500'}`}>{strengthLabel}</span>
            </div>
          )}
        </div>
        <Input label="Confirm New Password" type="password" placeholder="Re-enter your new password" icon={<Lock size={17} />} value={form.confirmPassword} onChange={(e) => { setForm(f => ({...f, confirmPassword: e.target.value})); setErrors({}); }} error={errors.confirmPassword} />

        <Button variant="primary" size="lg" fullWidth onClick={handleReset} icon={<ArrowRight size={17} />}>Reset Password</Button>
      </div>
    </AuthLayout>
  );
}
