import React from 'react';
import * as style from 'styles';
import { Flex, IFlexProps } from 'app/components/Flex';

export const SubtitleBar: React.FC<IFlexProps> = props => (
  <Flex
    row
    align="center"
    css={{
      backgroundColor: style.theme.subtitleBar,
      padding: style.constants.page.padding,
    }}
    {...props}
  />
);
