// gameGuideTypes.ts
import { LottoGameType } from "@/lib/types";

export interface GameGuideData {
  type: LottoGameType;
  drawSchedule: {
    days: string[];
    time: string;
  };
  minJackpot: number;
  prizes: {
    match: string;
    description: string;
    amount: string | number;
  }[];
  systemPlay: {
    type: string;
    selections: number;
    cost: number;
  }[];
  howToPlay: string[];
  importantNotes: string[];
  whereToWatch: string[];
  whereToClaimPrizes: {
    range: string;
    location: string;
  }[];
}

export const GAME_GUIDES: Record<LottoGameType, GameGuideData> = {
  [LottoGameType.ULTRA_LOTTO_658]: {
    type: LottoGameType.ULTRA_LOTTO_658,
    drawSchedule: {
      days: ["Tuesday", "Friday", "Sunday"],
      time: "9:00 PM",
    },
    minJackpot: 49500000,
    prizes: [
      { match: "6 of 6", description: "Jackpot", amount: "Progressive" },
      { match: "5 of 6", description: "2nd Prize", amount: 120000 },
      { match: "4 of 6", description: "3rd Prize", amount: 2000 },
      { match: "3 of 6", description: "4th Prize", amount: 100 },
    ],
    systemPlay: [
      { type: "System 5-Roll", selections: 53, cost: 1060 },
      { type: "System 7", selections: 7, cost: 140 },
      { type: "System 8", selections: 28, cost: 560 },
      { type: "System 9", selections: 84, cost: 1680 },
      { type: "System 10", selections: 210, cost: 4200 },
      { type: "System 11", selections: 462, cost: 9240 },
      { type: "System 12", selections: 924, cost: 18480 },
    ],
    howToPlay: [
      "Select 6 numbers from 1 to 58",
      "Option for Lucky Pick (LP) for computer-generated numbers",
      "Play up to 6 advance draws",
      "Each play costs ₱20.00",
      "Match all six numbers to win the jackpot prize",
    ],
    importantNotes: [
      "Must be at least 18 years old to play",
      "Ticket price includes 20% Documentary Stamp Tax (DST)",
      "Prizes above ₱10,000.00 are subject to 20% tax",
      "Check ticket accuracy before leaving outlet",
    ],
    whereToWatch: [
      "PTV4",
      "pcso.gov.ph",
      "PCSO Official Facebook page",
      "PCSO Official YouTube Channel",
    ],
    whereToClaimPrizes: [
      {
        range: "₱300,001.00 up to Jackpot Prize",
        location: "PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱10,001.00 up to ₱300,000.00",
        location: "PCSO Branch Offices or PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱20.00 up to ₱10,000.00",
        location: "Any authorized Lotto outlet or PCSO Branch Offices",
      },
    ],
  },
  [LottoGameType.GRAND_LOTTO_655]: {
    type: LottoGameType.GRAND_LOTTO_655,
    drawSchedule: {
      days: ["Monday", "Wednesday", "Saturday"],
      time: "9:00 PM",
    },
    minJackpot: 29700000,
    prizes: [
      { match: "6 of 6", description: "Jackpot", amount: "Progressive" },
      { match: "5 of 6", description: "2nd Prize", amount: 100000 },
      { match: "4 of 6", description: "3rd Prize", amount: 1500 },
      { match: "3 of 6", description: "4th Prize", amount: 60 },
    ],
    systemPlay: [
      { type: "System 5-Roll", selections: 50, cost: 1000 },
      { type: "System 7", selections: 7, cost: 140 },
      { type: "System 8", selections: 28, cost: 560 },
      { type: "System 9", selections: 84, cost: 1680 },
      { type: "System 10", selections: 210, cost: 4200 },
      { type: "System 11", selections: 462, cost: 9240 },
      { type: "System 12", selections: 924, cost: 18480 },
    ],
    howToPlay: [
      "Select 6 numbers from 1 to 55",
      "Option for Lucky Pick (LP) for computer-generated numbers",
      "Play up to 6 advance draws",
      "Each play costs ₱20.00",
      "Match all six numbers to win the jackpot prize",
    ],
    importantNotes: [
      "Must be at least 18 years old to play",
      "Ticket price includes 20% Documentary Stamp Tax (DST)",
      "Prizes above ₱10,000.00 are subject to 20% tax",
      "Check ticket accuracy before leaving outlet",
    ],
    whereToWatch: [
      "PTV4",
      "pcso.gov.ph",
      "PCSO Official Facebook page",
      "PCSO Official YouTube Channel",
    ],
    whereToClaimPrizes: [
      {
        range: "₱300,001.00 up to Jackpot Prize",
        location: "PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱10,001.00 up to ₱300,000.00",
        location: "PCSO Branch Offices or PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱20.00 up to ₱10,000.00",
        location: "Any authorized Lotto outlet or PCSO Branch Offices",
      },
    ],
  },
  [LottoGameType.SUPER_LOTTO_649]: {
    type: LottoGameType.SUPER_LOTTO_649,
    drawSchedule: {
      days: ["Tuesday", "Thursday", "Sunday"],
      time: "9:00 PM",
    },
    minJackpot: 15840000,
    prizes: [
      { match: "6 of 6", description: "Jackpot", amount: "Progressive" },
      { match: "5 of 6", description: "2nd Prize", amount: 50000 },
      { match: "4 of 6", description: "3rd Prize", amount: 1200 },
      { match: "3 of 6", description: "4th Prize", amount: 50 },
    ],
    systemPlay: [
      { type: "System 5-Roll", selections: 44, cost: 880 },
      { type: "System 7", selections: 7, cost: 140 },
      { type: "System 8", selections: 28, cost: 560 },
      { type: "System 9", selections: 84, cost: 1680 },
      { type: "System 10", selections: 210, cost: 4200 },
      { type: "System 11", selections: 462, cost: 9240 },
      { type: "System 12", selections: 924, cost: 18480 },
    ],
    howToPlay: [
      "Select 6 numbers from 1 to 49",
      "Option for Lucky Pick (LP) for computer-generated numbers",
      "Play up to 6 advance draws",
      "Each play costs ₱20.00",
      "Match all six numbers to win the jackpot prize",
    ],
    importantNotes: [
      "Must be at least 18 years old to play",
      "Ticket price includes 20% Documentary Stamp Tax (DST)",
      "Prizes above ₱10,000.00 are subject to 20% tax",
      "Check ticket accuracy before leaving outlet",
    ],
    whereToWatch: [
      "PTV4",
      "pcso.gov.ph",
      "PCSO Official Facebook page",
      "PCSO Official YouTube Channel",
    ],
    whereToClaimPrizes: [
      {
        range: "₱300,001.00 up to Jackpot Prize",
        location: "PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱10,001.00 up to ₱300,000.00",
        location: "PCSO Branch Offices or PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱20.00 up to ₱10,000.00",
        location: "Any authorized Lotto outlet or PCSO Branch Offices",
      },
    ],
  },
  [LottoGameType.MEGA_LOTTO_645]: {
    type: LottoGameType.MEGA_LOTTO_645,
    drawSchedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "9:00 PM",
    },
    minJackpot: 8910000,
    prizes: [
      { match: "6 of 6", description: "Jackpot", amount: "Progressive" },
      { match: "5 of 6", description: "2nd Prize", amount: 32000 },
      { match: "4 of 6", description: "3rd Prize", amount: 1000 },
      { match: "3 of 6", description: "4th Prize", amount: 30 },
    ],
    systemPlay: [
      { type: "System 5-Roll", selections: 40, cost: 800 },
      { type: "System 7", selections: 7, cost: 140 },
      { type: "System 8", selections: 28, cost: 560 },
      { type: "System 9", selections: 84, cost: 1680 },
      { type: "System 10", selections: 210, cost: 4200 },
      { type: "System 11", selections: 462, cost: 9240 },
      { type: "System 12", selections: 924, cost: 18480 },
    ],
    howToPlay: [
      "Select 6 numbers from 1 to 45",
      "Option for Lucky Pick (LP) for computer-generated numbers",
      "Play up to 6 advance draws",
      "Each play costs ₱20.00",
      "Match all six numbers to win the jackpot prize",
    ],
    importantNotes: [
      "Must be at least 18 years old to play",
      "Ticket price includes 20% Documentary Stamp Tax (DST)",
      "Prizes above ₱10,000.00 are subject to 20% tax",
      "Check ticket accuracy before leaving outlet",
    ],
    whereToWatch: [
      "PTV4",
      "pcso.gov.ph",
      "PCSO Official Facebook page",
      "PCSO Official YouTube Channel",
    ],
    whereToClaimPrizes: [
      {
        range: "₱300,001.00 up to Jackpot Prize",
        location: "PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱10,001.00 up to ₱300,000.00",
        location: "PCSO Branch Offices or PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱20.00 up to ₱10,000.00",
        location: "Any authorized Lotto outlet or PCSO Branch Offices",
      },
    ],
  },
  [LottoGameType.LOTTO_642]: {
    type: LottoGameType.LOTTO_642,
    drawSchedule: {
      days: ["Tuesday", "Thursday", "Saturday"],
      time: "9:00 PM",
    },
    minJackpot: 5940000,
    prizes: [
      { match: "6 of 6", description: "Jackpot", amount: "Progressive" },
      { match: "5 of 6", description: "2nd Prize", amount: 24000 },
      { match: "4 of 6", description: "3rd Prize", amount: 800 },
      { match: "3 of 6", description: "4th Prize", amount: 20 },
    ],
    systemPlay: [
      { type: "System 5-Roll", selections: 37, cost: 740 },
      { type: "System 7", selections: 7, cost: 140 },
      { type: "System 8", selections: 28, cost: 560 },
      { type: "System 9", selections: 84, cost: 1680 },
      { type: "System 10", selections: 210, cost: 4200 },
      { type: "System 11", selections: 462, cost: 9240 },
      { type: "System 12", selections: 924, cost: 18480 },
    ],
    howToPlay: [
      "Select 6 numbers from 1 to 42",
      "Option for Lucky Pick (LP) for computer-generated numbers",
      "Play up to 6 advance draws",
      "Each play costs ₱20.00",
      "Match all six numbers to win the jackpot prize",
    ],
    importantNotes: [
      "Must be at least 18 years old to play",
      "Ticket price includes 20% Documentary Stamp Tax (DST)",
      "Prizes above ₱10,000.00 are subject to 20% tax",
      "First national lottery game in the Philippines",
    ],
    whereToWatch: [
      "PTV4",
      "pcso.gov.ph",
      "PCSO Official Facebook page",
      "PCSO Official YouTube Channel",
    ],
    whereToClaimPrizes: [
      {
        range: "₱300,001.00 up to Jackpot Prize",
        location: "PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱10,001.00 up to ₱300,000.00",
        location: "PCSO Branch Offices or PCSO Main Office, 2nd Floor",
      },
      {
        range: "₱20.00 up to ₱10,000.00",
        location: "Any authorized Lotto outlet or PCSO Branch Offices",
      },
    ],
  },
};
