import { create } from 'zustand';

interface ModalData {
  title: string;
  category?: string;
  status?: string;
  description: string;
  scope?: string;
  websiteUrl?: string;
}

interface AppState {
  audioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;
  toggleAudio: () => void;

  modalOpen: boolean;
  modalData: ModalData | null;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  audioPlaying: false,
  setAudioPlaying: (playing) => set({ audioPlaying: playing }),
  toggleAudio: () => set((state) => ({ audioPlaying: !state.audioPlaying })),

  modalOpen: false,
  modalData: null,
  openModal: (data) => set({ modalOpen: true, modalData: data }),
  closeModal: () => set({ modalOpen: false, modalData: null }),
}));
