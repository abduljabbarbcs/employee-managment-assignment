import React from 'react';
import { CSSObject } from '@emotion/core';
import { Flex, FlexComponentProps } from '../Flex';

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  FlexComponentProps & {
    expanded: boolean;
  }
>(({ expanded, ...rest }, ref) => {
  return (
    <Flex
      ref={ref}
      css={[sideBarStyles, expanded && expandedStyles]}
      {...rest}
    />
  );
});

const sideBarStyles: CSSObject = {
  backgroundColor: '#3f4e62',
  height: '100%',
  width: '4.5em',
  transition: 'width 200ms',
  zIndex: 200,
  overflow: 'visible',
};
const expandedStyles: CSSObject = {
  width: '15.5em',
};
