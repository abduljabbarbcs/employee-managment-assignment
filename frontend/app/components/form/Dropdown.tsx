import React from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Popover, PopoverProps } from './Popover';
import BlackArrowImg from 'assets/icons/chevron-black.svg';
import YellowArrowImg from 'assets/icons/chevron-yellow.svg';
import * as style from 'styles';
import { Icon } from 'app/components/Icon';
import css, { CSSObject } from '@emotion/css';
import isNil from 'ramda/es/isNil';
import { If } from '../utils/If';

interface IBaseProps {
  id: string;
  testId?: string;
  variant: 'selector' | 'menu' | 'noScroll' | 'dark';
  showArrow?: boolean;
}

interface Controls {
  isOpen: boolean;
  toggle(): void;
}

export type DropdownOptionsParams = { label: string; onClick: ClickHandler };
export type DropdownOptionsMap = Map<string, DropdownOptionsParams>;

/**
 * The Dropdown options can either be your own rendered list of elements (probably <li>), or a `DropdownOptionsMap`.
 *  If you pass a map, the list elements will be rendered for you and the `currentSelection` is interpreted as an ID into this map
 */
type OptionProps =
  | {
      currentSelection?: React.ReactNode;
      children: React.ReactNodeArray;
    }
  | {
      currentSelection?: string;
      children: DropdownOptionsMap;
    };

export type DropdownProps = IBaseProps &
  Partial<Controls> &
  OptionProps &
  Pick<PopoverProps, 'closeWhenClicked'>;

@observer
export class Dropdown extends React.Component<DropdownProps> {
  containerRef = React.createRef<HTMLButtonElement>();

  static defaultProps = {
    id: '',
    isOpen: false,
    variant: 'selector',
  };

  public render() {
    const { controls, options } = this;
    const {
      id,
      variant,
      testId = 'dropdown',
      currentSelection,
      closeWhenClicked,
      isOpen,
      toggle,
      showArrow = true,
      ...rest
    } = this.props;

    return (
      <button
        id={id}
        ref={this.containerRef}
        data-test={testId}
        css={[
          {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid',
            borderRadius: 2,
            fontSize: '0.95em',
            cursor: 'pointer',
            height: style.constants.form.height,
            padding: `0 ${style.constants.page.textSpacing}`,
            width: '100%',
            color: '#172233',
            backgroundColor: '#fff',
            borderColor: '#e8e8e8',
          },
          variant === 'dark' && {
            color: '#fff',
            backgroundColor: '#6f7d90',
            borderColor: '#6f7d90',
          },
          variant === 'menu' && {
            background: 'transparent',
            border: 0,
            width: '14.28em',
            margin: 'auto',
            color: 'white',
            outline: 0,
            justifyContent: 'center',
          },
        ]}
        type="button"
        aria-haspopup="true"
        aria-expanded={controls.isOpen}
        onClick={controls.toggle}
        {...rest}>
        <span
          css={[
            {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
            variant === 'menu' && {
              fontSize: '0.85em',
            },
          ]}>
          {options.current}
        </span>
        <If condition={showArrow}>
          <Arrow
            color={
              variant === 'menu' || variant === 'dark' ? 'yellow' : 'black'
            }
            css={{
              marginLeft:
                variant === 'menu' ? '0.57em' : style.constants.form.spacing,
            }}
          />
        </If>
        <Popover
          target={this.containerRef.current}
          isOpen={controls.isOpen}
          close={() => {
            if (controls.isOpen) controls.toggle();
          }}
          showArrow={false}
          closeWhenClicked={closeWhenClicked}
          position="bottom-start"
          css={{
            minWidth: this.containerRef.current
              ? this.containerRef.current!.getBoundingClientRect().width
              : 0,
            marginTop: style.constants.page.textSpacing,
            li: { padding: style.constants.page.textSpacing },
          }}>
          <ul
            css={[
              optionsStyle,
              variant === 'noScroll' && {
                maxHeight: 'initial',
                overflow: 'visible',
              },
              variant === 'menu' && {
                padding: '0.71em 0.35em',
                maxHeight: 'none',
              },
            ]}
            role="menu"
            aria-labelledby={id}
            data-test={`${testId}-options`}>
            {options.all}
          </ul>
        </Popover>
      </button>
    );
  }

  /**
   * Interpret options and current selection depending on the type of `props.children`
   */
  @computed private get options() {
    const { children: options, currentSelection } = this.props;
    return options instanceof Map
      ? {
          current: this.mappedCurrentSelectionLabel,
          all: Array.from((options as DropdownOptionsMap).entries()).map(
            ([id, option]) => (
              <li
                key={id}
                data-selected={currentSelection === id}
                onClick={e => option.onClick(e)}>
                {option.label}
              </li>
            ),
          ),
        }
      : { current: currentSelection, all: options };
  }

  @computed private get mappedCurrentSelectionLabel() {
    const { children, currentSelection } = this.props;
    const option = (children as DropdownOptionsMap).get(
      currentSelection as string,
    );
    return option ? option.label : null;
  }

  //* observable state when uncontrolled
  @observable isOpen = false;
  @action toggle = () => (this.isOpen = !this.isOpen);

  @computed private get isControlled() {
    const { isOpen, toggle } = this.props;
    return !isNil(isOpen) && !isNil(toggle);
  }
  /**
   * Depending on props, either use our own local state or allow parent component to manage state.
   */
  @computed private get controls() {
    const source = (!this.isControlled ? this : this.props) as Controls;
    const { isOpen, toggle } = source;
    return { isOpen, toggle };
  }
}

const Arrow: React.FC<{ color: 'yellow' | 'black' }> = ({ color, ...rest }) => (
  <Icon
    src={color === 'yellow' ? YellowArrowImg : BlackArrowImg}
    css={
      color === 'yellow' && {
        backgroundSize: '0.64em',
        transform: 'rotate(90deg)',
        verticalAlign: 'middle',
      }
    }
    {...rest}
  />
);

const optionsStyle = css(({
  margin: 0,
  padding: 0,
  backgroundColor: '#fff',
  color: '#172233',
  fontSize: '0.95em',
  zIndex: 100,
  maxHeight: 'var(--dropdown-height)',
  overflow: 'auto',
  li: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: style.constants.page.textSpacing,

    '&:hover': {
      backgroundColor: '#d0d2d6',
    },

    "&[data-selected='true']": {
      fontWeight: style.constants.font.weight.bold,
    },
  },
} as unknown) as CSSObject);
