import React from 'react';
import {
  IPromiseBasedObservable,
  isPromiseBasedObservable,
  fromPromise,
} from 'mobx-utils';
import { caseFor } from 'utils/observablePromise';
import { Spinner } from '../Spinner';
import { Flex } from '../Flex';
import { observer } from 'mobx-react';
import isNil from 'ramda/es/isNil';

interface IPromisedProps<T> {
  by: Maybe<IPromiseBasedObservable<T> | Promise<T>>;
  noStatus?: boolean;
  centerStatus?: boolean;
  spinnerSize?: number;
  pendingMessage?: FormattedMessageId;
  rejectedMessage?: FormattedMessageId;
  pending?: () => React.ReactNode;
  rejected?: (reason: any) => React.ReactNode;
  children?: (result: T) => React.ReactNode;
}

const Center = props => (
  <Flex grow align="center" justify="center" {...props} />
);

/**
 * A component for rendering the state of Promises. Has default implementations for the pending and errors states, but is customizable. The fulfilled state is rendered by a child function.
 *
 * Implemented as a class component because of difficulty getting generic TypeScript props types working for function components.
 */
@observer
export class Promised<T> extends React.Component<IPromisedProps<T>> {
  render() {
    const {
      by,
      noStatus = false,
      centerStatus = true,
      spinnerSize,
      pendingMessage,
      rejectedMessage = 'Error',
      pending,
      rejected,
      children: fulfilled,
    } = this.props;

    const promise =
      !isNil(by) && !isPromiseBasedObservable(by) ? fromPromise(by) : by;

    const status = noStatus
      ? {}
      : {
          pending:
            pending ||
            (() => <Spinner size={spinnerSize} label={pendingMessage} />),
          rejected:
            rejected ||
            (error =>
              rejectedMessage ? (
                  `${rejectedMessage} ${error}`
              ) : null),
        };

    const result: React.ReactNode = caseFor<T>(promise, {
      ...status,
      fulfilled,
    });

    const center =
      centerStatus &&
      promise &&
      (promise.state === 'pending' || promise.state === 'rejected');

    //* Avoid returning undefined in the case that this component is returned directly from another
    return isNil(result) ? null : center ? <Center>{result}</Center> : result;
  }
}
