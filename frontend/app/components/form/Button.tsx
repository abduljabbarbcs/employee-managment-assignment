import React from 'react';
import * as style from 'styles';
import { css, SerializedStyles } from '@emotion/core';
import { IFlexProps, FlexButton, Gap } from '../Flex';
import { observer } from 'mobx-react-lite';
import ArrowImg from 'assets/icons/chevron-white.svg';
import YellowArrowImg from 'assets/icons/chevron-yellow.svg';
import ExportImg from 'assets/icons/export.svg';
import { messageOrComponent } from '../utils';
import { Spinner } from '../Spinner';
import { Icon } from '../Icon';
import { PropsOf } from '@emotion/styled-base/types/helper';

type ButtonIntentType = 'default' | 'primary' | 'danger' | 'subtle' | 'text';
type ButtonSizeType = 'normal' | 'large' | 'small' | 'fit';
type IconType = 'arrow' | 'export';

export interface IButtonProps extends IFlexProps {
  text?: MessageOrComponent;
  intent?: ButtonIntentType;
  size?: ButtonSizeType;
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: IconType | React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?(e: React.SyntheticEvent<HTMLButtonElement>): void;
}

type Props = IButtonProps &
  PropsOf<typeof FlexButton> &
  JSX.IntrinsicElements['button'];
export const Button: React.FC<Props> = observer(
  ({
    text,
    type = 'button',
    intent = 'default',
    size = 'normal',
    isDisabled = false,
    isLoading,
    onClick,
    icon,
    iconPosition = 'right',
    testId = 'button',
    ...rest
  }: Props) => {
    const iconEl =
      typeof icon === 'string'
        ? icons[icon]
        : React.isValidElement(icon)
        ? icon
        : null;
    const leftIcon = iconPosition === 'left' ? iconEl : null;
    const rightIcon = iconPosition === 'right' ? iconEl : null;

    const onDefaultClick = (e: React.SyntheticEvent<HTMLButtonElement>) =>
      e.preventDefault();

    return (
      <FlexButton
        row
        align="center"
        justify="center"
        css={[baseStyle, ofSize[size], ofIntent[intent]]}
        type={type}
        disabled={isDisabled || isLoading}
        testId={testId}
        onClick={onClick && !isLoading ? onClick : onDefaultClick}
        {...rest}>
        <Gap row spacing={style.constants.page.textSpacing}>
          {leftIcon}
          {text ? messageOrComponent(text) : null}
          {rightIcon}
          {isLoading ? <Spinner size={1.5} /> : null}
        </Gap>
      </FlexButton>
    );
  },
);

const icons: Record<IconType, React.ReactNode> = {
  arrow: (
    <Icon
      size="0.85em"
      src={ArrowImg}
      css={{ transform: 'translateY(-1px) rotate(90deg)' }}
    />
  ),
  export: (
    <Icon
      size="1.4em"
      src={ExportImg}
      css={{ transform: 'translateY(-1px)' }}
    />
  ),
};

const baseStyle = css({
  border: 0,
  borderRadius: '2px',
  color: style.theme.page.text,
  cursor: 'pointer',
  fontFamily: style.constants.font.family,
  fontWeight: style.constants.font.weight.medium,
  padding: '0 1em',
  transition: 'all 200ms',
  whiteSpace: 'nowrap',

  '&:disabled': {
    cursor: 'not-allowed',
  },
});

const ofSize: Record<ButtonSizeType, SerializedStyles> = {
  fit: css({
    padding: 0,
  }),
  small: css({
    height: style.constants.form.height,
    minWidth: 'auto',
  }),
  normal: css({
    height: '2.5em',
    minWidth: '8em',
  }),
  large: css({
    height: style.constants.form.heightLarge,
    minWidth: '12em',
  }),
};

const colorStyle = (base: string) => ({
  backgroundColor: style.rgba(base, 0.8),
  '&:hover': {
    backgroundColor: base,
  },
  '&:disabled': {
    backgroundColor: style.rgba(base, 0.4),
    color: style.rgba(style.theme.page.text, 0.4),
  },
});

const ofIntent: Record<ButtonIntentType, SerializedStyles> = {
  default: css(colorStyle(style.theme.button.default)),
  subtle: css([
    colorStyle(style.theme.button.default),
    {
      backgroundColor: 'transparent',
      opacity: 0.8,
      '&:hover': {
        opacity: 1.0,
      },
      '&:disabled': {
        backgroundColor: 'transparent',
        opacity: 0.5,
      },
    },
  ]),
  primary: css(colorStyle(style.theme.button.primary)),
  danger: css(colorStyle(style.theme.button.danger)),
  text: css({
    backgroundColor: 'transparent',
    '&:hover': { textDecoration: 'underline' },
    '&:focus': { outline: 'none' },
  }),
};

export const ExportButton: React.FC<Partial<IButtonProps>> = props => (
  <Button
    icon="export"
    iconPosition="left"
    size="small"
    text="ModelPrediction.export"
    css={{ fontSize: 12, fontWeight: style.constants.font.weight.regular }}
    {...props}
  />
);

export const TextButton: React.FC<IButtonProps> = props => (
  <Button
    css={{
      color: style.theme.page.text,
      fontWeight: style.constants.font.weight.regular,
    }}
    size="fit"
    intent="text"
    {...props}
  />
);

export const CollapsableButton: React.FC<
  IButtonProps & {
    isExpanded: boolean;
  }
> = ({ isExpanded, ...rest }) => (
  <TextButton
    iconPosition="left"
    css={{ fontWeight: style.constants.font.weight.medium }}
    icon={
      <Icon
        size="0.7rem"
        src={YellowArrowImg}
        css={{
          transition: 'transform 200ms',
          transform: `rotate(${isExpanded ? 90 : 0}deg)`,
        }}
      />
    }
    {...rest}
  />
);
