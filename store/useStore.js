import { create } from 'zustand';

const useStore = create((set) => ({
  isDarkMode: false,
  isFullWidth: false,
  query: '',
  toastMessage: '',
  toastType: 'success',
  useFullHeight: false,
  totalOffset: 0,

  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
    return { isDarkMode: newMode };
  }),

  setDarkMode: (mode) => set(() => {
    if (mode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
    }
    return { isDarkMode: mode };
  }),

  toggleFullWidth: () => set((state) => ({
    isFullWidth: !state.isFullWidth
  })),

  setFullWidth: (isFull) => set(() => ({
    isFullWidth: isFull
  })),

  resetFullWidth: () => set(() => ({
    isFullWidth: false
  })),

  setQuery: (newQuery) => set(() => ({
    query: newQuery
  })),

  showToast: (message, type = 'success') => set(() => ({
    toastMessage: message,
    toastType: type
  })),

  hideToast: () => set(() => ({
    toastMessage: ''
  })),

  setUseFullHeight: (useFullHeight) => set(() => ({
    useFullHeight
  })),

  setTotalOffset: (offset) => set(() => ({
    totalOffset: offset
  })),
}));

export default useStore;