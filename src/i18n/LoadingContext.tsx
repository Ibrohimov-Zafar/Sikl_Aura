import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

interface LoadingState {
  /** Total frames to load across all sections */
  totalFrames: number;
  /** How many frames have loaded so far */
  loadedFrames: number;
  /** Whether all sections have fully loaded */
  isFullyLoaded: boolean;
}

interface LoadingContextValue {
  state: LoadingState;
  /** Register a section's frame count. Returns sectionId. */
  registerSection: (totalFrames: number) => number;
  /** Report loaded frames from a section */
  reportLoaded: (count: number) => void;
  /** Mark a section as fully loaded. When all sections done → isFullyLoaded = true */
  markSectionDone: (sectionId: number) => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export const useLoading = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalFrames, setTotalFrames] = useState(0);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const sectionCountRef = useRef(0);
  const doneSectionsRef = useRef(new Set<number>());

  const registerSection = useCallback((frames: number) => {
    const id = sectionCountRef.current++;
    setTotalFrames((prev) => prev + frames);
    return id;
  }, []);

  const reportLoaded = useCallback((count: number) => {
    setLoadedFrames((prev) => prev + count);
  }, []);

  const markSectionDone = useCallback((sectionId: number) => {
    doneSectionsRef.current.add(sectionId);
    // All sections done when we have at least 1 section and all are done
    if (doneSectionsRef.current.size > 0 && doneSectionsRef.current.size >= sectionCountRef.current) {
      setIsFullyLoaded(true);
    }
  }, []);

  return (
    <LoadingContext.Provider value={{ state: { totalFrames, loadedFrames, isFullyLoaded }, registerSection, reportLoaded, markSectionDone }}>
      {children}
    </LoadingContext.Provider>
  );
};
