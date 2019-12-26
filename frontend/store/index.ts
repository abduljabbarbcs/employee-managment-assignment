import React from 'react';
import { ViewStore } from './by-data/view.store';

export class Store {
  view: ViewStore;

  constructor() {
    this.view = new ViewStore();
  }
}

export const StoreContext = React.createContext({} as Store);
