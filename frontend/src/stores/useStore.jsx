import { create } from 'zustand';

export const useStore = create((set) => ({
  isLogged: true,
  toggleLogin: () => set((state) => ({ isLogged: !state.isLogged })),
}));
