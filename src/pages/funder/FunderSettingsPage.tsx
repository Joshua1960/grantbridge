import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  Shield,
  Camera,
  Check,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAppStore } from "../../lib/store";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function FunderSettingsPage() {
  const { user, updateUser } = useAppStore();
  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications" | "privacy"
  >("profile");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ||
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  );
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    company: user?.company || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    projectUpdates: true,
    fundingAlerts: true,
    weeklyDigest: false,
    marketingEmails: false,
    pushNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showInvestments: false,
    allowMessages: true,
    showEmail: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    updateUser(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = () => {
    const errs: Record<string, string> = {};
    if (!passwordForm.currentPassword)
      errs.currentPassword = "Current password is required";
    if (!passwordForm.newPassword)
      errs.newPassword = "New password is required";
    else if (passwordForm.newPassword.length < 8)
      errs.newPassword = "Password must be at least 8 characters";
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // Simulate password change
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "security" as const, label: "Security", icon: Lock },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "privacy" as const, label: "Privacy", icon: Shield },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[26px] sm:text-[30px] font-bold text-slate-900 font-[Outfit] tracking-tight">
          Settings
        </h1>
        <p className="text-[13px] text-slate-500 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3"
        >
          <Check size={20} className="text-emerald-600" />
          <p className="text-sm font-medium text-emerald-700">
            Settings saved successfully!
          </p>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-100 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8"
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-[18px] font-semibold text-slate-800 font-[Outfit] mb-6">
                  Profile Information
                </h2>

                {/* Avatar Upload */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera size={24} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-1">
                      Profile Picture
                    </p>
                    <p className="text-xs text-slate-500">
                      Upload a new avatar. JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      Company
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    onClick={handleProfileSave}
                    icon={<Save size={16} />}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-[18px] font-semibold text-slate-800 font-[Outfit] mb-6">
                  Change Password
                </h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            currentPassword: e.target.value,
                          })
                        }
                        placeholder="Enter current password"
                        error={errors.currentPassword}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showCurrentPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="Enter new password"
                        error={errors.newPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showNewPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-slate-600 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordForm.confirmPassword}
                        onChange={(e) =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Confirm new password"
                        error={errors.confirmPassword}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    onClick={handlePasswordChange}
                    icon={<Save size={16} />}
                  >
                    Update Password
                  </Button>
                </div>

                {/* Two-Factor Auth */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        Two-Factor Authentication
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-[18px] font-semibold text-slate-800 font-[Outfit] mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      key: "emailUpdates",
                      label: "Email Updates",
                      desc: "Receive important account updates via email",
                    },
                    {
                      key: "projectUpdates",
                      label: "Project Updates",
                      desc: "Get notified about projects you've funded",
                    },
                    {
                      key: "fundingAlerts",
                      label: "Funding Alerts",
                      desc: "Alerts when projects reach funding milestones",
                    },
                    {
                      key: "weeklyDigest",
                      label: "Weekly Digest",
                      desc: "Weekly summary of activity and opportunities",
                    },
                    {
                      key: "marketingEmails",
                      label: "Marketing Emails",
                      desc: "News, features, and promotional content",
                    },
                    {
                      key: "pushNotifications",
                      label: "Push Notifications",
                      desc: "Receive browser push notifications",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start justify-between p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={
                            notifications[
                              item.key as keyof typeof notifications
                            ]
                          }
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 3000);
                    }}
                    icon={<Save size={16} />}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h2 className="text-[18px] font-semibold text-slate-800 font-[Outfit] mb-6">
                  Privacy Settings
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      key: "showProfile",
                      label: "Public Profile",
                      desc: "Allow others to see your profile",
                    },
                    {
                      key: "showInvestments",
                      label: "Show Investments",
                      desc: "Display your funded projects publicly",
                    },
                    {
                      key: "allowMessages",
                      label: "Allow Messages",
                      desc: "Let entrepreneurs send you messages",
                    },
                    {
                      key: "showEmail",
                      label: "Show Email",
                      desc: "Display email address on your profile",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-start justify-between p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input
                          type="checkbox"
                          checked={privacy[item.key as keyof typeof privacy]}
                          onChange={(e) =>
                            setPrivacy({
                              ...privacy,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setSaveSuccess(true);
                      setTimeout(() => setSaveSuccess(false), 3000);
                    }}
                    icon={<Save size={16} />}
                  >
                    Save Privacy Settings
                  </Button>
                </div>

                {/* Danger Zone */}
                <div className="pt-6 border-t border-slate-100">
                  <p className="text-sm font-medium text-red-600 mb-3">
                    Danger Zone
                  </p>
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-sm text-slate-700 mb-3">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-100"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
