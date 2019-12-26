declare module '*.css';
declare module '*.json';
declare module 'react-css-modules';
declare module 'react-timeago';
declare module 'react-highcharts';

declare module '*.svg' {
  const content: any;
  export default content;
}

/**
 * Overrides to allow pipe and filter to be used together
 * see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/25581
 * TODO: can possibly remove this
 */
declare module 'ramda-fix' {
  module 'ramda' {
    interface Filter {
      <T>(fn: (value: T) => boolean): (list: ReadonlyArray<T>) => T[];
      <T>(fn: (value: T) => boolean, list: ReadonlyArray<T>): T[];
    }
  }
}

/**
 * IPromiseBasedObservable is by default declared to be partially of type `PromiseLike` rather than `Promise`. This causes a variety of type grief, so redeclare it here.
 */
declare module 'mobx-utils-fix' {
  module 'mobx-utils' {
    export type IBasePromiseBasedObservable<T> = {
      isPromiseBasedObservable: true;
      case<U>(
        handlers: {
          pending?: () => U;
          fulfilled?: (t: T) => U;
          rejected?: (e: any) => U;
        },
        defaultFulfilled?: boolean,
      ): U;
    } & Promise<T>;

    export type IPendingPromise = {
      readonly state: 'pending';
      readonly value: any; // can be error, T or nothing at this point
    };

    export type IFulfilledPromise<T> = {
      readonly state: 'fulfilled';
      readonly value: T;
    };

    export type IRejectedPromise = {
      readonly state: 'rejected';
      readonly value: any;
    };

    type IPromiseBasedObservable<T> = IBasePromiseBasedObservable<T> &
      (IPendingPromise | IFulfilledPromise<T> | IRejectedPromise);

    export declare const fromPromise: {
      <T>(
        promise: PromiseLike<T>,
        oldPromise?: PromiseLike<T>,
      ): IPromiseBasedObservable<T>;
      reject<T>(reason: any): IRejectedPromise & IBasePromiseBasedObservable<T>;
      resolve<T>(
        value?: T,
      ): IFulfilledPromise<T> & IBasePromiseBasedObservable<T>;
    };
  }
}

type FormattedMessageId = string;
type MessageOrComponent = FormattedMessageId | React.ReactNode;
type ClickHandler = (e: React.SyntheticEvent) => void;
type CssSize = string | number; // e.g. 10px, 2em, 100%. Plain numbers are px
type Size = { width: CssSize; height: CssSize };

type MapEntry<T> = T extends Map<infer K, infer V>
  ? ReadonlyArray<K, V>
  : unknown;

// * Configurations

interface IRoutes {
  title?: FormattedMessageId;
  [key: string]: IRouteConfig;
}

interface IRouteConfig {
  path: string;
  title?: string;
  isPublic?: boolean;
  routes?: IRoutes;
}

// * Types

type HttpStatus =
  | null
  | 'pending'
  | 'ok'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'serverError'
  | 'badRequest';

type ModelDownloadType = 'onnx' | 'json';

type SortByType = 'loss-asc' | 'loss-desc' | 'last-created' | 'last-modified';

type PositionType =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

type PermissionType = 'private' | 'public';


