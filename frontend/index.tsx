import { App } from 'app/App';
import { configure } from 'mobx';
import { enableLogging } from 'mobx-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import { Store, StoreContext } from 'store';
import { GlobalStyles, StyleContext, style } from 'styles';
import { startRouter } from 'utils/router';

console.log(process.env.VERSION);

//* Configure MobX
configure({ enforceActions: 'observed' });

if (process.env.NODE_ENV !== 'production') {
  enableLogging({
    action: false,
    reaction: false,
    transaction: false,
    compute: false,
  });
}

const store = new Store();
startRouter(store.view);

const Providers = ({ children }) => (
  <StoreContext.Provider value={store}>
    <StyleContext.Provider value={style}>
        {children}
    </StyleContext.Provider>
  </StoreContext.Provider>
);

//* Bootstrap React app
ReactDOM.render(
  <>
    <GlobalStyles />
    <Providers>
      <App />
    </Providers>
  </>,
  document.getElementById('employee-management-app'),
);
