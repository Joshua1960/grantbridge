import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Plus, TrendingUp, DollarSign, Eye, Users,
  ChevronRight, MoreVertical, Search, Bell,
  Calendar, CheckCircle2
} from 'lucide-react';
import { useAppStore } from '../../lib/store';
import { useUserPitches } from '../../lib/hooks/usePitches';
import { formatNaira } from '../../components/shared/PitchGridCard';
import Button from '../../components/ui/Button';

export default function EntrepreneurDashboard() {
  const { user } = useAppStore();
  const { data: pitches = [], isLoading } = useUserPitches(user?.id || '');

  const myPitches = pitches.slice(0, 5);
  const totalViews = myPitches.reduce((s, p) => s + p.views, 0);
  const fundedCount = myPitches.filter(p => p.fundingStatus === 'funded').length;
  const totalFundingReceived = myPitches
    .filter(p => p.fundedBy)
    .reduce((sum, p) => sum + (p.fundedBy?.fundedAmount || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-2xl"></div>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-[Outfit] mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-slate-500">
              Welcome back, {user?.fullName || 'Entrepreneur'} 👋
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-64 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-[Outfit] mb-1">
              {myPitches.length}
            </h3>
            <p className="text-sm text-slate-500">Total Projects</p>
          </motion.div>

          {/* Total Funding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                <DollarSign className="text-emerald-600" size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +18%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-[Outfit] mb-1">
              {formatNaira(totalFundingReceived)}
            </h3>
            <p className="text-sm text-slate-500">Total Funding Received</p>
          </motion.div>

          {/* Total Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Eye className="text-purple-600" size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +24%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-[Outfit] mb-1">
              {totalViews.toLocaleString()}
            </h3>
            <p className="text-sm text-slate-500">Total Views</p>
          </motion.div>

          {/* Funded Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-slate-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
                <Users className="text-amber-600" size={24} />
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                +8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-[Outfit] mb-1">
              {fundedCount}
            </h3>
            <p className="text-sm text-slate-500">Funded Projects</p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Projects List - Takes 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 font-[Outfit]">
                    Recent Projects
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {myPitches.length} active projects
                  </p>
                </div>
                <Link to="/dashboard/entrepreneur/projects">
                  <Button variant="outline" size="sm" icon={<ChevronRight size={16} />}>
                    View All
                  </Button>
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {myPitches.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="text-slate-400" size={24} />
                    </div>
                    <h3 className="text-base font-semibold text-slate-700 mb-2">
                      No projects yet
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      Create your first project to get started
                    </p>
                    <Link to="/dashboard/entrepreneur/projects">
                      <Button variant="primary" size="sm" icon={<Plus size={16} />}>
                        Create Project
                      </Button>
                    </Link>
                  </div>
                ) : (
                  myPitches.map((pitch, index) => {
                    const statusConfig = {
                      open: { label: 'Open', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
                      funded: { label: 'Funded', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
                      in_review: { label: 'In Review', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
                      closed: { label: 'Closed', color: 'bg-slate-100 text-slate-600', dot: 'bg-slate-400' },
                    };
                    const status = statusConfig[pitch.fundingStatus];

                    return (
                      <div
                        key={pitch.id}
                        className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-lg">
                              {index + 1}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1">
                                <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                                  {pitch.title.split('—')[0].trim()}
                                </h3>
                                <p className="text-sm text-slate-500 mt-0.5">
                                  {pitch.category} • {pitch.location}
                                </p>
                              </div>
                              <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                                <MoreVertical size={18} className="text-slate-400" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-xs text-slate-500">Funding Goal</p>
                                  <p className="text-sm font-semibold text-slate-900">
                                    {formatNaira(pitch.fundingGoal)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-slate-500">Views</p>
                                  <p className="text-sm font-semibold text-slate-900">
                                    {pitch.views}
                                  </p>
                                </div>
                              </div>

                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${status.color}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                {status.label}
                              </span>
                            </div>

                            {pitch.fundedBy && (
                              <div className="mt-3 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg">
                                <CheckCircle2 size={14} />
                                <span>Funded by {pitch.fundedBy.funderName}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <h3 className="text-base font-semibold text-slate-900 font-[Outfit] mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link to="/dashboard/entrepreneur/projects">
                  <button className="w-full flex items-center gap-3 p-3 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors group">
                    <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center">
                      <Plus className="text-white" size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-slate-900">New Project</p>
                      <p className="text-xs text-slate-500">Create a new pitch</p>
                    </div>
                    <ChevronRight className="text-slate-400 group-hover:text-brand-600" size={18} />
                  </button>
                </Link>

                <button className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="text-purple-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900">View Analytics</p>
                    <p className="text-xs text-slate-500">Track performance</p>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-purple-600" size={18} />
                </button>

                <button className="w-full flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-slate-900">Messages</p>
                    <p className="text-xs text-slate-500">Connect with funders</p>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-blue-600" size={18} />
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <h3 className="text-base font-semibold text-slate-900 font-[Outfit] mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: 'New view on your project',
                    project: 'AfriWeave',
                    time: '2 hours ago',
                    icon: Eye,
                    color: 'bg-blue-50 text-blue-600',
                  },
                  {
                    action: 'Funding offer received',
                    project: 'MediTrack',
                    time: '5 hours ago',
                    icon: DollarSign,
                    color: 'bg-emerald-50 text-emerald-600',
                  },
                  {
                    action: 'Project published',
                    project: 'FarmLink',
                    time: '1 day ago',
                    icon: CheckCircle2,
                    color: 'bg-purple-50 text-purple-600',
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${activity.color}`}>
                      <activity.icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 font-medium">
                        {activity.action}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {activity.project} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-brand-500 to-emerald-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={20} />
                <h3 className="text-base font-semibold font-[Outfit]">
                  Upcoming Event
                </h3>
              </div>
              <p className="text-sm text-white/90 mb-4">
                Investor Pitch Session
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/70">Date</p>
                  <p className="text-sm font-semibold">Feb 15, 2025</p>
                </div>
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
