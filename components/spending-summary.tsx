"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "@/components/ui/separator";
import { PieChart } from "react-minimal-pie-chart";

const spendingsummary = [
  {
    icon: "/spending/1.png",
    title: "Shopping",
    price: "$900.00",
  },
  {
    icon: "/spending/2.png",
    title: "Utilities",
    price: "$600.00",
  },
  {
    icon: "/spending/3.png",
    title: "Others",
    price: "$200.00",
  },
];

export default function SpendingSummary() {
  return (
    <div className="w-full p-4  border shadow rounded-xl ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/spending/4.png" width={20} height={20} alt="spending" />
          <h2 className="text-lg font-semibold text-[#0E121B]">
            Spending Summary
          </h2>
        </div>

        <Select>
          <SelectTrigger className="h-9 px-3 rounded-xl border text-sm font-medium">
            <SelectValue placeholder="Last Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator className="mb-6" />

      {/* Half Pie Chart */}
      <div className="flex flex-col items-center">
        <div className="max-w-sm -mb-52">
          <PieChart
            data={[
              { title: "Shopping", value: 700, color: "#335CFF" },
              { title: "Utilities", value: 600, color: "#47C2FF" },
              { title: "Others", value: 200, color: "#E1E4EA" },
            ]}
            lineWidth={20}
            startAngle={180}
            lengthAngle={180}
            animate
          />
        </div>

        {/* Spend Info */}
        <p className="text-gray-600 text-xs font-medium uppercase tracking-wide ">
          SPEND
        </p>

        <p className="text-[#0E121B] text-2xl font-medium">$1,800.00</p>
      </div>

      <Separator className="my-6" />

      {/* Spend Categories */}
      {/* Spend Categories */}
      <div className="grid grid-cols-3 text-center">
        {spendingsummary.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-2
      ${index !== spendingsummary.length - 1 ? "border-r" : ""} 
      border-gray-200`}
          >
            <div className="w-12 h-12 rounded-full bg-[#F5F7FA] flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={24}
                height={24}
                className="object-contain"
              />
            </div>

            <p className="text-gray-600 text-xs font-normal leading-4">
              {item.title}
            </p>

            <p className="text-[#0E121B] text-sm font-medium leading-5">
              {item.price}
            </p>
          </div>
        ))}
      </div>

      {/* Footer limit */}
      <div className="mt-6 w-full text-center border rounded-md py-2">
        <span className="text-gray-500 text-sm font-medium">
          Your weekly spending limit is{" "}
        </span>
        <span className="text-gray-500 text-xs font-medium">$2000.</span>
      </div>
    </div>
  );
}
