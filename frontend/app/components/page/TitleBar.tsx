import React from 'react';
import { FlexComponent, Flex } from 'app/components/Flex';
import * as style from 'styles';

export const TitleBar: FlexComponent = props => (
  <Flex
    css={{
      padding: style.constants.page.padding,
      backgroundColor: style.theme.page.titlebar,
    }}
    {...props}
  />
);
