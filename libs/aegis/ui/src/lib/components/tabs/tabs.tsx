import { PropsWithChildren } from 'react';
import { Tab } from './tab';

export function Tabs({ children }: PropsWithChildren) {
  return (
    <div role="tablist" className="tabs tabs-border">
      {children}
    </div>
  );
}

Tabs.Tab = Tab;
