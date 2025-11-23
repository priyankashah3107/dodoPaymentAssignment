// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function ApiQueueDemo() {
//   const queue = useRef<any[]>([]);
//   const [processing, setProcessing] = useState(false);
//   const [status, setStatus] = useState("Idle");
//   const [responses, setResponses] = useState<string[]>([]);
//   const [input, setInput] = useState("");

//   const addToQueue = () => {
//     queue.current.push(input || "No Message");
//     setInput("");
//   };

//   useEffect(() => {
//     if (!processing && queue.current.length > 0) {
//       processQueue();
//     }
//   }, [processing]);

//   const processQueue = async () => {
//     if (queue.current.length === 0) return;

//     setProcessing(true);
//     const message = queue.current.shift();
//     setStatus(`Processing: "${message}"`);

//     try {
//       const res = await fetch("/api/echo", {
//         method: "POST",
//         body: JSON.stringify({ message }),
//       });

//       const data = await res.json();

//       if (res.status === 429) {
//         setResponses((prev) => [...prev, `❌ RATE LIMIT: ${data.error}`]);
//       } else {
//         setResponses((prev) => [...prev, `✔ ${data.echo}`]);
//       }
//     } catch (err) {
//       setResponses((prev) => [...prev, "❌ ERROR"]);
//     }

//     setProcessing(false);
//   };

//   return (
//     <div className="p-8 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-3">API Queue System</h1>

//       <input
//         className="border rounded-lg px-4 py-2 w-full mb-4"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Type message..."
//       />

//       <button
//         onClick={addToQueue}
//         className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
//       >
//         Add to Queue
//       </button>

//       <div className="mb-3 text-gray-700">
//         <strong>Queue size:</strong> {queue.current.length}
//       </div>

//       <div className="mb-3 text-gray-700">
//         <strong>Status:</strong> {status}
//       </div>

//       <div className="bg-gray-100 rounded-lg p-4 min-h-32">
//         <strong>Responses:</strong>
//         <ul className="mt-2 space-y-1">
//           {responses.map((r, i) => (
//             <li key={i}>{r}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Job = {
  id: number;
  message: string;
};

export default function QueueDemo() {
  const [queue, setQueue] = useState<Job[]>([]);
  const [processing, setProcessing] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);

  // Add job to queue
  const addJob = () => {
    const newJob = {
      id: Date.now(),
      message: "Hello from job " + queue.length,
    };

    setQueue((prev) => [...prev, newJob]);
  };

  // Process queue
  useEffect(() => {
    if (processing || queue.length === 0) return;

    const job = queue[0];
    setProcessing(true);

    fetch("/api/echo", {
      method: "POST",
      body: JSON.stringify({ message: job.message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponses((prev) => [...prev, data]);
      })
      .finally(() => {
        setQueue((prev) => prev.slice(1)); // remove 1st job
        setProcessing(false);
      });
  }, [queue, processing]);

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">API Queue Demo</h1>

      <Button onClick={addJob} className="px-6 py-4 text-xl">
        Add Request
      </Button>

      <div className="border p-4 rounded-xl">
        <p className="text-lg font-semibold">Queue Length: {queue.length}</p>
        <p className="text-sm text-gray-500">
          Status: {processing ? "Processing..." : "Idle"}
        </p>
      </div>

      <div className="border p-4 rounded-xl space-y-2">
        <h2 className="font-semibold text-lg">Responses</h2>

        {responses.map((res, index) => (
          <pre
            key={index}
            className="bg-gray-100 p-3 rounded-lg text-sm border"
          >
            {JSON.stringify(res, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
}
