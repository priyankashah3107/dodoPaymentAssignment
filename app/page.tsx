import MyCards from "@/components/my-card";
import Mysubscription from "@/components/my-subscriptions";
import Navbar from "@/components/navbar/navbar";
import RecentTransactions from "@/components/recent-transactions";
import CreditScore from "@/components/RightSidecomponents/credit-score";
import ExchangeCard from "@/components/RightSidecomponents/exchange-card";
import TotalExpenses from "@/components/RightSidecomponents/total-expenses";
import SpendingSummary from "@/components/spending-summary";
import React from "react";

const page = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-row gap-10 px-8 py-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MyCards />
            <SpendingSummary />
            <RecentTransactions />
            <Mysubscription />
          </div>
          <div className="grid grid-cols-1 gap-10">
            <TotalExpenses />
            <ExchangeCard />
            <CreditScore />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
