import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';

type MasterDetailProps = {
  // title?: string;
  detailsOpen: boolean;
  // closeOnBackdropClick?: boolean;
  // onClose?: () => void;
  onBackdropClick?: () => void;
};

export function MasterDetail({
  detailsOpen,
  onBackdropClick,
  children,
}: PropsWithChildren<MasterDetailProps>) {
  return (
    <div className="w-full h-full min-h-0 overflow-hidden relative">
      {/* Full-screen list behind the panel */}
      <div
        className="absolute inset-0 overflow-auto p-6"
        style={{ paddingLeft: 'clamp(16px, 3vw, 32px)', paddingRight: 'clamp(16px, 3vw, 32px)' }}
        aria-hidden={detailsOpen}
      >
        {children}
      </div>
      {/* Backdrop (click to close) */}
      <button
        className={`absolute inset-0 bg-black/30 border-none m-0 p-0 transition-opacity duration-200 ease-in-out z-10 ${
          detailsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!detailsOpen}
        onClick={() => onBackdropClick && onBackdropClick()}
      />
      {/* Sliding details panel (renders Outlet when :id matches) */}
      <section
        className={`absolute top-0 right-0 h-full w-full max-w-200 bg-base-100 shadow-xl border-l border-base-100 flex flex-col z-11 transition-transform duration-220ms ease-in-out ${
          detailsOpen ? 'transform-none' : 'translate-x-full'
        }`}
        aria-hidden={!detailsOpen}
      >
        <Outlet />
      </section>
    </div>
  );
}
