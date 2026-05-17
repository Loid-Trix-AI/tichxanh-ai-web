import { Apple, Recycle, Package, Skull, Trash2 } from "lucide-react";

export const TREE_IMAGES = {
  seed: "https://i.ibb.co/Fkn0dhtq/96b14fec2920402ca48bb618f13fa244.png",
  sprout:
    "https://i.ibb.co/ch4sW14t/b10d94d355c8d4968dd9.jpg",
  sapling:
    "https://i.ibb.co/d02qfRzc/5841c39e028583dbda94.jpg",
  youngTree:
    "https://i.ibb.co/HfnFc849/0f4b1a94db8f5ad1039e.jpg",
  matureTree:
    "https://i.ibb.co/h1VPLbfS/aaf43629f732766c2f23.jpg",
};

export const IMPACT_IMAGES = {
  communityAction: "https://i.pinimg.com/1200x/b0/13/e9/b013e903c7da80140f8e648a66e47b00.jpg",
  smartScan: "https://i.pinimg.com/736x/40/5e/3b/405e3b1b27ac29cebd9befff78dddb86.jpg",
  rewards:
    "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&q=80&w=400",
  urbanGreenery:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400",
};

export const WASTE_CATEGORIES_CONFIG = [
  {
    id: "organic",
    icon: Apple,
    color: "from-emerald-500 to-green-400",
    images: [
      "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=600&auto=format&fit=crop", // Composting
      "https://images.unsplash.com/photo-1581451556956-6515f9bce41e?q=80&w=600&auto=format&fit=crop", // Food waste
      "https://images.unsplash.com/photo-1611689342806-0863700ce6e4?q=80&w=600&auto=format&fit=crop", // Vegetables
    ],
  },
  {
    id: "recyclable",
    icon: Recycle,
    color: "from-blue-500 to-cyan-400",
    images: [
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600&auto=format&fit=crop", // Paper/cardboard
      "https://images.unsplash.com/photo-1605600659901-4ddbb7daaa36?q=80&w=600&auto=format&fit=crop", // Cans
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=600&auto=format&fit=crop", // Glass bottles
    ],
  },
  {
    id: "plastic",
    icon: Package,
    color: "from-amber-500 to-yellow-400",
    images: [
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=600&auto=format&fit=crop", // Plastic bottles
      "https://images.unsplash.com/photo-1526951521990-620dc14c214b?q=80&w=600&auto=format&fit=crop", // Plastic waste
      "https://images.unsplash.com/photo-1621451537084-482c73073e0f?q=80&w=600&auto=format&fit=crop", // Microplastics
    ],
  },
  {
    id: "hazardous",
    icon: Skull,
    color: "from-red-500 to-orange-400",
    images: [
      "https://images.unsplash.com/photo-1510006851064-e6056cd0e3a8?q=80&w=600&auto=format&fit=crop", // E-waste
      "https://images.unsplash.com/photo-1626084605929-281b95304a9e?q=80&w=600&auto=format&fit=crop", // Batteries
      "https://images.unsplash.com/photo-1582214400329-8aa5dcbe4846?q=80&w=600&auto=format&fit=crop", // Chemicals
    ],
  },
  {
    id: "other",
    icon: Trash2,
    color: "from-slate-500 to-gray-400",
    images: [
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=600&auto=format&fit=crop", // General trash
      "https://images.unsplash.com/photo-1610555356070-d1fb33b2e3cc?q=80&w=600&auto=format&fit=crop", // Landfill
      "https://images.unsplash.com/photo-1503596476-c6e3d2345d25?q=80&w=600&auto=format&fit=crop", // Garbage bag
    ],
  },
];
