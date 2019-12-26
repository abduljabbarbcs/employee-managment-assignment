import React from 'react';
import { Flex, IFlexProps } from 'app/components/Flex';
import styled from '@emotion/styled';
import * as style from 'styles';

export const Panel: React.FC<IFlexProps> = props => (
  <Flex
    grow
    shrink
    scrollY
    css={{ backgroundColor: style.theme.panel.background }}
    {...props}
  />
);

export const PanelTitle = styled(Flex)({
  fontWeight: style.constants.font.weight.bold,
  paddingBottom: '0.5em',
});

export const TitledPanel: React.FC<
  { title: FormattedMessageId } & IFlexProps
> = ({ title, children, ...rest }) => (
  <Flex grow {...rest}>
    <PanelTitle>
      {title}
    </PanelTitle>
    <Panel>{children}</Panel>
  </Flex>
);
