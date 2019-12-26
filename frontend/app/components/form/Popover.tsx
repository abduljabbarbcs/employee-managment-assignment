import React from 'react';
import { PopoverProps as ReactPopoverProps } from 'reactstrap';
import TooltipPopoverWrapper from 'reactstrap/lib/TooltipPopoverWrapper';
import { observer } from 'mobx-react';
import * as style from 'styles';
import { ClassNames } from '@emotion/core';
import { Flex } from '../Flex';
import isNil from 'ramda/es/isNil';

export type PopoverProps = Omit<ReactPopoverProps, 'target'> & {
  target: MaybeNull<string | HTMLElement>;
  container?: string;
  position?: PositionType;
  isOpen: boolean;
  close?: () => void;
  closeWhenClicked?: boolean;
  showArrow?: boolean;
  cursorEvents?: boolean;
  size?: string;
  kind?: 'light' | 'dark';
};

export const Popover: React.FC<PopoverProps> = observer(
  ({
    target,
    container,
    position = 'auto',
    isOpen = false,
    close,
    children,
    showArrow = true,
    cursorEvents = true,
    size,
    kind = 'light',
    closeWhenClicked = true,
    className,
    ...rest
  }) => {
    return isNil(target) ? null : (
      /**
       * Due to https://github.com/reactstrap/reactstrap/issues/1484,
       * we're using TooltipPopoverWrapper directly with emotion ClassNames
       */
      <ClassNames>
        {({ css, cx }) => (
          <TooltipPopoverWrapper
            popperClassName={cx(
              css([
                baseStyle,
                { minWidth: size === 'small' ? '6.8em' : '7.5em' },
                kind === 'light' ? lightColors : darkColors,
                !showArrow && { '.arrow': { display: 'none' } },
                !cursorEvents && { pointerEvents: 'none' },
              ]),
              className,
              'popover',
              'show',
            )}
            placementPrefix="bs-popover"
            innerClassName="popover-inner"
            placement={position}
            target={target as (string | HTMLElement)}
            container={container}
            isOpen={isOpen}
            toggle={close}
            delay={0}
            fade={false}
            flip={false}
            trigger="legacy"
            {...rest}>
            <Flex
              onClick={
                !closeWhenClicked ? e => e.stopPropagation() : undefined
              }>
              {children}
            </Flex>
          </TooltipPopoverWrapper>
        )}
      </ClassNames>
    );
  },
);

const baseStyle = {
  borderRadius: 3,
  padding: 2,
  fontFamily: style.constants.font.family,

  maxWidth: 'none',

  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16)',

  li: {
    cursor: 'pointer',
    display: 'block',
    padding: '0.25em 0.4em',

    '&:hover': {
      backgroundColor: style.theme.popover.hover,
    },
  },
};

const lightColors = {
  color: style.theme.popover.light.color,
};

const darkColors = {
  color: style.theme.page.text,
  backgroundColor: style.theme.popover.dark.background,
  '&.bs-popover-bottom .arrow::after': {
    borderBottomColor: style.theme.popover.dark.background,
  },
  '&.bs-popover-top .arrow::after': {
    borderTopColor: style.theme.popover.dark.background,
  },
  '&.bs-popover-left .arrow::after': {
    borderLeftColor: style.theme.popover.dark.background,
  },
  '&.bs-popover-right .arrow::after': {
    borderRightColor: style.theme.popover.dark.background,
  },
};
