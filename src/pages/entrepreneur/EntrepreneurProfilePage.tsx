import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Edit2,
  Camera,
  ShieldCheck,
  Globe,
  Briefcase,
  Save,
  X,
  GraduationCap,
  Building,
} from "lucide-react";
import { useAppStore } from "../../lib/store";
// import { formatNaira } from "../../lib/format";

export default function EntrepreneurProfilePage() {
  const { user, updateUser } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ||
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  );
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "Amina Ibrahim",
    email: user?.email || "amina.ibrahim@techstart.com",
    phone: user?.phone || "+234 801 234 5678",
    company: user?.company || "TechStart Africa",
    location: "Lagos, Nigeria",
    website: "https://techstartafrica.com",
    bio: "Passionate entrepreneur building technology solutions for African markets. Focused on fintech and digital inclusion.",
    skills: ["Product Management", "UI/UX Design", "Business Strategy"],
    education: "MSc Computer Science, University of Lagos",
    experience: "5+ years in tech startups",
    industry: "Fintech",
    stage: "Growth",
    fundingRaised: 2500000,
    projectsSubmitted: 3,
    joinedDate: "March 2024",
  });

  const handleSave = () => {
    updateUser({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      avatar: avatarUrl,
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        updateUser({ avatar: result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[Outfit] tracking-tight">
              My Profile
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your entrepreneur profile and project portfolio
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors cursor-pointer"
            >
              <Edit2 size={16} />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <X size={16} />
                <span className="text-sm font-medium">Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Save size={16} />
                <span className="text-sm font-medium">Save Changes</span>
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
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {/* Cover Image */}
              <div className="h-32 bg-linear-to-r from-brand-500 via-purple-500 to-pink-500 relative">
                {isEditing && (
                  <button className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors cursor-pointer">
                    <Camera size={16} className="text-white" />
                  </button>
                )}
              </div>

              {/* Avatar */}
              <div className="px-6 pb-6">
                <div className="relative -mt-16 mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-1 right-1 p-2 bg-brand-500 hover:bg-brand-600 rounded-lg shadow-lg transition-colors cursor-pointer">
                      <Camera size={14} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-[Outfit]">
                      {formData.fullName}
                    </h2>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <Building size={12} />
                      {formData.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 rounded-full">
                      <ShieldCheck size={10} />
                      Verified Entrepreneur
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {formData.bio}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin size={13} className="text-slate-400" />
                      <span>{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mail size={13} className="text-slate-400" />
                      <span className="truncate">{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Phone size={13} className="text-slate-400" />
                      <span>{formData.phone}</span>
                    </div>
                    {formData.website && (
                      <div className="flex items-center gap-2 text-xs text-slate-600">
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

            {/* Achievements */}
            {/* Account Settings */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800 font-[Outfit]">
                  Account Settings
                </h3>
                <ShieldCheck size={18} className="text-slate-400" />
              </div>

              <div className="space-y-3">
                {[
                  { label: "Change Password", action: "Coming Soon" },
                  { label: "Two-Factor Authentication", action: "Coming Soon" },
                  { label: "Email Notifications", action: "Coming Soon" },
                  { label: "Privacy Settings", action: "Coming Soon" },
                ].map((setting, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {setting.label}
                    </span>
                    <span className="text-xs font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                      {setting.action} →
                    </span>
                  </div>
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
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800 font-[Outfit]">
                  Personal Information
                </h3>
                <User size={18} className="text-slate-400" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Company/Startup
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.company}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.location}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-brand-600 hover:underline flex items-center gap-2"
                    >
                      <Globe size={14} />
                      {formData.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800 font-[Outfit]">
                  Professional Details
                </h3>
                <Briefcase size={18} className="text-slate-400" />
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Industry
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="Fintech">Fintech</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Agriculture">Agriculture</option>
                      <option value="Education">Education</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Clean Tech">Clean Tech</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.industry}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Startup Stage
                  </label>
                  {isEditing ? (
                    <select
                      value={formData.stage}
                      onChange={(e) =>
                        setFormData({ ...formData, stage: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    >
                      <option value="Idea">Idea</option>
                      <option value="MVP">MVP</option>
                      <option value="Growth">Growth</option>
                      <option value="Scale">Scale</option>
                    </select>
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800">
                      {formData.stage}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium border-2 border-dashed border-slate-300 text-slate-500 rounded-full hover:border-brand-400 hover:text-brand-600 transition-colors cursor-pointer">
                        + Add Skill
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Education
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.education}
                      onChange={(e) =>
                        setFormData({ ...formData, education: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <div className="px-4 py-2.5 bg-slate-50 rounded-xl flex items-center gap-3">
                      <GraduationCap size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-800">
                        {formData.education}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Experience
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                    />
                  ) : (
                    <div className="px-4 py-2.5 bg-slate-50 rounded-xl flex items-center gap-3">
                      <Briefcase size={16} className="text-slate-400" />
                      <span className="text-sm text-slate-800">
                        {formData.experience}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 resize-none"
                    />
                  ) : (
                    <p className="px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800 leading-relaxed">
                      {formData.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
