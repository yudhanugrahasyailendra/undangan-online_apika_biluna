'use client';

import { createContext, useContext, useCallback, useRef } from 'react';

interface ToastContextType {
  showToast: (message: string, icon?: string) => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const showToast = useCallback((message: string, icon = 'fa-check') => {
    if (!containerRef.current) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color:var(--petal);font-size:14px;"></i> ${message}`;
    containerRef.current.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div id="toast-container" ref={containerRef}></div>
    </ToastContext.Provider>
  );
}
