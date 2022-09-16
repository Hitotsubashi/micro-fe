import { createContext, useContext } from 'react';
import { Store } from 'redux';

const SharedContext = createContext<Store | undefined>(null!);

function useShared() {
  return useContext(SharedContext);
}

export { SharedContext, useShared };
