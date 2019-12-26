import React from 'react';
import { Global, css } from '@emotion/core';
import { theme } from './theme';
import { constants } from './constants';

const styles = css({
  body: {
    backgroundColor: theme.page.background,
    color: theme.page.text,
    fontFamily: constants.font.family,
    fontSize: constants.font.size,
    fontWeight: constants.font.weight.regular,
    height: '100vh',
    letterSpacing: '0.01em',
    lineHeight: 1.43,
    minHeight: constants.mediaBreak.height,
    minWidth: constants.mediaBreak.tablet,
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',

    /* Font smoothing */
    MozOsxFontSmoothing: 'grayscale',
    WebkitFontSmoothing: 'antialiased',

    /* Disable select */
    userSelect: 'none',
    WebkitTouchCallout: 'none',
  },

  '*': {
    boxSizing: 'border-box',
  },

  '*::-webkit-scrollbar': {
    height: '0.5em',
    width: '0.5em',
  },

  '*::-webkit-scrollbar-track': {
    backgroundColor: theme.scroll.onDark.track,
  },

  '*::-webkit-scrollbar-thumb': {
    backgroundColor: theme.scroll.onDark.thumb,
    borderRadius: 5,
    transition: '200ms',
  },

  a: {
    color: theme.page.text,
    textDecoration: 'none',
    ':hover': {
      color: theme.page.text,
      textDecoration: 'none',
    },
  },

  '.highcharts-tooltip-header': {
    display: 'none !important',
  },
});

export const GlobalStyles = () => <Global styles={styles} />;
