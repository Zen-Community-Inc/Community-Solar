"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SavingsCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState<string>("500");
  const [discountRate] = useState(10); // Default 10% discount

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill) || 0;
    const monthlySavings = bill * (discountRate / 100);
    const annualSavings = monthlySavings * 12;
    return { monthlySavings, annualSavings };
  };

  const { monthlySavings, annualSavings } = calculateSavings();

  return (
    <Card className="shadow-xl border-2 border-yellow-400/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-yellow-400/5 rounded-full -translate-y-16 sm:-translate-y-32 translate-x-16 sm:translate-x-32" />
      <CardHeader className="relative px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl lg:text-3xl">Calculate your savings</CardTitle>
        <p className="text-sm sm:text-base text-muted-foreground">See how much you could save with community solar</p>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 relative px-4 sm:px-6">
        <div className="space-y-2">
          <Label htmlFor="monthly-bill" className="text-sm sm:text-base">
            Average monthly electricity bill ($)
          </Label>
          <Input
            id="monthly-bill"
            type="number"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            className="text-base sm:text-lg h-11 sm:h-12"
            placeholder="500"
          />
        </div>

        <div className="bg-yellow-400/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-muted-foreground">Estimated discount</span>
            <span className="text-xl sm:text-2xl font-bold text-yellow-400">{discountRate}%</span>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-semibold">Monthly savings</span>
              <span className="text-2xl sm:text-3xl font-bold text-foreground">${monthlySavings.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base font-semibold">Annual savings</span>
              <span className="text-2xl sm:text-3xl font-bold text-yellow-400">${annualSavings.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            asChild
            variant="default"
            size="lg"
            className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-400/90 h-11 sm:h-12"
          >
            <Link href="/contact">Get your custom quote</Link>
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2 sm:mt-3">
            Actual savings may vary based on utility rates and program availability
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsCalculator;
