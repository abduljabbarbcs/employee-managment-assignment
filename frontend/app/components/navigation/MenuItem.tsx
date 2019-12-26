import React from 'react';
import { CSSObject } from '@emotion/core';
import { Flex } from '../Flex';

export const MenuItem: React.FC<{
  id?: string;
  active?: boolean;
  onClick?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
}> = ({ active, children, ...props }) => {
  let menuItemStyles: CSSObject = {
    borderRadius: 0,
    height: '4.5em',
    backgroundColor: 'transparent',
    borderLeft: '4px solid transparent',
    padding: '1.4em',
    cursor: 'pointer',
    alignItems: 'center',
    transition: 'border-left 200ms, background-color 200ms',
    '&:hover': {
      backgroundColor: '#536072',
    },
  };
  const activeStyles: CSSObject = {
    borderLeftColor: '#febe10',
    backgroundColor: '#536072',
  };

  return (
    <Flex row contain css={[menuItemStyles, active && activeStyles]} {...props}>
      {children}
    </Flex>
  );
};
