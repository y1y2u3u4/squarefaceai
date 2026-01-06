import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since this layout wraps the locale layout, it should be minimal
// The actual layout logic is in [locale]/layout.tsx
export default function RootLayout({ children }: Props) {
  return children;
}
