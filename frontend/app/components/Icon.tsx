import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { FlexComponent, Flex } from './Flex';
import isNil from 'ramda/es/isNil';
import * as style from 'styles';

export interface IProps {
  src: string;
  size?: CssSize | Size;
}

const iconSize = ({ size = '1em' }: IProps) =>
  typeof size === 'object'
    ? size
    : css({
        height: size,
        width: size,
      });

export const Icon = styled.i<IProps>(
  {
    display: 'inline-block',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    fontFamily: style.constants.font.family,
    verticalAlign: 'middle',
  },
  props => ({ backgroundImage: `url(${props.src})` }),
  iconSize,
);

/**
 * Adds a badge to the top right of the child element.
 */
export const Badge: FlexComponent<{
  count: number; // Number to show in badge
  showZero?: boolean; // whether to display badge when count is zero
}> = ({ count, showZero = false, children, ...rest }) => (
  <Flex css={{ overflow: 'visible' }} {...rest}>
    {children}
    {!isNil(count) && (count !== 0 || showZero) && (
      <Flex
        align="center"
        justify="center"
        css={{
          position: 'absolute',
          top: 0,
          right: 0,
          transform: 'translate(50%, -50%)',
          backgroundColor: style.theme.badge,
          padding: '0px 5px',
          borderRadius: 10,
          fontSize: 11,
          lineHeight: 1.6,
          fontWeight: style.constants.font.weight.medium,
          minWidth: 17,
        }}>
        {count}
      </Flex>
    )}
  </Flex>
);
