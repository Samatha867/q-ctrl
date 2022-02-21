import { CircularProgress } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";

export const SEARCH = "SEARCH";

type countryType = {
  name: {
    common: string;
  };
  flags: string[];
  population: number;
  demonyms: {
    eng: {
      f: string;
    };
  };
};

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const AppContext = createContext<countryType[] | null>(null);

export function useAppState() {
  const context = useContext(AppContext);
  return context;
}

export function AppStateProvider({ children }: Props) {
  const [data, setData] = useState<countryType[] | null>(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3/all")
      .then((res) => res.json())
      .then((result: countryType[]) =>
        setData(
          result.sort((a, b) => {
            var nameA = a.name.common.toUpperCase();
            var nameB = b.name.common.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        )
      );
  }, []);

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
}
