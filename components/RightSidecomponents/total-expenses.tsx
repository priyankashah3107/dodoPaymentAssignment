"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownLeft, ArrowLeft, ArrowUpRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const data = [
  { value: 40 },
  { value: 70 },
  { value: 45 },
  { value: 90 },
  { value: 60 },
  { value: 95 },
  { value: 80 },
];

const TotalExpenses = () => {
  return (
    <Card className="w-full p-6 rounded-3xl shadow-sm">
      {/* Top Section */}
      <div className="flex justify-between w-full mb-6">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full border border-[#D0D5DD] flex items-center justify-center">
          <ArrowDownLeft size={24} className="text-[#4B5563]" />
        </div>

        {/* Line Chart */}
        <div className="w-full max-w-[55%] h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#335CFF"
                strokeWidth={4}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Details */}
      <div className="flex flex-col justify-start">
        <p className="text-text-sub-600 text-sm font-normal leading-5">
          Total Expenses
        </p>

        <div className="flex items-center gap-3 mt-1">
          <p className="text-text-strong-950 text-3xl font-medium leading-10">
            $6,240.28
          </p>
          <Badge
            className="bg-[#FFC0C5] text-[#B42318] rounded-full px-3 py-1 text-sm font-medium"
            variant="secondary"
          >
            -2%
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default TotalExpenses;
