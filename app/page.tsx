import MyCards from "@/components/my-card";
import Mysubscription from "@/components/my-subscriptions";
import Navbar from "@/components/navbar/navbar";
import RecentTransactions from "@/components/recent-transactions";
import CreditScore from "@/components/RightSidecomponents/credit-score";
import ExchangeCard from "@/components/RightSidecomponents/exchange-card";
import TotalExpenses from "@/components/RightSidecomponents/total-expenses";
import SpendingSummary from "@/components/spending-summary";

export default function Page() {
  return (
    <div className="w-full min-h-screen ">
      <Navbar />

      <div className="px-4 md:px-8 py-6">
        {/* WRAPPER */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 flex-1 ">
            <MyCards />
            <SpendingSummary />
            <RecentTransactions />
            <Mysubscription />
          </div>

          {/* RIGHT SECTION */}
          {/* <div className="grid grid-cols-1 gap-0 lg:w-[350px] xl:w-[380px]"> */}
          <div className="flex flex-col gap-14 lg:w-[350px] xl:w-[380px]">
            <TotalExpenses />
            <ExchangeCard />
            <CreditScore />
          </div>
        </div>
      </div>
    </div>
  );
}
