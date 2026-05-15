import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Building2,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Camera,
  ShieldCheck,
  TrendingUp,
  Award,
  Target,
  DollarSign,
  Calendar,
  Globe,
  Briefcase,
  Link2,
  Save,
  X,
} from "lucide-react";
import { useAppStore } from "../../lib/store";

export default function FunderProfilePage() {
  const { user, updateUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const avatarUrl = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face";
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "Michael Johnson",
    email: user?.email || "michael.johnson@ventures.com",
    phone: user?.phone || "+1 (555) 123-4567",
    company: user?.company || "Horizon Ventures",
    location: "San Francisco, CA",
    website: "https://horizonventures.com",
    bio: "Passionate about supporting early-stage startups across Africa. Focus on fintech, healthcare, and sustainable technology.",
    investmentFocus: ["Fintech", "Healthcare", "Sustainability"],
    minInvestment: 50000,
    maxInvestment: 500000,
    totalInvested: 12500000,
    portfolioSize: 12,
    joinedDate: "January 2024",
  });

  const stats = [
    {
      label: "Total Invested",
      value: "$12.5M",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      label: "Portfolio Size",
      value: "12",
      icon: Briefcase,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      label: "Active Deals",
      value: "8",
      icon: TrendingUp,
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      label: "Member Since",
      value: "Jan 2024",
      icon: Calendar,
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  const achievements = [
    {
      title: "Top Funder",
      description: "Top 10% of funders in Q4 2024",
      icon: Award,
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Early Adopter",
      description: "Among the first 100 funders",
      icon: ShieldCheck,
      color: "from-blue-400 to-cyan-500",
    },
    {
      title: "Impact Maker",
      description: "Funded 5+ social impact projects",
      icon: Target,
      color: "from-emerald-400 to-teal-500",
    },
  ];

  const handleSave = () => {
    updateUser({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
    });
    setIsEditing(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[26px] sm:text-[30px] font-bold text-slate-900 font-[Outfit] tracking-tight">
            My Profile
          </h1>
          <p className="text-[13px] text-slate-500 mt-1">
            Manage your funder profile and investment preferences
          </p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
            <span className="text-[13px] font-medium">Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <X size={16} />
              <span className="text-[13px] font-medium">Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Save size={16} />
              <span className="text-[13px] font-medium">Save Changes</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-1 space-y-6"
        >
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Cover Image */}
            <div className="h-32 bg-gradient-to-r from-brand-500 via-emerald-500 to-teal-500 relative">
              {isEditing && (
                <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors cursor-pointer">
                  <Camera size={16} className="text-white" />
                </button>
              )}
            </div>

            {/* Avatar */}
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-slate-100">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-1 right-1 p-2 bg-brand-500 hover:bg-brand-600 rounded-lg shadow-lg transition-colors cursor-pointer">
                    <Camera size={14} className="text-white" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h2 className="text-[20px] font-bold text-slate-900 font-[Outfit]">
                    {formData.fullName}
                  </h2>
                  <p className="text-[13px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 size={12} />
                    {formData.company}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                    <ShieldCheck size={10} />
                    Verified Funder
                  </span>
                </div>

                <p className="text-[13px] text-slate-600 leading-relaxed">
                  {formData.bio}
                </p>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-[12px] text-slate-600">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{formData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-slate-600">
                    <Mail size={13} className="text-slate-400" />
                    <span className="truncate">{formData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-slate-600">
                    <Phone size={13} className="text-slate-400" />
                    <span>{formData.phone}</span>
                  </div>
                  {formData.website && (
                    <div className="flex items-center gap-2 text-[12px] text-slate-600">
                      <Globe size={13} className="text-slate-400" />
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:underline truncate"
                      >
                        {formData.website.replace("https://", "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="text-[14px] font-semibold text-slate-800 font-[Outfit] mb-4">
              Investment Stats
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className={`p-3 rounded-xl border ${stat.color}`}
                >
                  <stat.icon size={18} className="mb-2" />
                  <p className="text-[18px] font-bold text-slate-900 font-[Outfit]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-slate-600 mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="text-[14px] font-semibold text-slate-800 font-[Outfit] mb-4">
              Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, i) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center shrink-0`}
                  >
                    <achievement.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-slate-800">
                      {achievement.title}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Details & Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-semibold text-slate-800 font-[Outfit]">
                Personal Information
              </h3>
              <User size={18} className="text-slate-400" />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                    {formData.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                    {formData.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                    {formData.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Company
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                    {formData.company}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                    {formData.location}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Website
                </label>
                {isEditing ? (
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                  />
                ) : (
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-brand-600 hover:underline flex items-center gap-2"
                  >
                    <Link2 size={14} />
                    {formData.website}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Investment Preferences */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-semibold text-slate-800 font-[Outfit]">
                Investment Preferences
              </h3>
              <Target size={18} className="text-slate-400" />
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Investment Focus Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.investmentFocus.map((focus, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium bg-brand-50 text-brand-700 rounded-full"
                    >
                      {focus}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="inline-flex items-center px-3 py-1.5 text-[12px] font-medium border-2 border-dashed border-slate-300 text-slate-500 rounded-full hover:border-brand-400 hover:text-brand-600 transition-colors cursor-pointer">
                      + Add
                    </button>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-2">
                    Minimum Investment
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.minInvestment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          minInvestment: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                      ${formData.minInvestment.toLocaleString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-slate-600 mb-2">
                    Maximum Investment
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.maxInvestment}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          maxInvestment: Number(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800">
                      ${formData.maxInvestment.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-slate-600 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none"
                  />
                ) : (
                  <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-[13px] text-slate-800 leading-relaxed">
                    {formData.bio}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-semibold text-slate-800 font-[Outfit]">
                Account Settings
              </h3>
              <ShieldCheck size={18} className="text-slate-400" />
            </div>

            <div className="space-y-3">
              {[
                { label: "Change Password", action: "Update" },
                { label: "Two-Factor Authentication", action: "Enable" },
                { label: "Email Notifications", action: "Manage" },
                { label: "Privacy Settings", action: "Configure" },
              ].map((setting, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                  <span className="text-[13px] font-medium text-slate-700">
                    {setting.label}
                  </span>
                  <span className="text-[12px] font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                    {setting.action} →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
