"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import timer from "@/public/timer.png";

const CreditScore = () => {
  const score = 710;
  const maxScore = 850;
  const filledBars = Math.round((score / maxScore) * 40); // 40 bars total

  return (
    <>
      <div className=" border rounded-xl px-4 py-4 shadow bg-white">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <Image src={timer} alt="timere" width={20} height={20} />
            <p>Credit Score</p>
          </div>

          <button className="border bg-neutral-100 px-4 rounded-md py-1">
            Details
          </button>
        </div>
        <Separator className="mt-4 mb-2" />

        {/* Score Section */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-lg leading-6 text-neutral-600">
              Your{" "}
              <span className="font-medium text-neutral-900">credit score</span>{" "}
              is <span className="font-medium text-neutral-900">{score}</span>
            </div>

            <p className="text-text-sub-600 text-xs leading-4 text-neutral-500">
              This score is considered to be Excellent.
            </p>
          </div>

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">😎</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-6 flex gap-1.5">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`h-10 w-1.5 rounded-md ${
                i < filledBars ? "bg-[#21C36B]" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CreditScore;
