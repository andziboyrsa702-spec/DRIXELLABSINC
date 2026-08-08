import { create } from 'zustand';
import defaultCmsData from '../data/cms.json';

export type CmsData = typeof defaultCmsData;

interface CmsStore {
  data: CmsData;
  loading: boolean;
  fetchCms: () => Promise<void>;
  updateCms: (newData: CmsData) => Promise<boolean>;
}

export const useCmsStore = create<CmsStore>((set) => ({
  data: defaultCmsData,
  loading: false,

  fetchCms: async () => {
    try {
      set({ loading: true });
      const res = await fetch('/api/cms');
      if (res.ok) {
        const json = await res.json();
        set({ data: json, loading: false });
      } else {
        set({ loading: false });
      }
    } catch {
      set({ loading: false });
    }
  },

  updateCms: async (newData: CmsData) => {
    try {
      set({ data: newData });
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': 'drixel2026',
        },
        body: JSON.stringify(newData),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
}));
