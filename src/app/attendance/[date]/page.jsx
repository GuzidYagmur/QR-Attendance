"use client";

import { useState, useEffect } from "react";

export default function AttendancePage({ params }) {
  const { class: className, date } = params;
  const [joined, setJoined] = useState(false);

  const storageKey = `attendance-${className}-${date}`;

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    const hasJoined = storedData.some(
      (entry) => entry.name === localStorage.getItem("joinedName")
    );
    if (hasJoined) {
      setJoined(true);
    }
  }, [storageKey]);

  const handleJoin = () => {
    const name = prompt("Lütfen adınızı girin:");

    if (name) {
      const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

      const alreadyExists = storedData.some((entry) => entry.name === name);
      if (alreadyExists) {
        alert("Bu isim zaten yoklamaya katılmış!");
        setJoined(true);
        return;
      }

      const timestamp = new Date().toLocaleString();
      const updateData = [...storedData, { name, timestamp }];

      localStorage.setItem(storageKey, JSON.stringify(updateData));
      localStorage.setItem("joinedName", name);

      setJoined(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">
        {className} Sınıfı - Yoklama Günü: {date}
      </h1>

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
