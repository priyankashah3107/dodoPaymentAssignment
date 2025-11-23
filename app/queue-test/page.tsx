// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";

// type Job = {
//   id: number;
//   message: string;
// };

// export default function QueueDemo() {
//   const [queue, setQueue] = useState<Job[]>([]);
//   const [processing, setProcessing] = useState(false);
//   const [responses, setResponses] = useState<any[]>([]);

//   // Add job to queue
//   const addJob = () => {
//     const newJob = {
//       id: Date.now(),
//       message: "Hello from job " + queue.length,
//     };

//     setQueue((prev) => [...prev, newJob]);
//   };

//   // Process queue
//   useEffect(() => {
//     if (processing || queue.length === 0) return;

//     const job = queue[0];
//     setProcessing(true);

//     fetch("/api/echo", {
//       method: "POST",
//       body: JSON.stringify({ message: job.message }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setResponses((prev) => [...prev, data]);
//       })
//       .finally(() => {
//         setQueue((prev) => prev.slice(1)); // remove 1st job
//         setProcessing(false);
//       });
//   }, [queue, processing]);

//   return (
//     <div className="p-10 space-y-6">
//       <h1 className="text-3xl font-bold">API Queue Demo</h1>

//       <Button onClick={addJob} className="px-6 py-4 text-xl">
//         Add Request
//       </Button>

//       <div className="border p-4 rounded-xl">
//         <p className="text-lg font-semibold">Queue Length: {queue.length}</p>
//         <p className="text-sm text-gray-500">
//           Status: {processing ? "Processing..." : "Idle"}
//         </p>
//       </div>

//       <div className="border p-4 rounded-xl space-y-2">
//         <h2 className="font-semibold text-lg">Responses</h2>

//         {responses.map((res, index) => (
//           <pre
//             key={index}
//             className="bg-gray-100 p-3 rounded-lg text-sm border"
//           >
//             {JSON.stringify(res, null, 2)}
//           </pre>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

type Job = {
  id: number;
  message: string;
};

export default function QueueDemo() {
  const [queue, setQueue] = useState<Job[]>([]);
  const [processing, setProcessing] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);

  // React Query mutation
  const echoMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch("/api/echo", {
        method: "POST",
        body: JSON.stringify({ message }),
      });
      return res.json();
    },
  });

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

    echoMutation
      .mutateAsync(job.message)
      .then((data) => {
        setResponses((prev) => [...prev, data]);
      })
      .finally(() => {
        setQueue((prev) => prev.slice(1));
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
