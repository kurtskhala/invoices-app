import { Invoice } from '@/types';
import { authService } from './auth.service';

const BASE_URL = 'http://localhost:3000';

export const invoiceService = {
  async getInvoice(id: string): Promise<Invoice> {
    const response = await authService.fetchWithAuth(
      `${BASE_URL}/invoices/${id}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch invoice');
    }
    return response.json();
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
      throw new Error('Failed to update invoice');
    }
    return response.json();
  },

  async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const response = await authService.fetchWithAuth(
      `${BASE_URL}/invoices/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error('Failed to update invoice');
    }
    return response.json();
  },

  async getAllInvoices(): Promise<Invoice[]> {
    const response = await authService.fetchWithAuth(`${BASE_URL}/invoices`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    return response.json();
  },

  async addInvoice(data: Invoice): Promise<Invoice> {
    const response = await authService.fetchWithAuth(`${BASE_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to add invoice');
    }
    return response.json();
  },

  async deleteInvoice(id: string): Promise<void> {
    const response = await authService.fetchWithAuth(
      `${BASE_URL}/invoices/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete invoice');
    }
  },
};
