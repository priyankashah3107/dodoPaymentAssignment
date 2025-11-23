"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SpendingCircle } from "./SpendingCircle";

const spendingData = [
  {
    key: "daily",
    label: "Daily",
    percentage: 90,
    limit: 200, // daily limit
    period: "/ day",
  },
  {
    key: "weekly",
    label: "Weekly",
    percentage: 60,
    limit: 1500, // weekly limit
    period: "/ week",
  },
  {
    key: "monthly",
    label: "Monthly",
    percentage: 80,
    limit: 6000, // monthly limit
    period: "/ month",
  },
];

const MyCards = () => {
  return (
    <div className="flex flex-col gap-6 px-4 py-6 border rounded-xl shadow w-full  ">
      {/* HEADER */}
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <Image src="/mycards/bank.png" alt="bank" width={24} height={24} />
          <p className="font-semibold">My Cards</p>
        </div>

        <Button className="bg-white text-black border hover:bg-white">
          <Plus /> Add Card
        </Button>
      </div>

      {/* CARD */}
      <div className="px-2 py-4 border  rounded-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Image src="/avatar/logo.png" alt="logo" width={32} height={32} />
            <Image src="/mycards/wifi.png" alt="wifi" width={20} height={16} />

            <Badge className="gap-1">
              <CheckCircle className="w-3 h-3" />
              Active
            </Badge>
          </div>

          <Image
            src="/mycards/mastercard.png"
            alt="mastercard"
            width={80}
            height={70}
            className="object-contain -mt-4 "
          />
        </div>

        <div className="mt-4">
          <p className="text-gray-500">Savings Card</p>

          <div className="flex justify-between items-center mt-2">
            <h2 className="text-3xl font-bold">$16,058.94</h2>

            <div className="flex gap-2">
              <button className="bg-white border rounded ">
                <ChevronLeft />
              </button>
              <button className="bg-white border rounded">
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SPENDING TABS */}
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          {spendingData.map((item) => (
            <TabsTrigger key={item.key} value={item.key}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* LOOP OVER TABS CONTENT */}
        {spendingData.map((item) => (
          <TabsContent key={item.key} value={item.key}>
            <div className="flex items-center gap-4 mt-4">
              <SpendingCircle value={item.percentage} />

              <div>
                <p className="text-gray-500 font-medium">Spending Limit</p>
                <h1 className="text-xl font-semibold">
                  ${item.limit.toLocaleString()}
                  <span className="text-gray-500"> {item.period}</span>
                </h1>
              </div>

              <button className="bg-white border  rounded-sm ml-auto">
                <ChevronRight />
              </button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MyCards;
