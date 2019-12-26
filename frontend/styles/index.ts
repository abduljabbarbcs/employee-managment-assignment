import React from 'react';
import { theme } from './theme';
import { constants } from './constants';

export * from './theme';
export * from './constants';
export * from './GlobalStyles';

export const style = { theme, constants };
export type Style = typeof style;
export const StyleContext = React.createContext(style);
export const useStyle = () => React.useContext(StyleContext);
