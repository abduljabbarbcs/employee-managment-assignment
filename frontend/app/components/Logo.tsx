import React from 'react';
import * as style from 'styles';
import { Icon } from './Icon';
import LogoImg from 'assets/logos/employee-managment-logo.png';
import { Flex } from './Flex';

export const Logo = () => (
  <Flex
    css={{
      marginBottom: `calc(${style.constants.form.loginSpacing} + 0.5em)`,
    }}>
    <Icon size={{ width: '100%', height: '5em' }} src={LogoImg} />
  </Flex>
);
