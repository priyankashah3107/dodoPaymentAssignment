"use client";

import { useEffect, useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Job = {
  id: number;
  message: string;
  timestamp: number;
};

type Response = {
  id: number;
  timestamp: number;
  status: "success" | "error";
  data: any;
  jobMessage: string;
};

export default function QueueDemo() {
  const [queue, setQueue] = useState<Job[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [responses, setResponses] = useState<Response[]>([]);
  const processingRef = useRef(false);

  // TanStack Query mutation for API calls
  const echoMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({
          error: `HTTP ${res.status}: ${res.statusText}`,
        }));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }

      return res.json();
    },
  });

  // Add job to queue
  const addJob = () => {
    const newJob: Job = {
      id: Date.now(),
      message: `Request #${queue.length + responses.length + 1}`,
      timestamp: Date.now(),
    };
    setQueue((prev) => [...prev, newJob]);
  };

  // Process a single job using TanStack Query
  const processJob = async (job: Job) => {
    setCurrentJob(job);
    setProcessing(true);
    processingRef.current = true;

    try {
      const data = await echoMutation.mutateAsync(job.message);

      const response: Response = {
        id: Date.now(),
        timestamp: Date.now(),
        status: "success",
        data,
        jobMessage: job.message,
      };

      setResponses((prev) => [...prev, response]);
    } catch (error) {
      const response: Response = {
        id: Date.now(),
        timestamp: Date.now(),
        status: "error",
        data: {
          error: error instanceof Error ? error.message : "Network error",
        },
        jobMessage: job.message,
      };
      setResponses((prev) => [...prev, response]);
    } finally {
      setProcessing(false);
      setCurrentJob(null);
      processingRef.current = false;
    }
  };

  // Process queue
  useEffect(() => {
    if (processingRef.current || queue.length === 0) return;

    const job = queue[0];
    setQueue((prev) => prev.slice(1));
    processJob(job);
  }, [queue.length]);

  const clearResponses = () => {
    setResponses([]);
  };

  const clearQueue = () => {
    setQueue([]);
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">API Queue System Demo</h1>
        <p className="text-muted-foreground">
          This demo shows how the queue system protects the API from rate limits
          by processing requests sequentially.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button onClick={addJob} className="px-6 py-4 text-lg">
          Add Request to Queue
        </Button>
        <Button
          onClick={clearQueue}
          variant="outline"
          disabled={queue.length === 0}
        >
          Clear Queue
        </Button>
        <Button
          onClick={clearResponses}
          variant="outline"
          disabled={responses.length === 0}
        >
          Clear Responses
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Queue Status</CardTitle>
            <CardDescription>
              Current queue and processing state
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Queued Requests:</span>
              <Badge
                variant={queue.length > 0 ? "default" : "secondary"}
                className="text-lg px-3 py-1"
              >
                {queue.length}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status:</span>
              <Badge
                variant={processing ? "default" : "outline"}
                className="text-lg px-3 py-1"
              >
                {processing ? "Processing..." : "Idle"}
              </Badge>
            </div>
            {currentJob && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Current Request:</p>
                <p className="text-sm text-muted-foreground">
                  {currentJob.message}
                </p>
              </div>
            )}
            {queue.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Pending Jobs:</p>
                <div className="space-y-1">
                  {queue.slice(0, 5).map((job) => (
                    <div
                      key={job.id}
                      className="text-sm text-muted-foreground p-2 bg-muted rounded"
                    >
                      {job.message}
                    </div>
                  ))}
                  {queue.length > 5 && (
                    <p className="text-xs text-muted-foreground">
                      +{queue.length - 5} more...
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Responses</CardTitle>
            <CardDescription>
              {responses.length > 0
                ? `${responses.length} response${
                    responses.length !== 1 ? "s" : ""
                  } received`
                : "No responses yet"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {responses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Responses will appear here after requests are processed
              </p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {responses
                  .slice()
                  .reverse()
                  .map((response) => (
                    <div
                      key={response.id}
                      className={`p-3 rounded-lg border ${
                        response.status === "success"
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          variant={
                            response.status === "success"
                              ? "default"
                              : "destructive"
                          }
                          className="text-xs"
                        >
                          {response.status === "success" ? "Success" : "Error"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(response.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs font-medium mb-1 text-muted-foreground">
                        Job: {response.jobMessage}
                      </p>
                      <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                        {JSON.stringify(response.data, null, 2)}
                      </pre>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            • The API has a rate limit of <strong>5 requests per minute</strong>
          </p>
          <p>
            • Each request takes <strong>2 seconds</strong> to process
            (simulated delay)
          </p>
          <p>
            • The queue system processes requests <strong>one at a time</strong>{" "}
            to avoid hitting the rate limit
          </p>
          <p>
            • Try adding multiple requests quickly to see the queue in action
          </p>
          <p>
            • If you add more than 5 requests within a minute, the queue will
            handle them sequentially
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
