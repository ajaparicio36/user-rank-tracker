"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CreatePage() {
  const [formData, setFormData] = useState({
    name: "",
    ign: "",
    rank: "",
    rr: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Player data submitted successfully!");
        setFormData({ name: "", ign: "", rank: "", rr: 0 });
      } else {
        throw new Error("Failed to submit player data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit player data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-primary mb-6">
          Create Player Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="ign"
              className="block text-sm font-medium text-text mb-1"
            >
              IGN
            </label>
            <input
              type="text"
              id="ign"
              name="ign"
              value={formData.ign}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label
              htmlFor="rank"
              className="block text-sm font-medium text-text mb-1"
            >
              Rank
            </label>
            <select
              id="rank"
              name="rank"
              value={formData.rank}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Rank</option>
              {[
                "Iron",
                "Bronze",
                "Silver",
                "Gold",
                "Platinum",
                "Diamond",
                "Ascendant",
                "Immortal",
                "Radiant",
              ].map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="rr"
              className="block text-sm font-medium text-text mb-1"
            >
              RR
            </label>
            <input
              type="number"
              id="rr"
              name="rr"
              value={formData.rr}
              onChange={handleChange}
              required
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-200"
          >
            Create Profile
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
