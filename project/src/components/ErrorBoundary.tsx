import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ErrorMessage from './ErrorMessage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={({ error }) => (
        <ErrorMessage message={error?.message || 'An unexpected error occurred'} />
      )}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  );
}