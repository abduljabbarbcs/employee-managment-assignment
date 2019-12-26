import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import React from 'react';
import flattenChildren from 'react-flatten-children';
import Measure from 'react-measure';
import { isIfElementThatRenderedNull } from './utils/If';
import { PropsOf } from '@emotion/styled-base/types/helper';

type Alignment = 'stretch' | 'center' | 'baseline' | 'start' | 'end';
type Justification =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';

// "start" and "end" are aliases for "flex-start", "flex-end"
const prefix = (value: Alignment | Justification | string) =>
  value === 'start' || value === 'end' ? `flex-${value}` : value;

/**
 * Defaults are aligned to the original Facebook `css-layout` (now `yoga`).
 * See (https://github.com/facebook/yoga/blob/4d964bdbc378d1029bbba8ce8f90d32b18516fd0/README.md)
 */

export interface IFlexProps {
  row?: boolean;
  reverse?: boolean;
  wrap?: boolean;
  align?: Alignment;
  alignSelf?: Alignment;
  justify?: Justification;
  shrink?: number | boolean;
  grow?: number | boolean;
  scroll?: boolean;
  scrollX?: boolean;
  scrollY?: boolean;
  contain?: boolean;
  inline?: boolean;
  basis?:
    | 'auto'
    | 'fill'
    | 'min-content'
    | 'max-content'
    | 'fit-content'
    | 'content'
    | CssSize;
  testId?: string;
}

const base = css({
  boxSizing: 'border-box',
  position: 'relative',
  border: '0 solid black',
  margin: 0,
  padding: 0,
  minWidth: 0,
});

const flex = (props: IFlexProps) => {
  const {
    row = false,
    reverse = false,
    wrap = false,
    basis = 'auto',
    align = 'stretch',
    justify = 'normal',
    alignSelf = 'auto',
    contain = false,
    scroll = false,
    scrollX = false,
    scrollY = false,
    inline = false,
  } = props;

  let { grow = 0, shrink = 0 } = props;

  // Grow and shrink have boolean aliases for convenience in the common
  // case of the value being 1. e.g. <Flex grow/>
  if (typeof grow === 'boolean') {
    grow = grow ? 1 : 0;
  }
  if (typeof shrink === 'boolean') {
    shrink = shrink ? 1 : 0;
  }

  return css(
    {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: `${row ? 'row' : 'column'}${
        reverse ? '-reverse' : ''
      }` as FlexDirection,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      flexGrow: grow,
      flexShrink: shrink,
      flexBasis: basis,
      alignItems: prefix(align),
      alignContent: 'flex-start',
      alignSelf: prefix(alignSelf),
      justifyContent: prefix(justify),
    },
    contain && { overflow: 'hidden' },
    scrollX && { overflowX: 'auto' },
    scrollY && { overflowY: 'auto' },
    scroll && { overflow: 'auto' },
  );
};

const BaseDiv = styled('div', {
  shouldForwardProp: prop =>
    isPropValid(prop) && prop !== 'wrap' && prop !== 'overflow',
})<IFlexProps>(base, flex);
const BaseButton = BaseDiv.withComponent('button');
const BaseForm = BaseDiv.withComponent('form');

/**
 * Flex is our primary view primitive.
 *
 * Implements a `div` with a flex layout. The most common flex parameters are exposed as props. Defaults inspired by Facebook's yoga (see above). The defaults provide the following properties:
 *
 * * box-sizing: border-box is the most convenient way to express the relation between width and borderWidth.
 * * Everything is display: flex by default. All the behaviors of block and inline-block can be expressed in term of flex but not the opposite.
 * * All the flex elements are oriented from top to bottom, left to right and do not shrink. This is how things are laid out using the default CSS settings and what you'd expect.
 * * Everything is position: relative. This makes position: absolute target the direct parent and not some parent which is either relative or absolute. If you want to position an element relative to something else, you should move it in the DOM instead of relying of CSS. It also makes top, left, right, bottom do something when not specifying position: absolute.
 *
 * TODO: I could not find a way to get a strongly typed Flex which includes the ability to override its base tag (div/button/etc). As a temporary work around, the specific tags currently in use are manually built and exported here.
 */
export const Flex = React.forwardRef<
  HTMLDivElement,
  IFlexProps & JSX.IntrinsicElements['div']
>((props, ref) => <BaseDiv ref={ref} data-test={props.testId} {...props} />);

export type FlexComponentProps = PropsOf<typeof Flex>;

/**
 * A convenient type for a component that is wrapped with a Flex which it will pass its ...rest parameters to
 */
export type FlexComponent<ExtraProps = {}> = React.FC<
  FlexComponentProps & ExtraProps
>;

export const FlexButton = React.forwardRef<
  HTMLButtonElement,
  IFlexProps & JSX.IntrinsicElements['button']
>((props, ref) => <BaseButton ref={ref} data-test={props.testId} {...props} />);

export const FlexForm = React.forwardRef<
  HTMLFormElement,
  IFlexProps & JSX.IntrinsicElements['form']
>((props, ref) => <BaseForm ref={ref} data-test={props.testId} {...props} />);

/**
 * Adding a gap between flex children is a very common operation.
 *
 * While grid layouts have a css property to do this, flexbox is missing it. A simple solution is to intersperse spacer elements between an array of children.
 *
 */
export const Gap: React.FC<{
  row?: boolean;
  spacing: CssSize;
}> = ({ row = false, spacing, children }) => {
  const flattened: React.ReactElement[] = flattenChildren(children);
  return flattened.length > 1 ? (
    <>
      {flattened.reduce(
        (result, child, index) => {
          /*
           * Special case:
           *
           * The <If> component exists to provide JSX syntactic sugar around the pattern
           *   { condition ? <Component /> : null }
           * but using it inserts another React Element into the tree that obscures when null
           * was rendered. To avoid adding an extra spacer for a `null` element, we have to
           * check here whether it will resolve to null or not.
           */
          if (isIfElementThatRenderedNull(child)) {
            return result;
          }

          //* Insert a spacer, but not before the first element
          if (index !== 0) {
            result.push(
              <Flex
                key={`${index}.spacer`}
                css={{ [row ? 'width' : 'height']: spacing }}
              />,
            );
          }

          result.push(child);
          return result;
        },
        [] as React.ReactElement[],
      )}
    </>
  ) : (
    (children as React.ReactElement<any>)
  );
};

export const FlexGap = React.forwardRef<
  HTMLDivElement,
  FlexComponentProps & React.ComponentPropsWithoutRef<typeof Gap>
>(({ children, row, spacing, ...props }, ref) => (
  <Flex row={row} ref={ref} {...props}>
    <Gap row={row} spacing={spacing}>
      {children}
    </Gap>
  </Flex>
));

export type LayoutMeasurement = {
  bounds: DOMRect;
  scroll?: Partial<DOMRect>;
};

export type MeasuredRender = (
  measurement: LayoutMeasurement,
) => React.ReactNode;

const MeasurableFlex = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<typeof Flex>
>((props, ref) => <Flex ref={ref} {...props} />);

export const AbsoluteFill = styled(Flex)({
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

export class MeasuredFlex extends React.Component<
  IFlexProps & {
    scroll?: boolean;
    onResize?: (measurement: LayoutMeasurement) => void;
    forwardedRef?: (element: HTMLDivElement) => void;
    children: MeasuredRender;
  }
> {
  /**
   * To allow the parent component to get its own ref to the measured one, we need to guard against multiple changes or else the component will continually rerender. This is a temporary fix.
   *
   * See https://github.com/souporserious/react-measure/issues/90
   */
  lastRef: Maybe<HTMLDivElement> = undefined;

  render() {
    const {
      scroll = false,
      onResize,
      forwardedRef,
      children: measuredRender,
      ...rest
    } = this.props;
    return (
      <Measure bounds scroll={scroll} onResize={onResize}>
        {({ measureRef, measure, contentRect: measurement }) => (
          <MeasurableFlex
            {...rest}
            ref={ref => {
              if (ref && ref !== this.lastRef) {
                this.lastRef = ref;
                measureRef(ref);
                if (forwardedRef) forwardedRef(ref);
              }
            }}
            onScroll={scroll ? () => measure() : undefined}>
            <AbsoluteFill>{measuredRender(measurement)}</AbsoluteFill>
          </MeasurableFlex>
        )}
      </Measure>
    );
  }
}
