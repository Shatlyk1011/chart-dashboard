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

export interface ICoin { label: string; value: string; Icon: IconComponent, multiply: string }

export const COINS: ICoin[] = [
  { label: "BTCDEGEN/USDC", value: "btndegen", Icon: Bitcoin, multiply: "100x" },
  { label: "ETH/USDT", value: "ethusdt", Icon: Zap, multiply: "20x" },
  { label: "SOL/USDC", value: "solusdc", Icon: Sun, multiply: "40x" },
  { label: "ADA/USDT", value: "adausdt", Icon: Star, multiply: "60x" },
  { label: "DOT/USDC", value: "dotusdc", Icon: Circle, multiply: "20x" },
  { label: "LTC/BTC", value: "ltcbtc", Icon: Layers, multiply: "100x" },
  { label: "XRP/ETH", value: "xrppeth", Icon: Repeat, multiply: "100x" },
  { label: "UNI/USDT", value: "uniusdt", Icon: Grid, multiply: "10x" },
  { label: "LINK/USDC", value: "linkusdc", Icon: Link2, multiply: "20x" },
  { label: "MATIC/USDT", value: "maticusdt", Icon: Hexagon, multiply: "20x" },
];