import { createContext, useContext } from 'react';
import SportybuddiesApiClient from '../api/SportybuddiesApiClient';

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const api = new SportybuddiesApiClient();

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApi() {
  return useContext(ApiContext);
}