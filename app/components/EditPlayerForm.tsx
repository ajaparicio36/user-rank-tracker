import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Player {
  id: number;
  name: string;
  ign: string;
  rank: string;
  rr: number;
}

interface EditPlayerFormProps {
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPlayer: Player) => void;
}

export default function EditPlayerForm({
  player,
  isOpen,
  onClose,
  onUpdate,
}: EditPlayerFormProps) {
  const [formData, setFormData] = useState(player);

  useEffect(() => {
    setFormData(player);
  }, [player]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rr" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/players/${player.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedPlayer = await response.json();
        onUpdate(updatedPlayer);
        onClose();
      } else {
        throw new Error("Failed to update player");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update player. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              Edit Player Profile
            </h2>
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
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-text hover:bg-gray-100 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors duration-200"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
