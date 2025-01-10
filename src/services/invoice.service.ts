import { Invoice, CacheItem } from '@/types';
import { authService } from './auth.service';

const CACHE_KEY = 'invoices_cache';
const CACHE_DURATION = 60 * 60 * 1000;
const BASE_URL = 'http://localhost:3000';

export const invoiceService = {
  getFromCache<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const cachedItem: CacheItem<T> = JSON.parse(item);
      const now = new Date().getTime();

      if (now - cachedItem.timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }

      return cachedItem.data;
    } catch {
      return null;
    }
  },

  setCache<T>(key: string, data: T): void {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(key, JSON.stringify(cacheItem));
  },

  clearCache(key?: string): void {
    if (key) {
      localStorage.removeItem(key);
    } else {
      localStorage.removeItem(CACHE_KEY);

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('invoice_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
  },

  async getInvoice(id: string): Promise<Invoice> {
    const cacheKey = `invoice_${id}`;
    const cached = this.getFromCache<Invoice>(cacheKey);
    if (cached) {
      return cached;
    }
    const response = await authService.fetchWithAuth(
      `${BASE_URL}/invoices/${id}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch invoice');
    }
    const invoice = await response.json();
    this.setCache(cacheKey, invoice);
    return invoice;
  },

  async updateInvoiceStatus(id: string, status: string): Promise<Invoice> {
    const response = await authService.fetchWithAuth(
      `${BASE_URL}/invoices/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch invoice');
    }
    const updatedInvoice = await response.json();
    this.setCache(`invoice_${id}`, updatedInvoice);
    this.clearCache(CACHE_KEY);
    return updatedInvoice;
  },

  async getAllInvoices(): Promise<Invoice[]> {
    const cached = this.getFromCache<Invoice[]>(CACHE_KEY);
    if (cached) {
      return cached;
    }
    const response = await authService.fetchWithAuth(`${BASE_URL}/invoices`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    const invoices = await response.json();
    this.setCache(CACHE_KEY, invoices);
    return invoices;
  },

  async addInvoice(data: Invoice): Promise<void> {
    console.log(data, 'data');
    const response = await authService.fetchWithAuth(`${BASE_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log(response);

    if (!response.ok) {
      throw new Error('Failed to add invoice');
    } else {
      console.log('viiii');
    }
  },

  async deleteInvoice(id?: string): Promise<void> {
    const response = await authService.fetchWithAuth(
      `${BASE_URL}/invoices/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete invoice');
    }

    this.clearCache(`invoice_${id}`);
    this.clearCache(CACHE_KEY);
  },
};
