import React from 'react';
import { observer } from 'mobx-react-lite';
import * as style from 'styles';
import { IFlexProps, FlexGap, FlexForm, AbsoluteFill } from '../Flex';
import { useDocumentTitle } from '../Common';
import { Logo } from '../Logo';

export const PublicPage: React.FC<{ title: string }> = observer(
  ({ title, children }) => {
    useDocumentTitle(title);
    return (
      <AbsoluteFill>
        <Form grow alignSelf="center" justify="center">
          <Logo />
          <Controls>{children}</Controls>
        </Form>
      </AbsoluteFill>
    );
  },
);

const Form: React.FC<IFlexProps> = props => (
  <FlexForm
    css={{
      width: '25em',
      textAlign: 'center',
    }}
    {...props}
  />
);

const Controls: React.FC = props => (
  <FlexGap
    justify="center"
    align="center"
    spacing={style.constants.form.loginSpacing}
    {...props}
  />
);
