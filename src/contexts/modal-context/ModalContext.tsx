'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ModalContextValue {
  open: (modalElement: React.ReactElement) => void;
  close: () => void;
}

const initialValue: ModalContextValue = {
  open: () => {},
  close: () => {},
};

const ModalContext = createContext<ModalContextValue>(initialValue);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<React.ReactNode>(null);

  const open: ModalContextValue['open'] = useCallback(
    (ModalElement) => setModal(ModalElement),
    [setModal],
  );

  const close: ModalContextValue['close'] = useCallback(
    () => setModal(null),
    [setModal],
  );

  const value: ModalContextValue = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
}
