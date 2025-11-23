"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ExchangeCard() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("EUR");
  const [loading, setLoading] = useState(false);
  const [isExchanging, setIsExchanging] = useState(false);

  const amount = 100;

  // Fallback list (before API loads)
  const fallbackList = ["USD", "EUR", "GBP", "INR", "CAD", "AUD"];

  const currencyList = rates ? Object.keys(rates).slice(0, 50) : fallbackList;

  // Fetch Exchange Rates
  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch(`https://open.er-api.com/v6/latest/${base}`)
      .then((res) => res.json())
      .then((data) => {
        if (active && data?.rates) {
          setRates(data.rates);
        }
      })
      .catch(() => setRates(null))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [base]);

  const rate = rates?.[target] ?? 0;
  const tax = amount * 0.02;
  const fee = amount * 0.01;

  const convertedGross = amount * rate;
  const convertedNet = Math.max(0, convertedGross - tax - fee);

  // Currency Swap
  const swap = () => {
    const oldBase = base;
    setBase(target);
    setTarget(oldBase);
  };

  // Fake exchange action
  const handleExchange = async () => {
    setIsExchanging(true);
    await new Promise((res) => setTimeout(res, 1200));
    alert(`Exchanged ${amount} ${base} → ${convertedNet.toFixed(2)} ${target}`);
    setIsExchanging(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <RefreshCw className="text-gray-600" />
          <h3 className="text-lg font-semibold text-[#0E121B]">Exchange</h3>
        </div>

        <button className="px-4 py-1 border rounded-full text-sm text-[#0E121B]">
          Currencies
        </button>
      </div>

      {/* Card */}
      <div className="bg-[#F8FAFC] border rounded-xl overflow-hidden">
        {/* Currency selectors */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* FROM */}
          <Select value={base} onValueChange={setBase}>
            <SelectTrigger className="h-9 w-28 rounded-full border bg-white">
              <SelectValue placeholder="USD" />
            </SelectTrigger>
            <SelectContent>
              {currencyList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* SWAP */}
          <button
            onClick={swap}
            className="p-2 rounded-full border bg-white hover:bg-gray-100"
          >
            <ArrowLeftRight />
          </button>

          {/* TO */}
          <Select value={target} onValueChange={setTarget}>
            <SelectTrigger className="h-9 w-28 rounded-full border bg-white">
              <SelectValue placeholder="EUR" />
            </SelectTrigger>
            <SelectContent>
              {currencyList.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="py-6 px-6 text-center">
          <div className="text-5xl font-bold text-[#0E121B]">
            ${amount.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Available : <span className="font-medium">$16,058.94</span>
          </div>
        </div>

        {/* Rate */}
        <div className="border-t bg-white px-4 py-3 text-center text-sm text-gray-600">
          1 {base} ={" "}
          <span className="font-semibold">
            {loading ? "Loading..." : rate.toFixed(2)} {target}
          </span>
        </div>
      </div>

      {/* Fees */}
      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Tax (2%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Exchange fee (1%)</span>
          <span>${fee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-semibold text-[#0E121B]">
          <span>Total amount</span>
          <span>
            {target} {convertedNet.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-5">
        <Button
          onClick={handleExchange}
          disabled={isExchanging || loading}
          className="w-full rounded-xl py-4 flex items-center justify-center gap-2"
        >
          <RefreshCw className={isExchanging ? "animate-spin" : ""} />
          {isExchanging ? "Processing…" : "Exchange"}
        </Button>
      </div>
    </div>
  );
}
