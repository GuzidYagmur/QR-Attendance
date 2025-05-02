"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function getTodayURL() {
  const today = new Date().toISOString().split("T")[0];
  return `https://qr-attendance-amber.vercel.app/attendance/${today}`;
}

export default function QRCodeGenerator() {
  const [attendanceUrl, setAttendanceUrl] = useState("");

  useEffect(() => {
    setAttendanceUrl(getTodayURL());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Bugünün QR Kodu</h2>
      {attendanceUrl && <QRCode value={attendanceUrl} size={256} />}
      <p className="mt-4 text-sm text-gray-600 break-all">{attendanceUrl}</p>
    </div>
  );
}
