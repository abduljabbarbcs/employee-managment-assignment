import React from 'react';
import { messageOrComponent } from './utils';
import { FlexGap, FlexComponent } from './Flex';
import { Spinner as WebkitSpinner } from 'reactstrap';
import { PropsOf } from '@emotion/styled-base/types/helper';

export const Spinner: FlexComponent<
  PropsOf<typeof WebkitSpinner> & { label?: MessageOrComponent }
> = ({ size, label, ...rest }) => (
  <FlexGap spacing="0.5rem" align="center" justify="center" {...rest}>
    <WebkitSpinner color="secondary"/>
    {label ? messageOrComponent(label) : null}
  </FlexGap>
);
