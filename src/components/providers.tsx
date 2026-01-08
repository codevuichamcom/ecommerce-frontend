'use client';

import * as React from 'react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <NuqsAdapter>
      {children}
    </NuqsAdapter>
  );
}
