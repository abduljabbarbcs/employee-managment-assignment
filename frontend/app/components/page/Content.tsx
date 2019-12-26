import React from 'react';
import * as style from 'styles';
import { Flex, IFlexProps } from 'app/components/Flex';

interface ContentProps {
  fill?: boolean;
}

export const Content: React.FC<IFlexProps & ContentProps> = ({
  fill,
  ...props
}) => (
  <Flex
    grow
    shrink
    css={{
      padding: fill ? 0 : style.constants.page.padding,
      overflow: 'auto',
      height: '0px', // solves layout problem when grid is inside flex for some reason
    }}
    {...props}
  />
);
