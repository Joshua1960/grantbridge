// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  // Lightbulb,
  // Users,
  // Shield,
  // Globe,
  ChevronRight,
  // Rocket,
  DollarSign,
  // Handshake,
  // BarChart3,
  Leaf,
  Heart,
  GraduationCap,
  ShoppingBag,
  Cpu,
  Building2,
  Earth,
} from "lucide-react";
import Button from "../components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const categories = [
  {
    name: "Clean Energy",
    icon: Leaf,
    color: "bg-emerald-100 text-emerald-600",
    count: 124,
  },
  {
    name: "HealthTech",
    icon: Heart,
    color: "bg-rose-100 text-rose-600",
    count: 98,
  },
  {
    name: "EdTech",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-600",
    count: 76,
  },
  {
    name: "FinTech",
    icon: DollarSign,
    color: "bg-amber-100 text-amber-600",
    count: 112,
  },
  {
    name: "E-Commerce",
    icon: ShoppingBag,
    color: "bg-purple-100 text-purple-600",
    count: 89,
  },
  {
    name: "AI & Tech",
    icon: Cpu,
    color: "bg-cyan-100 text-cyan-600",
    count: 156,
  },
  {
    name: "AgriTech",
    icon: Leaf,
    color: "bg-lime-100 text-lime-600",
    count: 67,
  },
  {
    name: "Construction",
    icon: Building2,
    color: "bg-orange-100 text-orange-600",
    count: 45,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-white mt-4">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-150 h-150 bg-brand-100/50 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-100 h-100 bg-brand-50 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-75 h-75 bg-emerald-50 rounded-full blur-3xl" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative w-full px-6 sm:px-8 lg:px-10 pt-24 pb-20">
          <div className="flex justify-center items-center w-full">
            {/* Main Content */}
            <div className="max-w-5xl w-full mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-200 rounded-full mb-6"
              >
                <Earth size={14} className="text-brand-500" />
                <span className="text-sm font-semibold text-brand-700 tracking-wide">
                  Built for African Entrepreneur
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.05] tracking-tight "
              >
                Fund a real entrepreneur. <br />
                <span className="relative z-10 text-brand-500">
                  Change a life.
                </span>
              </motion.h1>

              {/* Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg text-slate-500 leading-relaxed"
              >
                GrantBridge connects early-stage entrepreneurs across Africa
                with funders who believe in them. <br /> Direct micro-grants
                that create real impact.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
              >
                {/* <Link to="/signup/entrepreneur"> */}
                <Button variant="primary" size="lg">
                  I am an Entrepreneur
                  <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                </Button>
                {/* </Link> */}

                {/* <Link to="/signup/funder"> */}
                <Button variant="outline" size="lg">
                  I am a Funder
                  <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                </Button>
                {/* </Link> */}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 flex items-center justify-center gap-6"
              >
                <div className="flex -space-x-2">
                  {[
                    "bg-brand-400",
                    "bg-emerald-400",
                    "bg-teal-400",
                    "bg-cyan-400",
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`w-9 h-9 ${bg} rounded-full border-2 border-white flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-sm font-semibold text-slate-800">
                    340+ Entrepreneurs
                  </p>
                  <p className="text-xs text-slate-400">
                    already pitching on GrantBridge
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "₦12.4M", label: "Total Grant Disbursed" },
              { value: "340+", label: "Entrepreneurs" },
              { value: "98%", label: "Project Verified" },
              { value: "10+", label: "Countries" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-brand-600 font-[Outfit]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Trusted By */}

      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-40">
            {[
              "TechStars",
              "Y Combinator",
              "World Bank",
              "UNDP",
              "AfDB",
              "Google.org",
            ].map((name) => (
              <span
                key={name}
                className="text-lg font-bold text-slate-800 font-[Outfit]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {/* <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold text-brand-500 uppercase tracking-widest mb-3"
            >
              Why GrantBridge
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl font-bold text-slate-900 font-[Outfit] tracking-tight"
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
            >
              Whether you're pitching the next big idea or looking for promising
              ventures to fund, we've got you covered.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: "Pitch Builder",
                desc: "Create compelling pitch decks with our guided templates. Showcase your vision, team, and traction.",
                color: "bg-brand-100 text-brand-600",
              },
              {
                icon: Users,
                title: "Smart Matching",
                desc: "Our algorithm connects entrepreneurs with the most relevant funders based on industry and stage.",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Shield,
                title: "Verified Profiles",
                desc: "All users go through identity verification. Build trust with verified badges and track records.",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                desc: "Track views, engagement, and funding progress with real-time analytics and insights.",
                color: "bg-amber-100 text-amber-600",
              },
              {
                icon: Handshake,
                title: "Secure Deals",
                desc: "Built-in escrow and legal templates to make funding deals smooth and transparent.",
                color: "bg-rose-100 text-rose-600",
              },
              {
                icon: Globe,
                title: "Global Reach",
                desc: "Access a worldwide network of funders and entrepreneurs across 50+ countries.",
                color: "bg-cyan-100 text-cyan-600",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={i}
                className="group bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 font-[Outfit]">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* How It Works */}
      {/* <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold text-brand-500 uppercase tracking-widest mb-3"
            >
              Simple Process
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl font-bold text-slate-900 font-[Outfit] tracking-tight"
            >
              How It Works
            </motion.h2>
          </motion.div> */}

      {/* <div className="grid md:grid-cols-2 gap-16"> */}
      {/* Entrepreneurs */}
      {/* <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeUp}
                custom={0}
                className="text-2xl font-bold text-slate-800 mb-8 font-[Outfit] flex items-center gap-3"
              >
                <Rocket size={24} className="text-brand-500" /> For
                Entrepreneurs
              </motion.h3>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Create Your Profile",
                    desc: "Sign up, verify your identity, and build your entrepreneur profile.",
                  },
                  {
                    step: "02",
                    title: "Submit Your Pitch",
                    desc: "Use our guided builder to create a compelling business pitch.",
                  },
                  {
                    step: "03",
                    title: "Get Discovered",
                    desc: "Your pitch goes live and gets matched with relevant funders.",
                  },
                  {
                    step: "04",
                    title: "Secure Funding",
                    desc: "Connect with interested funders and close your funding round.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    variants={fadeUp}
                    custom={i + 1}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

      {/* Funders */}
      {/* <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={fadeUp}
                custom={0}
                className="text-2xl font-bold text-slate-800 mb-8 font-[Outfit] flex items-center gap-3"
              >
                <DollarSign size={24} className="text-brand-500" /> For Funders
              </motion.h3>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Set Your Criteria",
                    desc: "Define your investment preferences, industries, and funding range.",
                  },
                  {
                    step: "02",
                    title: "Discover Pitches",
                    desc: "Browse curated pitches matched to your investment thesis.",
                  },
                  {
                    step: "03",
                    title: "Due Diligence",
                    desc: "Access detailed pitch data, team info, and financial projections.",
                  },
                  {
                    step: "04",
                    title: "Fund & Support",
                    desc: "Make your investment and support entrepreneurs on their journey.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    variants={fadeUp}
                    custom={i + 1}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Categories */}
      <section id="categories" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold text-brand-500 uppercase tracking-widest mb-3"
            >
              Explore
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl font-bold text-slate-900 font-[Outfit] tracking-tight"
            >
              Popular Categories
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
            >
              Discover innovative projects across diverse industries and
              sectors.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                variants={fadeUp}
                custom={i}
                className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-100/80 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <cat.icon size={22} />
                </div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400">{cat.count} projects</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-[Outfit] tracking-tight">
              Ready to make a difference?
            </h2>
            <p className="mt-4 text-lg text-gray-100 max-w-xl mx-auto">
              Join hundreds of entrepreneurs and funders building a better
              Africa, one micro-grant at a time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* <Link to="/signup/entrepreneur"> */}
              <Button variant="white" size="lg">
                Submit your project
                <ArrowRight size={18} />
              </Button>
              {/* </Link> */}
              {/* <Link to="/signup/funder"> */}
              <Button variant="invertedWhite" size="lg">
                Browse Projects
              </Button>
              {/* </Link> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
