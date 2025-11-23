// "use client";
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import Image from "next/image";
// import { Button } from "./ui/button";
// import { CheckCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
// import { Badge } from "./ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
// import { SpendingCircle } from "./SpendingCircle";
// const backendValuePercentage = 60;

// const MyCards = () => {
//   const [tab, setTab] = useState<"daily" | "weekly" | "monthlt">("weekly");
//   return (
//     <>
//       <Card className="flex flex-col ">
//         <div className="flex flex-row items-center gap-4">
//           <Image
//             src={"/mycards/bank.png"}
//             alt="bank"
//             width={24}
//             height={24}
//             className="object-contain"
//           />
//           <p>My Cards</p>
//           <Button className="bg-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-black  border text-black cursor-pointer ">
//             {" "}
//             <span>
//               {" "}
//               <Plus />{" "}
//             </span>
//             Add Card
//           </Button>
//         </div>
//         <Card>
//           <div className="flex flex-row justify-between">
//             <div className="flex flex-row gap-3">
//               <Image
//                 src={"/avatar/logo.png"}
//                 alt="logo"
//                 width={32}
//                 height={32}
//                 className="object-contain"
//               />
//               <Image
//                 src={"/mycards/wifi.png"}
//                 alt="wifi"
//                 width={20}
//                 height={16}
//                 className="object-contain"
//               />
//               <Badge>
//                 <span>
//                   {" "}
//                   <CheckCircle className="w-2 h-2" />{" "}
//                 </span>
//                 Active
//               </Badge>
//             </div>
//             <Image
//               src={"/mycards/mastercard.png"}
//               alt="mastercard"
//               width={100}
//               height={100}
//             />
//           </div>
//           <div>
//             <p>Saving Card</p>
//             <div className="flex flex-row justify-between">
//               <h2>$16,058.94</h2>
//               <div>
//                 <button className="bg-white border rounded-sm">
//                   {" "}
//                   <ChevronLeft />{" "}
//                 </button>
//                 <button className="bg-white border rounded-sm">
//                   {" "}
//                   <ChevronRight />{" "}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Card>
//         <div className="flex w-full max-w-sm flex-col gap-6">
//           <Tabs defaultValue="account">
//             <TabsList className="w-full">
//               <TabsTrigger value="daily">Daily</TabsTrigger>
//               <TabsTrigger value="weekly">Weekly</TabsTrigger>
//               <TabsTrigger value="monthly">Monthly</TabsTrigger>
//             </TabsList>
//             <TabsContent value="daily">
//               <div className="flex flex-row items-center gap-2">
//                 <SpendingCircle value={backendValuePercentage} />
//                 <div>
//                   <p>Spending Limit</p>
//                   <h1>
//                     $1,500.00 <span> / week</span>
//                   </h1>
//                 </div>
//                 <button className="bg-white border rounded-sm">
//                   {" "}
//                   <ChevronRight />{" "}
//                 </button>
//               </div>
//             </TabsContent>
//             <TabsContent value="weekly">
//               <h2>weekly</h2>
//             </TabsContent>
//             <TabsContent value="monthly">
//               <h2>monthly</h2>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </Card>
//     </>
//   );
// };

// export default MyCards;

"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { CheckCircle, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SpendingCircle } from "./SpendingCircle";

// 🔵 Backend values (arrives from API normally)
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
    <Card className="flex flex-col gap-6 p-6 ">
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
      <Card className="p-6 rounded-xl">
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
            width={70}
            height={70}
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
      </Card>

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
    </Card>
  );
};

export default MyCards;
