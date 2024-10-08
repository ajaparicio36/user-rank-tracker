"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import EditPlayerForm from "./components/EditPlayerForm";

interface Player {
  id: number;
  name: string;
  ign: string;
  rank: string;
  rr: number;
}

export default function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("/api/players");
        if (!response.ok) {
          throw new Error("Failed to fetch players");
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handleEditClick = (player: Player) => {
    setEditingPlayer(player);
  };

  const handleCloseEdit = () => {
    setEditingPlayer(null);
  };

  const handleUpdatePlayer = (updatedPlayer: Player) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === updatedPlayer.id ? updatedPlayer : player
      )
    );
  };

  const handleDeletePlayer = async (playerId: number) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        const response = await fetch(`/api/players/${playerId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPlayers((prevPlayers) =>
            prevPlayers.filter((player) => player.id !== playerId)
          );
        } else {
          throw new Error("Failed to delete player");
        }
      } catch (error) {
        console.error("Error deleting player:", error);
        alert("Failed to delete player. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Player Profiles</h1>
      {players.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-xl text-text mb-4">No players found</p>
          <Link href="/create" className="text-primary hover:underline">
            Create a new player profile
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-2xl font-semibold text-text mb-2">
                {player.name}
              </h2>
              <p className="text-secondary mb-1">IGN: {player.ign}</p>
              <p className="text-accent mb-1">Rank: {player.rank}</p>
              <p className="text-text mb-4">RR: {player.rr}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(player)}
                  className="flex-1 bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-200"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleDeletePlayer(player.id)}
                  className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-200"
                >
                  Delete Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <Link
        href="/create"
        className="mt-8 inline-block bg-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-200"
      >
        Create New Profile
      </Link>
      {editingPlayer && (
        <EditPlayerForm
          player={editingPlayer}
          isOpen={!!editingPlayer}
          onClose={handleCloseEdit}
          onUpdate={handleUpdatePlayer}
        />
      )}
    </div>
  );
}
