export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export enum EscrowStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  HELD_IN_ESCROW = 'HELD_IN_ESCROW',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  VERIFIED = 'VERIFIED',
  RELEASED = 'RELEASED',
  DISPUTED = 'DISPUTED',
  REFUNDED = 'REFUNDED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  walletBalance: number; // In Tokens
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NONE';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  images: string[];
  sellerId: string;
  isSold: boolean;
  isBiddable: boolean;
  currentBid?: number;
  location: string;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
}

export interface Transaction {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: EscrowStatus;
  createdAt: Date;
}

export interface VerificationResult {
  isSafe: boolean;
  reason: string;
  detectedKeywords: string[];
}
