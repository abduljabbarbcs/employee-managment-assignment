import React, { isValidElement } from 'react';

interface Props {
  condition: boolean;
  not?: boolean;
  children: React.ReactElement | null;
}

const shouldRender = ({ not, condition }: Props) =>
  not ? !condition : condition;

/**
 * A component that gives JSX syntactic sugar around the common pattern
 *   { condition ? <Component /> : null }
 */
export const If: React.FC<Props> = props =>
  shouldRender(props) ? props.children : null;

/**
 * Although <If> is syntactic sugar, it still affects the vdom tree by inserting an element around its children. If you need to pierce the veil of that element, you can check the logic manually with this export.
 */
export const isIfElementThatRenderedNull = (element: {} | null | undefined) =>
  isValidElement<Props>(element) &&
  element.type === If &&
  !shouldRender(element.props);
