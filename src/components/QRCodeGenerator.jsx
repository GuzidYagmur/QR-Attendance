/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { classData } from "../../data/classes";
const classes = ["A", "B", "C"];

export default function GenerateQRPage() {
  const [selectedClass, setSelectedClass] = useState("");
  const [attendanceList, setAttendanceList] = useState([]);
  const [qrValue, setQrValue] = useState("");
  const [qrVisible, setQrVisible] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const storageKey = `attendance-${selectedClass}-${today}`;

  const handleStartAttendance = () => {
    if (!selectedClass) return alert("Lütfen bir sınıf seçin.");
    const key = `https://qr-attendance-amber.vercel.app//attendance/${selectedClass}/${today}`;
    setQrValue(key);
    setQrVisible(true);
  };

  useEffect(() => {
    if (!qrVisible || !selectedClass) return;

    const interval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setAttendanceList(storedData);
    }, 1000);

    return () => clearInterval(interval);
  }, [qrVisible, selectedClass, storageKey]);
  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Yoklama Başlat</h1>

      {!qrVisible && (
        <>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="">Sınıf Seçin</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                Sınıf {cls}
              </option>
            ))}
          </select>

          <button
            onClick={handleStartAttendance}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Yoklama Başlat
          </button>
        </>
      )}

      {qrVisible && qrValue && (
        <div className="p-4 border rounded text-center">
          <QRCodeCanvas value={qrValue} size={250} />
          <p className="mt-2 text-gray-500">{qrValue}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Katılan Öğrenciler:</h2>
            {attendanceList.length === 0 ? (
              <p className="text-gray-500">Henüz kimse katılmadı.</p>
            ) : (
              <ul className="text-left">
                {attendanceList.map((student, index) => (
                  <li key={index}>
                    ✅ {student.name} —{" "}
                    <span className="text-gray-500">{student.timestamp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
