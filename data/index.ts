import type { ComponentType, SVGProps } from "react";
import {
  Bitcoin,
  Zap,
  Sun,
  Star,
  Circle,
  Layers,
  Repeat,
  Grid,
  Link2,
  Hexagon,
} from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface ICoin {
  label: string;
  value: string;
  Icon: IconComponent;
  multiply: string;
  min: number;
  max: number;
}

export const COINS: ICoin[] = [
  {
    label: "BTCDEGEN/USDC",
    value: "btndegen",
    Icon: Bitcoin,
    multiply: "100x",
    min: 600,
    max: 800,
  },
  { label: "ETH/USDT", value: "ethusdt", Icon: Zap, multiply: "20x", min: 500, max: 1000 },
  { label: "SOL/USDC", value: "solusdc", Icon: Sun, multiply: "40x", min: 20000, max: 25000 },
  { label: "ADA/USDT", value: "adausdt", Icon: Star, multiply: "60x", min: 1, max: 10 },
  { label: "DOT/USDC", value: "dotusdc", Icon: Circle, multiply: "20x", min: 0.02, max: 10.0 },
  { label: "LTC/BTC", value: "ltcbtc", Icon: Layers, multiply: "100x", min: 20, max: 30 },
  { label: "XRP/ETH", value: "xrppeth", Icon: Repeat, multiply: "100x", min: 0.001, max: 5.0 },
  { label: "UNI/USDT", value: "uniusdt", Icon: Grid, multiply: "10x", min: 0.05, max: 8.0 },
  { label: "LINK/USDC", value: "linkusdc", Icon: Link2, multiply: "20x", min: 222, max: 666 },
  { label: "MATIC/USDT", value: "maticusdt", Icon: Hexagon, multiply: "20x", min: 5000, max: 9000 },
];

export const COMMENTS = [
  {
    name: "Gabriel",
    date: "Today at 12:45",
    action: "Opened Short 100x",
    color: "#FF8000",
  },
  {
    name: "Dany",
    date: "Today at 12:45",
    action: "Opened Short 40x",
    color: "#97FCA6",
  },
  {
    name: "Test",
    date: "Today at 12:45",
    action: "Opened Short 20x",
    color: "#FF8000",
  },

  {
    name: "Test 2",
    date: "Today at 12:45",
    action: "Opened Short 60x",
    color: "#97FCA6",
  },

  {
    name: "Test 3",
    date: "Today at 12:45",
    action: "Opened Short 40x",
    color: "#FF8000",
  },

  {
    name: "Test 4",
    date: "Today at 12:45",
    action: "Opened Short 80x",
    color: "#97FCA6",
  },

  {
    name: "Test 5",
    date: "Today at 12:45",
    action: "Opened Short 100x",
    color: "#FF8000",
  },

  {
    name: "Test 6",
    date: "Today at 12:45",
    action: "Opened Short 20x",
    color: "#97FCA6",
  },
];