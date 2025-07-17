// src/pages/Home.jsx
import React from "react";
import UserSelector from "../components/UserSelector";
import ClaimButton from "../components/ClaimButton";
import Leaderboard from "../components/Leaderboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
        🎯 Point Claim System
      </h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div>
          <UserSelector />
          <ClaimButton  />
        </div>
        <Leaderboard  />
      </div>
    </div>
  );
}