"use client";

import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChevronRight } from "lucide-react";

const transactions = [
  // Incoming
  {
    tab: "Incoming",
    icon: "/recent/home.png",
    title: "Salary Deposit",
    description: "Monthly salary from Apex Finance",
    amount: "$3,500.00",
    date: "Sep 18",
  },
  {
    tab: "Incoming",
    icon: "/recent/chart.png",
    title: "Stock Dividend",
    description: "Payment from stock investments.",
    amount: "$846.14",
    date: "Sep 18",
  },
  {
    tab: "Incoming",
    icon: "/recent/ghome.png",
    title: "Rental Income",
    description: "Rental payment from Mr. Dudley.",
    amount: "$100.00",
    date: "Sep 17",
  },
  {
    tab: "Incoming",
    icon: "/subs/amazon.png",
    title: "Refund from Amazon",
    description: "Refund of Order No #124235",
    amount: "$36.24",
    date: "Sep 15",
  },

  // Outgoing
  {
    tab: "Outgoing",
    icon: "/recent/home.png",
    title: "Home Utilities",
    description: "Monthly electricity bill payment.",
    amount: "$240.00",
    date: "Sep 18",
  },
  {
    tab: "Outgoing",
    icon: "/recent/chart.png",
    title: "Stock Purchase",
    description: "Buy order for Tesla shares.",
    amount: "$500.00",
    date: "Sep 17",
  },
  {
    tab: "Outgoing",
    icon: "/recent/ghome.png",
    title: "Rental Income",
    description: "Rental payment from Mr. Dudley.",
    amount: "$100.00",
    date: "Sep 17",
  },
  {
    tab: "Outgoing",
    icon: "/subs/amazon.png",
    title: "Refund from Amazon",
    description: "Refund of Order No #124235",
    amount: "$36.24",
    date: "Sep 15",
  },

  // Pending
  {
    tab: "Pending",
    icon: "/recent/home.png",
    title: "Pending Subscription",
    description: "Payment awaiting confirmation.",
    amount: "$12.99",
    date: "Sep 16",
  },
];

const tabs = ["Incoming", "Outgoing", "Pending"];

const RecentTransactions = () => {
  return (
    <div className="w-full p-4 rounded-xl shadow border mb-10 lg:mb-20  ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/recent/dollar.png" width={20} height={20} alt="dollar" />
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>

        <button className="px-4 py-1 border rounded-lg text-sm font-medium">
          See All
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="Incoming" className="w-full ">
        <TabsList className="grid grid-cols-3 w-full bg-gray-100 rounded-lg">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-sm  font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        {tabs.map((tab) => (
          <TabsContent key={tab} value={tab} className="b mt-6 ">
            <div className="mt-4 flex flex-col gap-4">
              {transactions
                .filter((tx) => tx.tab === tab)
                .map((tx, index) => {
                  const isRental = tx.title === "Rental Income";

                  return (
                    <Link
                      key={index}
                      href="#"
                      className="flex items-center justify-between w-full "
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon Container with Rental Income green */}
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                            isRental ? "" : "bg-white"
                          }`}
                          style={{
                            backgroundColor: isRental ? "#E0FAEC" : undefined,
                          }}
                        >
                          <Image
                            src={tx.icon}
                            alt="icon"
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col">
                          <p className="text-text-strong-950 text-sm font-medium leading-5">
                            {tx.title}
                          </p>
                          <p className="text-text-sub-600 text-xs leading-4 font-normal truncate max-w-[150px]">
                            {tx.description}
                          </p>
                        </div>
                      </div>

                      {/* Amount + Date */}
                      <div className="flex flex-col text-right">
                        <p className="text-text-strong-950 text-sm font-medium leading-5">
                          {tx.amount}
                        </p>
                        <p className="text-text-sub-600 text-xs leading-4">
                          {tx.date}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RecentTransactions;
