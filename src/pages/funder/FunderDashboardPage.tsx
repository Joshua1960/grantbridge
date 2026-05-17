import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  DollarSign,
  FolderOpen,
  MessageSquare,
  MapPin,
  Search,
  Bell,
  Compass,
  BadgeCheck,
  AlertCircle,
  X,
} from "lucide-react";
import { usePitches } from "../../lib/hooks/usePitches";
import { useAppStore } from "../../lib/store";
import { formatNaira } from "../../lib/format";

const statusColors: Record<string, { bg: string; text: string; dot: string }> =
  {
    active: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
    },
    completed: {
      bg: "bg-brand-50",
      text: "text-brand-700",
      dot: "bg-brand-500",
    },
    pending: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  };

export default function FunderDashboardPage() {
  const { user, updateUser } = useAppStore();
  const { data: pitches = [], isLoading } = usePitches();
  const [showProfilePrompt, setShowProfilePrompt] = useState(
    !user?.profileCompleted,
  );

  // Simulated funder data — projects they've funded
  const fundedProjects = pitches.slice(0, 5).map((p, i) => ({
    ...p,
    amountFunded: [2500000, 3000000, 1500000, 4000000, 1800000][i],
    fundedDate: [
      "Jan 15, 2025",
      "Dec 20, 2024",
      "Jan 08, 2025",
      "Nov 10, 2024",
      "Jan 22, 2025",
    ][i],
    status: (["active", "active", "pending", "completed", "active"] as const)[
      i
    ],
    returnRate: ["+12%", "+8%", "Pending", "+24%", "+6%"][i],
  }));

  const totalFundsGiven = fundedProjects.reduce(
    (sum, p) => sum + p.amountFunded,
    0,
  );
  const projectsFunded = fundedProjects.length;
  const feedbackReceived = 18;

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-300 mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-20 bg-slate-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-300 mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold text-slate-900 font-[Outfit] tracking-tight">
            My Dashboard
          </h1>
          <p className="text-[13px] text-slate-500 mt-0.5">
            Overview of your funding activity and portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-52 pl-9 pr-4 py-2 text-[13px] border border-slate-200 rounded-xl bg-slate-50 placeholder:text-slate-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 focus:bg-white transition-all"
            />
          </div>
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>

      {/* Complete Profile Prompt */}
      {showProfilePrompt && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-linear-to-r from-brand-500 to-emerald-600 rounded-2xl p-5 mb-8 flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white font-[Outfit] mb-1">
              Complete Your Profile
            </h3>
            <p className="text-sm text-brand-100 mb-3">
              Complete your profile to unlock all features and get discovered by
              more entrepreneurs.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/funder/profile"
                onClick={() => {
                  updateUser({ profileCompleted: true });
                  setShowProfilePrompt(false);
                }}
                className="px-5 py-2.5 bg-white hover:bg-brand-50 text-brand-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Complete Profile
              </Link>
              <button
                onClick={() => {
                  updateUser({ profileCompleted: true });
                  setShowProfilePrompt(false);
                }}
                className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Funds Given",
            value: formatNaira(totalFundsGiven),
            icon: DollarSign,
            change: "+18% this quarter",
            trendUp: true,
            color: "bg-brand-50 text-brand-600",
            borderColor: "border-brand-100",
          },
          {
            label: "Projects Funded",
            value: projectsFunded.toString(),
            icon: FolderOpen,
            change: "+2 this month",
            trendUp: true,
            color: "bg-emerald-50 text-emerald-600",
            borderColor: "border-emerald-100",
          },
          {
            label: "Feedback Received",
            value: feedbackReceived.toString(),
            icon: MessageSquare,
            change: "+5 this week",
            trendUp: true,
            color: "bg-blue-50 text-blue-600",
            borderColor: "border-blue-100",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className={`bg-white rounded-2xl border ${stat.borderColor} p-5 sm:p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-200`}
          >
            <p className="text-[26px] sm:text-[30px] font-bold text-slate-900 font-[Outfit] leading-none">
              {stat.value}
            </p>
            <p className="text-[12px] text-slate-400 mt-1.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Funded Projects — 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-slate-100"
        >
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100">
            <div>
              <h2 className="text-[15px] font-semibold text-slate-800 font-[Outfit]">
                My Funded Projects
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {fundedProjects.length} projects in your portfolio
              </p>
            </div>
            <Link
              to="/dashboard/funder/my-projects"
              className="text-[12px] font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1 cursor-pointer"
            >
              View All
            </Link>
          </div>

          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-12 gap-3 px-5 sm:px-6 py-2.5 bg-slate-50/70 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <div className="col-span-4">Project</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Return</div>
            <div className="col-span-2 text-right">Date</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-50">
            {fundedProjects.map((project, i) => {
              const sc = statusColors[project.status];
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={`/dashboard/funder/project/${project.id}`}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center px-5 sm:px-6 py-4 hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  >
                    {/* Project */}
                    <div className="sm:col-span-4 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-linear-to-br ${
                          [
                            "from-brand-400 to-emerald-500",
                            "from-blue-400 to-cyan-500",
                            "from-amber-400 to-orange-500",
                            "from-purple-400 to-pink-500",
                            "from-teal-400 to-cyan-500",
                          ][i]
                        }`}
                      >
                        <span className="text-white text-[12px] font-bold">
                          {project.entrepreneurName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="text-[13px] font-medium text-slate-800 truncate group-hover:text-brand-600 transition-colors">
                            {project.title.split("—")[0].trim()}
                          </p>
                          {project.verified && (
                            <BadgeCheck
                              size={12}
                              className="text-brand-500 shrink-0"
                            />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin size={9} /> {project.location}
                        </p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="sm:col-span-2">
                      <p className="text-[13px] font-semibold text-slate-800">
                        {formatNaira(project.amountFunded)}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="sm:col-span-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full ${sc.bg} ${sc.text}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                        />
                        {project.status.charAt(0).toUpperCase() +
                          project.status.slice(1)}
                      </span>
                    </div>

                    {/* Return */}
                    <div className="sm:col-span-2">
                      <span
                        className={`text-[12px] font-semibold ${
                          project.returnRate.startsWith("+")
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {project.returnRate}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-2">
                      <span className="text-[11px] text-slate-400">
                        {project.fundedDate}
                      </span>
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Project
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Discover CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-linear-to-br from-brand-500 to-emerald-600 rounded-2xl p-5 text-white"
          >
            <Compass size={22} className="text-white/80 mb-2" />
            <p className="text-[14px] font-semibold font-[Outfit] mb-1">
              Discover New Projects
            </p>
            <p className="text-[12px] text-brand-100 leading-relaxed mb-4">
              Browse verified projects from innovative entrepreneurs and grow
              your portfolio.
            </p>
            <Link to="/dashboard/funder/discover">
              <button className="w-full text-[12px] font-semibold text-brand-700 bg-white hover:bg-brand-50 rounded-lg py-2.5 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                <Compass size={13} /> Explore Projects
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
