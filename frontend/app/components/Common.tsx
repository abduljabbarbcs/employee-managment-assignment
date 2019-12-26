import React from 'react';
import styled from '@emotion/styled';
import * as style from 'styles';
import { Flex } from './Flex';
import { IButtonProps, Button } from './form/Button';
import { Icon } from './Icon';
import CloseImg from 'assets/icons/x-white.svg';

export const Title = styled(Flex)({
  fontSize: '1.3em',
  fontWeight: style.constants.font.weight.bold,
});

export const Subtext = styled(Flex)({
  fontSize: '0.9em',
  fontStyle: 'italic',
  fontWeight: style.constants.font.weight.regular,
});

export const Instructions = styled(Flex)({
  fontWeight: style.constants.font.weight.medium,
  fontSize: '1.1em',
});

export const Emphasized = styled(Flex)({
  color: style.theme.page.emphasizedText,
});

export const Warning = styled(Subtext)({
  color: style.theme.page.emphasizedText,
});

export const Muted = styled(Subtext)({
  color: style.theme.page.mutedText,
});

export const OverflowableText = styled('span')({
  minWidth: 0,
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const CloseButton: React.FC<IButtonProps> = props => (
  <Button
    testId="close"
    icon={<Icon src={CloseImg} />}
    size="fit"
    intent="subtle"
    css={{ padding: '0.5em', transform: 'translateX(0.5em)' }}
    {...props}
  />
);

export function useDocumentTitle(title) {
  React.useEffect(() => {
    document.title = `Employee Managment | ${title }`;
  }, [title]);
}
