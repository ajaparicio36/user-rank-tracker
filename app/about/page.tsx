"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl font-bold text-primary mb-8 text-center"
          variants={itemVariants}
        >
          About VALORANT Rank Tracker
        </motion.h1>

        <motion.div
          className="bg-white shadow-xl rounded-lg overflow-hidden mb-8"
          variants={itemVariants}
        >
          <Image
            src="/about.png?height=300&width=800"
            alt="VALORANT players"
            width={800}
            height={300}
            className="w-full h-64 object-cover object-center"
          />
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-text mb-4">
              Empowering VALORANT Team Managers
            </h2>
            <p className="text-text mb-4">
              VALORANT Rank Tracker is the ultimate tool for team managers to
              monitor and analyze their players performance. Our platform
              provides real-time updates on player ranks, ratings, and progress,
              enabling managers to make data-driven decisions and optimize team
              strategies.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-8"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Comprehensive Tracking
            </h3>
            <p className="text-text">
              Keep tabs on your players ranks, from Iron to Radiant, and monitor
              their Rank Rating (RR) fluctuations. Our system provides a clear
              overview of each players progress and performance over time.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Real-time Updates
            </h3>
            <p className="text-text">
              Stay informed with instant updates on your players ranks and
              ratings. Our platform syncs with VALORANTs official API to ensure
              you always have the most current information at your fingertips.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Performance Analytics
            </h3>
            <p className="text-text">
              Dive deep into your teams performance with our advanced analytics
              tools. Identify trends, track improvement, and pinpoint areas for
              development to give your team the competitive edge.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              Team Management
            </h3>
            <p className="text-text">
              Easily manage your roster, track player statistics, and organize
              your teams competitive schedule. Our platform streamlines the
              management process, allowing you to focus on strategy and team
              development.
            </p>
          </motion.div>
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Join the Winning Teams
          </h2>
          <p className="text-text mb-6">
            VALORANT Rank Tracker is trusted by top-tier organizations and
            aspiring teams alike. Take your team management to the next level
            and join the ranks of successful VALORANT squads using our platform.
          </p>
          <motion.button
            className="bg-accent text-white font-semibold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
