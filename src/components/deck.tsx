import { createContext, useCallback, useContext, useState } from "react";

type DeckValue = {
  visited: string[];
  docked: string | null;
  dock: (year: string) => void;
  clearLog: () => void;
};

const DeckContext = createContext<DeckValue | null>(null);

export const DeckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visited, setVisited] = useState<string[]>([]);
  const [docked, setDocked] = useState<string | null>(null);

  const dock = useCallback((year: string) => {
    setDocked(year);
    setVisited((prev) => (prev.includes(year) ? prev : [...prev, year]));
  }, []);

  const clearLog = useCallback(() => {
    setVisited([]);
    setDocked(null);
  }, []);

  return (
    <DeckContext.Provider value={{ visited, docked, dock, clearLog }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const value = useContext(DeckContext);
  if (!value) {
    throw new Error("Deck controls are outside the deck provider");
  }
  return value;
};
