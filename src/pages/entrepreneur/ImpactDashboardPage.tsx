import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useGetWeeklyProgress } from "../../lib/hooks/useProgressUpdates";
import { useUserPitches } from "../../lib/hooks/usePitches";
import { useAppStore } from "../../lib/store";

export default function ImpactDashboardPage() {
  const { user } = useAppStore();
  const { data: pitches = [] } = useUserPitches(user?.id || "");
  const { data: updates = [] } = useGetWeeklyProgress();

  // Filter updates to only show ones for the current user's projects
  const userPitchIds = new Set(pitches.map((p) => p.id));
  const myUpdates = updates.filter((update) =>
    userPitchIds.has(update.pitchId),
  );

  const metrics = [
    {
      label: "Jobs Created",
      value: "124",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "CO2 Reduced (Tons)",
      value: "850",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "People Educated",
      value: "2,400",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Clean Water Access",
      value: "5,000",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[Outfit] tracking-tight">
          Impact Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track the real-world impact of your funded projects.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-5"
          >
            <p className="text-2xl font-bold text-slate-900 font-[Outfit] mb-1">
              {metric.value}
            </p>
            <p className="text-sm text-slate-500">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 font-[Outfit]">
              Impact Goals
            </h2>
          </div>
          <div className="space-y-6">
            {[
              { label: "Hire 50 local developers", progress: 80 },
              { label: "Launch in 3 new cities", progress: 33 },
              { label: "Reach 10,000 active users", progress: 65 },
            ].map((goal, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700">
                    {goal.label}
                  </span>
                  <span className="text-brand-600 font-semibold">
                    {goal.progress}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="h-full bg-brand-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 font-[Outfit]">
              Recent Milestones (Weekly Updates)
            </h2>
            <ArrowUpRight size={20} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {myUpdates.length > 0 ? (
              myUpdates.slice(0, 5).map((update, i) => {
                const pitch = pitches.find((p) => p.id === update.pitchId);
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-12 text-xs text-slate-400 font-medium pt-1 shrink-0">
                      {new Date(update.weekEnding).toLocaleDateString(
                        undefined,
                        { month: "short", day: "numeric" },
                      )}
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-xl p-3 border border-slate-100">
                      <p className="text-sm font-semibold text-slate-800">
                        {update.wins}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {pitch?.title || "Unknown Project"}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                No weekly updates submitted yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
