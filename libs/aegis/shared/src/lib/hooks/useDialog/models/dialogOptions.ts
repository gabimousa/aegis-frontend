import { ReactNode } from 'react';

export type DialogOptions = {
  id: string;
  title?: string | ReactNode;
  content: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  backdrop?: boolean | 'static';
  fullscreen?: boolean;
};
