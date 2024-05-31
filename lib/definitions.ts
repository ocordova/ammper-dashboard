export interface ApiResponseEnvelope<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  // Belvo related definitions
  export interface BelvoPaginatedResponseEnvelope<T> {
    count: number;
    next: string;
    previous: string;
    results: T;
  }
  
  export enum BelvoInstitutionType {
    BANK = "bank",
  }
  
  export enum BelvoAccountCategory {
    CHECKING_ACCOUNT = "CHECKING_ACCOUNT",
  }
  
  export enum BelvoAccountCurrency {
    MXN = "MXN",
  }
  
  export enum BelvoTransactionCategory {
    BILLS_UTILITIES = "Bills & Utilities",
    CREDITS_LOANS = "Credits & Loans",
    DEPOSITS = "Deposits",
    FEES_CHARGES = "Fees & Charges",
    FOOD_GROCERIES = "Food & Groceries",
    HOME_LIFE = "Home & Life",
    INCOME_PAYMENTS = "Income & Payments",
    INSURANCE = "Insurance",
    INVESTMENTS_SAVINGS = "Investments & Savings",
    ONLINE_PLATFORMS_LEISURE = "Online Platforms & Leisure",
    PERSONAL_SHOPPING = "Personal Shopping",
    TAXES = "Taxes",
    TRANSFERS = "Transfers",
    TRANSPORT_TRAVEL = "Transport & Travel",
    UNKNOWN = "Unknown",
    WITHDRAWAL_ATM = "Withdrawal & ATM",
  }
  
  export enum BelvoTransactionType {
    INFLOW = "INFLOW",
    OUTFLOW = "OUTFLOW",
  }
  
  export enum BelvoTransactionStatus {
    PROCESSED = "PROCESSED",
    PENDING = "PENDING",
    UNCATEGORIZED = "UNCATEGORIZED",
  }
  
  export interface BelvoInstitution {
    name: string;
    type: BelvoInstitutionType;
  }
  
  export interface BelvoAccountBalance {
    available: number;
    current: number;
  }
  
  export interface BelvoAccount {
    id: string;
    link: string;
    institution: BelvoInstitution;
    name: string;
    currency: BelvoAccountCurrency;
  }
  
  export interface BelvoTransactionMerchant {
    logo: string;
    website: string;
    name: string;
  }
  
  export interface BelvoTransaction {
    id: string;
    account: BelvoAccount;
    accounting_date: string;
    amount: number;
    currency: BelvoAccountCurrency;
    description: string;
    type: BelvoTransactionType;
    category: BelvoTransactionCategory;
    merchant: BelvoTransactionMerchant;
  }
  