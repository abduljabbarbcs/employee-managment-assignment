import React, { useContext } from 'react';
import EmployeeManagmentIcon from 'assets/logos/employee-managment-logo.png';
import { Icon } from 'app/components/Icon';
import { CSSObject } from '@emotion/core';
import { Flex } from '../../Flex';
import { MenuItem } from 'app/components/navigation';
import { useStyle } from 'styles';
import { StoreContext } from 'store';

export const EmployeeManagmentLogo: React.FC<{
  expanded: boolean;
}> = ({ expanded }) => {
  const { theme } = useStyle();
  const { view } = useContext(StoreContext);

  const headerStyles: CSSObject = {
    padding: '1em',
    border: 'none',
    transition: 'none',
    backgroundColor: theme.brand,
    '&:hover': {
      backgroundColor: theme.brand,
    },
  };

  return (
    <Flex css={{ marginBottom: '15px' }}>
      <MenuItem css={headerStyles} onClick={() => view.showEmployee()}>
        <Icon
          size="100%"
          src={expanded ? EmployeeManagmentIcon : EmployeeManagmentIcon}
        />
      </MenuItem>
    </Flex>
  );
};
