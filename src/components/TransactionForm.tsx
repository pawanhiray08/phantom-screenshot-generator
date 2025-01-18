import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TransactionFormProps {
  onGenerate: (data: {
    toAddress: string;
    amount: string;
    status: string;
    date: string;
    network: string;
  }) => void;
}

export function TransactionForm({ onGenerate }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    toAddress: '',
    amount: '',
    status: 'Succeeded',
    date: new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
    network: 'Solana',
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
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    setFormData({ ...formData, date: formattedDate });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          onChange={handleChange}
          name="toAddress"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.000001"
          min="0"
          placeholder="Enter amount"
          className="bg-phantom-input text-white border-phantom-primary"
          value={formData.amount}
          onChange={(e) => {
            // Allow decimal points and numbers
            const value = e.target.value;
            if (value === '' || /^\d*\.?\d*$/.test(value)) {
              setFormData(prev => ({ ...prev, amount: value }));
            }
          }}
          name="amount"
          onKeyDown={(e) => {
            // Allow: backspace, delete, tab, escape, enter, decimal point
            if (
              e.key === 'Backspace' ||
              e.key === 'Delete' ||
              e.key === 'Tab' ||
              e.key === 'Escape' ||
              e.key === 'Enter' ||
              e.key === '.' ||
              e.key === 'ArrowLeft' ||
              e.key === 'ArrowRight' ||
              e.key === 'ArrowUp' ||
              e.key === 'ArrowDown'
            ) {
              return;
            }
            // Allow numbers
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
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