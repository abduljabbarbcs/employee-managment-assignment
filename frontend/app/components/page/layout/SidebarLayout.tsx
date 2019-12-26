import React from 'react';
import { Flex, FlexComponent } from '../../Flex';
import { Sidebar, Expander } from '../../../components/navigation';
import { CSSObject } from '@emotion/core';
import * as style from 'styles';
import styled from '@emotion/styled-base';
import { Icon } from 'app/components/Icon';
import { MenuItem } from 'app/components/navigation';
import { If } from '../../utils/If';
import isNil from 'ramda/es/isNil';
import isEmpty from 'ramda/es/isEmpty';
import { EmployeeManagmentLogo } from 'app/components/page/sidebar/EmployeeManagmentLogo';
import { useTransitionState } from 'app/components/utils/useTransitionState';


export const SidebarTransitionContext = React.createContext(false);

const tabTextStyles: CSSObject = {
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  paddingLeft: '1em',
};

const TabIcon = styled(Icon)({
  height: '100%',
  width: `calc(${style.constants.sidebar.width.collapsed} / 3)`,
  flexShrink: 0,
});

interface MenuItem {
  isActive?: () => boolean;
  action: () => void;
  icon?: string;
  iconPosition?: string;
  tooltip?: string | React.ReactNode;
  text?: string | React.ReactNode;
  hasSeparator?: boolean;
  externalLink?: string;
  activeIsToggleable?: boolean;
  subMenu?: MenuItem[];
  expandedContent?: () => React.ReactNode;
  testId?: string;
}

interface Menu {
  menuItems: MenuItem[];
}


const Menu: FlexComponent<{
  menuItems: MenuItem[];
  expanded: boolean;
}> = ({ menuItems, expanded }) => {
  const renderMenuItems = menuItems.map((mi, index) => {

    const [subMenuOpen, setSubMenuOpen] = React.useState(false);

    const hasIcon = !isNil(mi.icon) && !isEmpty(mi.icon);
    const hasSubmenu: boolean = !!mi.subMenu;
    const isActive: boolean =
      subMenuOpen || (!isNil(mi.isActive) && mi.isActive());

    const content: any = !isEmpty(mi.expandedContent)
      ? mi.expandedContent
      : () => {};

    return (
      <Flex
        key={index}
        onClick={() => {
          if (hasSubmenu) setSubMenuOpen(!subMenuOpen);
          mi.action();
        }}
        testId={mi.testId}>
        <If condition={!!mi.hasSeparator}>
          <Flex
            css={{
              backgroundColor: '#6f7b8a',
              display: 'block',
              height: '1px',
              left: '4px',
              position: 'absolute',
              top: 0,
              width: 'calc(100% - 8px)',
            }}
          />
        </If>
        <MenuItem active={isActive}>
          <If condition={hasIcon}>
            <TabIcon src={mi.icon || ''} />
          </If>
          <Flex grow css={tabTextStyles}>
            <If condition={expanded}>
              <Flex>{content()}</Flex>
            </If>
          </Flex>
        </MenuItem>
      </Flex>
    );
  });

  return <Flex>{renderMenuItems}</Flex>;
};

export const SidebarLayout: React.FC<{
  menus: Menu[];
}> = ({ menus, children, ...props }) => {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isTransitioning = useTransitionState(sidebarRef);

  const renderedMenus = menus.map((menu, index) => {
    return (
      <Menu key={index} menuItems={menu.menuItems} expanded={isExpanded} />
    );
  });

  return (
    <Flex {...props} row grow css={{ height: '100%', width: '100%' }}>
      <Sidebar ref={sidebarRef} expanded={isExpanded}>
        <EmployeeManagmentLogo expanded={isExpanded} />
        <Flex grow justify={'space-between'}>
          {renderedMenus}
        </Flex>
      </Sidebar>
      <Flex grow shrink contain>
        <SidebarTransitionContext.Provider value={isTransitioning}>
          {children}
        </SidebarTransitionContext.Provider>
        <Expander
          expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        />
      </Flex>
    </Flex>
  );
};
