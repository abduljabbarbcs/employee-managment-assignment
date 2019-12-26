import {
  IPromiseBasedObservable,
  FULFILLED,
  fromPromise,
  lazyObservable,
  ILazyObservable,
  PENDING,
  REJECTED,
} from 'mobx-utils';
import { isNil } from 'ramda';

/*
 * Utilities for working with mobx-util IPromiseBasedObservables
 */

export const isFulfilled = (p?: IPromiseBasedObservable<any>) =>
  !isNil(p) && p.state === FULFILLED;
export const isPending = (p?: IPromiseBasedObservable<any>) =>
  !isNil(p) && p.state === PENDING;
export const isRejected = (p?: IPromiseBasedObservable<any>) =>
  !isNil(p) && p.state === REJECTED;

/**
 * Returns either a fulfilled value or the given default (or undefined)
 * Useful when you don't care about the pending/error state and just want
 * the value if it is available.
 */
export function fulfilledValue<T>(
  promise: Maybe<IPromiseBasedObservable<T>>,
  defaultValue?: undefined,
): Maybe<T>;
export function fulfilledValue<T>(
  promise: Maybe<IPromiseBasedObservable<T>>,
  defaultValue: T,
): T;
export function fulfilledValue<T>(
  promise: Maybe<IPromiseBasedObservable<T>>,
  defaultValue?: T,
) {
  return promise && promise.state === FULFILLED ? promise.value : defaultValue;
}

/*
 * Like IPromiseBasedObservable.case except it uses the pending handler if
 * the passed in promise is nil.
 */
export function caseFor<T>(
  promise: Maybe<IPromiseBasedObservable<T>>,
  handlers,
) {
  if (isNil(promise)) {
    return handlers.pending ? handlers.pending() : undefined;
  } else {
    return promise.case(handlers);
  }
}
export type LazyObservablePromise<T> = ILazyObservable<
  IPromiseBasedObservable<T>
>;
/**
 * Creates an observable that is is a lazy promise that can be refreshed in place.
 *
 * Compared to using `lazyObservable` on its own, this has the advantage of having observable promise semantics for the `current()` value, wrapping success/failure together and allowing  `await` or `then`.
 *
 * Compared to using `fromPromise` on its own, this has the advantage of being able to `refresh` while not replacing the `current()` results until the refreshed promise resolves or rejects.
 *
 * This combination provides two observable pending states. Together, they allow you to know when you're fetching data, and whether it's the first time you're fetching it or not.
 *
 * @example
 * const myPromise = lazyObservablePromise(fetchMyData)
 * // initally returns a PENDING promise, but fetchMyData is not called until `current()` is
 * myPromise.current().state // PENDING; fetchMyData is called and this is the state of its promise
 * myPromise.pending // true, this is the lazyObservable state
 *
 * // once fetchMyData resolves:
 * myPromise.current().state // FULFILLED
 * myPromise.current().value // myData
 * myPromise.pending // false
 *
 * // now, refresh
 * myPromise.refresh() // fetchMyData is called again
 * myPromise.current().state // FULFILLED, this is still the results from the first fetch
 * myPromise.current().value // myData, the same data we had before
 * myPromise.pending // true, the lazyObservable is fetching new data
 *
 * // and once the second fetch resolves:
 * myPromise.current().value // updated myData
 *
 * @param fetch a function that returns a promise
 * @returns a LazyObservablePromise that wraps the fetch
 *
 * See [mobx-utils](https://github.com/mobxjs/mobx-utils) for the details of ILazyObservable and IPromiseBasedObservable.
 */
export const lazyObservablePromise = <T>(
  fetch: () => Promise<T>,
): LazyObservablePromise<T> => {
  const observable = lazyObservable<IPromiseBasedObservable<T>>(sink => {
    const next = fromPromise<T>(fetch());
    const sinkPromise = () => sink(next);
    if (isNil(observable.current())) {
      sinkPromise();
    } else {
      next.then(sinkPromise, sinkPromise);
    }
  });
  return observable;
};
