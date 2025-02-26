import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function TransactionForm({ onGenerate }: { onGenerate: (data: any) => void }) {
  const [formData, setFormData] = useState({
    toAddress: '',
    amount: '',
    fee: '-0.00002',
    status: 'Succeeded',
    date: new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }),
    network: 'Solana'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.toAddress || !formData.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    onGenerate(formData);
    toast.success("Transaction preview generated!");
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const formattedDate = date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    setFormData({ ...formData, date: formattedDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="toAddress">To Address</Label>
        <Input
          id="toAddress"
          placeholder="Enter Solana wallet address"
          className="bg-phantom-input text-white border-phantom-primary"
          value={formData.toAddress}
          onChange={(e) => setFormData({ ...formData, toAddress: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount (SOL)</Label>
        <Input
          id="amount"
          type="number"
          step="0.00001"
          placeholder="Enter amount"
          className="bg-phantom-input text-white border-phantom-primary"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="datetime">Date and Time</Label>
        <Input
          id="datetime"
          type="datetime-local"
          className="bg-phantom-input text-white border-phantom-primary"
          onChange={handleDateChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fee">Network Fee</Label>
        <Input
          id="fee"
          type="text"
          className="bg-phantom-input text-phantom-textSecondary border-phantom-primary"
          value={formData.fee}
          readOnly
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger className="bg-phantom-input text-white border-phantom-primary">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Succeeded">Succeeded</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full bg-phantom-secondary hover:bg-phantom-secondary/90 text-white"
      >
        Generate Preview
      </Button>
    </form>
  );
}