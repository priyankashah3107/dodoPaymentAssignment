"use client";

import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

const mysubscription = [
  {
    icon: "/subs/spotify.png",
    title: "Spotify",
    money: "$7.99",
    plan: "/month",
    status: "Paid",
    statusColor: "bg-[#D1FADF] text-[#039855]",
  },
  {
    icon: "/subs/youtube.png",
    title: "Youtube Music",
    money: "$79.99",
    plan: "/year",
    status: "Expiring",
    statusColor: "bg-[#E4E7EC] text-[#344054]",
  },
  {
    icon: "/subs/amazon.png",
    title: "Prime Video",
    money: "$9.99",
    plan: "/month",
    status: "Paused",
    statusColor: "bg-[#FFECE5] text-[#F04438]",
  },
];

const Mysubscription = () => {
  return (
    <Card className="w-full p-4 rounded-2xl shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/subs/subs.png" width={20} height={20} alt="subs" />
          <h2 className="text-lg font-semibold text-[#0E121B]">
            My Subscriptions
          </h2>
        </div>

        <button className="px-4 py-1 border rounded-lg text-sm font-medium text-[#0E121B]">
          See All
        </button>
      </div>

      {/* Apple Promo Card */}
      <div className="bg-[#F5F7FA] w-full rounded-2xl flex justify-between items-center p-4 overflow-hidden">
        <div className="flex flex-col gap-3 items-start">
          <Image src="/subs/vibe.png" alt="vibe" width={38} height={38} />

          <div>
            <h1 className="text-[#0E121B] text-sm font-medium leading-5">
              50% discount on Apple Music
            </h1>
            <p className="text-text-sub-600 text-xs font-normal leading-4">
              For only $4.99 per month!{" "}
              <Link href="#" className="underline text-[#0E121B]">
                Learn More
              </Link>
            </p>
          </div>
        </div>

        {/* FIXED: Right image no padding */}
        <Image
          src="/subs/music.png"
          alt="music"
          width={110}
          height={120}
          className="object-contain -mt-10 -mr-4"
        />
      </div>

      {/* Subscription List */}
      <div className="mt-4 flex flex-col">
        {mysubscription.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 border-b last:border-b-0"
          >
            {/* Left section */}
            <div className="flex gap-3 items-center">
              <div className="w-11 h-11 rounded-full border flex items-center justify-center bg-white">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={24}
                  height={24}
                />
              </div>

              <div className="flex flex-col">
                <p className="text-text-sub-600 text-xs font-normal leading-4">
                  {item.title}
                </p>
                <p className="text-text-strong-950 text-sm font-medium leading-5">
                  {item.money}{" "}
                  <span className="text-text-soft-400 text-xs font-normal leading-4">
                    {item.plan}
                  </span>
                </p>
              </div>
            </div>

            {/* Right side status */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${item.statusColor}`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Mysubscription;
