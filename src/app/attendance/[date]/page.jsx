"use client";

import { useState, useEffect } from "react";

export default function AttendancePage({ params }) {
  const [joined, setJoined] = useState(false);

  const storageKey = `attendance-${params.date}`;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    if (storedData.length > 0) {
      setJoined(true);
    }

    console.log("Yoklama Listesi:", storedData);
  }, [storageKey]);

  const handleJoin = () => {
    const name = prompt("Lütfen adınızı girin:");

    if (name) {
      const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

      if (storedData.includes(name)) {
        alert("Bu isim zaten yoklamaya katılmış!");
        setJoined(true);
        return;
      }

      const updatedData = [...storedData, name];
      localStorage.setItem(storageKey, JSON.stringify(updatedData));
      setJoined(true);

      console.log("Güncel Yoklama Listesi:", updatedData);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Yoklama Günü: {params.date}</h1>

      {joined ? (
        <p className="text-green-600 font-semibold">Yoklamaya katıldınız!</p>
      ) : (
        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Yoklamaya Katıl
        </button>
      )}
    </main>
  );
}
