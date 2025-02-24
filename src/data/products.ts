import { Category } from "./categories";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  color: string; // Add color property to Product interface
}

export const products: Product[] = [
  // Straight Hair Products
  {
    id: 1,
    name: 'Premium Straight Hair 20"',
    price: 299,
    category: "straight-hair",
    image: "/images/wig2.png",
    rating: 4.5,
    isNew: true,
    color: "black",
  },
  {
    id: 2,
    name: 'Luxury Straight Hair 24"',
    price: 399,
    category: "straight-hair",
    image: "/images/wig2.png",
    rating: 4.8,
    isBestSeller: true,
    color: "black",
  },
  {
    id: 3,
    name: 'Silky Straight Hair 18"',
    price: 279,
    category: "straight-hair",
    image: "/images/wig2.png",
    rating: 4.6,
    color: "black",
  },
  {
    id: 4,
    name: 'Premium Straight Bundle 22"',
    price: 349,
    category: "straight-hair",
    image: "/images/wig2.png",
    rating: 4.7,
    color: "black",
  },
  {
    id: 5,
    name: 'Natural Straight Hair 26"',
    price: 449,
    category: "straight-hair",
    image: "/images/wig2.png",
    rating: 4.9,
    isBestSeller: true,
    color: "black",
  },

  // Wavy Hair Products
  {
    id: 6,
    name: 'Beach Wave Hair 20"',
    price: 329,
    category: "wavy-hair",
    image: "/images/wig2.png",
    rating: 4.7,
    isNew: true,
    color: "black",
  },
  {
    id: 7,
    name: 'Natural Wave Bundle 24"',
    price: 419,
    category: "wavy-hair",
    image: "/images/wig2.png",
    rating: 4.8,
    color: "black",
  },
  {
    id: 8,
    name: 'Body Wave Hair 22"',
    price: 359,
    category: "wavy-hair",
    image: "/images/wig2.png",
    rating: 4.6,
    color: "black",
  },
  {
    id: 9,
    name: 'Deep Wave Bundle 18"',
    price: 299,
    category: "wavy-hair",
    image: "/images/wig2.png",
    rating: 4.5,
    color: "black",
  },
  {
    id: 10,
    name: 'Loose Wave Hair 26"',
    price: 469,
    category: "wavy-hair",
    image: "/images/wig2.png",
    rating: 4.9,
    isBestSeller: true,
    color: "black",
  },

  // Curly Hair Products
  {
    id: 11,
    name: 'Deep Curly Hair 18"',
    price: 319,
    category: "curly-hair",
    image: "/images/wig2.png",
    rating: 4.7,
    color: "black",
  },
  {
    id: 12,
    name: 'Kinky Curly Bundle 20"',
    price: 349,
    category: "curly-hair",
    image: "/images/wig2.png",
    rating: 4.8,
    isNew: true,
    color: "black",
  },
  {
    id: 13,
    name: 'Spring Curl Hair 22"',
    price: 379,
    category: "curly-hair",
    image: "/images/wig2.png",
    rating: 4.6,
    color: "black",
  },
  {
    id: 14,
    name: 'Spiral Curl Bundle 24"',
    price: 429,
    category: "curly-hair",
    image: "/images/wig2.png",
    rating: 4.9,
    isBestSeller: true,
    color: "black",
  },
  {
    id: 15,
    name: 'Romance Curl Hair 20"',
    price: 339,
    category: "curly-hair",
    image: "/images/wig2.png",
    rating: 4.7,
    color: "black",
  },

  // Kinky Hair Products
  {
    id: 16,
    name: 'Kinky Straight 18"',
    price: 289,
    category: "kinky-hair",
    image: "/images/wig2.png",
    rating: 4.5,
    color: "black",
  },
  {
    id: 17,
    name: 'Kinky Coily Bundle 20"',
    price: 319,
    category: "kinky-hair",
    image: "/images/wig2.png",
    rating: 4.7,
    isNew: true,
    color: "black",
  },
  {
    id: 18,
    name: 'Afro Kinky Hair 16"',
    price: 269,
    category: "kinky-hair",
    image: "/images/wig2.png",
    rating: 4.6,
    color: "black",
  },
  {
    id: 19,
    name: 'Kinky Twist Bundle 22"',
    price: 359,
    category: "kinky-hair",
    image: "/images/wig2.png",
    rating: 4.8,
    isBestSeller: true,
    color: "black",
  },
  {
    id: 20,
    name: 'Natural Kinky Hair 24"',
    price: 399,
    category: "kinky-hair",
    image: "/images/wig2.png",
    rating: 4.7,
    color: "black",
  },

  // Wigs
  {
    id: 21,
    name: "Full Lace Straight Wig",
    price: 599,
    category: "wigs",
    image: "/images/wig2.png",
    rating: 4.9,
    isNew: true,
    color: "black",
  },
  {
    id: 22,
    name: "360 Lace Wave Wig",
    price: 649,
    category: "wigs",
    image: "/images/wig2.png",
    rating: 4.8,
    isBestSeller: true,
    color: "black",
  },
  {
    id: 23,
    name: "Frontal Curly Wig",
    price: 549,
    category: "wigs",
    image: "/images/wig2.png",
    rating: 4.7,
    color: "black",
  },
  {
    id: 24,
    name: "Bob Cut Lace Wig",
    price: 499,
    category: "wigs",
    image: "/images/wig2.png",
    rating: 4.6,
    color: "black",
  },
  {
    id: 25,
    name: "Pixie Cut Wig",
    price: 449,
    category: "wigs",
    image: "/images/wig2.png",
    rating: 4.5,
    color: "black",
  },

  // Extensions
  {
    id: 26,
    name: 'Clip-in Extensions 20"',
    price: 199,
    category: "extensions",
    image: "/images/wig2.png",
    rating: 4.6,
    isNew: true,
    color: "black",
  },
  {
    id: 27,
    name: 'Tape-in Extensions 22"',
    price: 249,
    category: "extensions",
    image: "/images/wig2.png",
    rating: 4.7,
    color: "black",
  },
  {
    id: 28,
    name: 'Sew-in Extensions 24"',
    price: 299,
    category: "extensions",
    image: "/images/wig2.png",
    rating: 4.8,
    isBestSeller: true,
    color: "black",
  },
  {
    id: 29,
    name: 'Micro-link Extensions 18"',
    price: 279,
    category: "extensions",
    image: "/images/wig2.png",
    rating: 4.5,
    color: "black",
  },
  {
    id: 30,
    name: 'Halo Extensions 20"',
    price: 229,
    category: "extensions",
    image: "/images/wig2.png",
    rating: 4.6,
    color: "black",
  },
];
