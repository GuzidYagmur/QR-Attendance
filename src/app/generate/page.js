/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

function getTodayKey() {
  const today = new Date().toISOString().split("T")[0];
  return `https://yourdomain.com/attendance/${today}`;
}

export default function GenerateQRPage() {
  const [qrValue, setQrValue] = useState("");

  useEffect(() => {
    const key = getTodayKey();
    setQrValue(key);
  }, []);

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Todays QR Code</h1>
      {qrValue && (
        <div className="p-4 border rounded">
          <QRCodeCanvas value={qrValue} size={250} />
          <p className="mt-2 text-center text-gray-500">{qrValue}</p>
        </div>
      )}
    </main>
  );
}
