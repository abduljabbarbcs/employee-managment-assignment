import React from 'react';
import { CSSObject } from '@emotion/core';
import { AbsoluteFill } from '../Flex';
import { Icon } from 'app/components/Icon';
import GreenChevronIcon from 'assets/icons/chevron-green.svg';
import { useStyle } from 'styles';

export const Expander: React.FC<{
  expanded: boolean;
  onClick: any;
}> = ({ expanded, onClick }) => {
  const { theme } = useStyle();

  const highlightBarStyles: CSSObject = {
    height: '100%',
    width: '1.2em',
    borderLeft: '2px solid transparent',
    transition: 'all 200ms',
    '&:hover': {
      cursor: 'pointer',
      borderLeftColor: theme.brand,
      '> i': {
        opacity: 1,
      },
    },
  };
  const ChevronStyles: CSSObject = {
    position: 'absolute',
    display: 'block',
    top: '50%',
    left: 0,
    opacity: 0,
    transition: 'all 200ms',
  };
  const rotatedStyles: CSSObject = {
    transform: 'rotate(180deg)',
  };

  return (
    <AbsoluteFill css={highlightBarStyles} onClick={onClick}>
      <Icon
        css={expanded ? { ...ChevronStyles, ...rotatedStyles } : ChevronStyles}
        src={GreenChevronIcon}
      />
    </AbsoluteFill>
  );
};
