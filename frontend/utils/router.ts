import { autorun } from 'mobx';
import { ViewStore } from '../store/by-data/view.store';
import * as queryString from 'query-string';
import { findMatchedRoutes } from 'lib/routing-utils';
import reject from 'ramda/es/reject';
import isNil from 'ramda/es/isNil';
import isEmpty from 'ramda/es/isEmpty';

export const startRouter = (view: ViewStore) => {
  window.onpopstate = () => {
    const path = getUrl();
    if (path !== view.currentPath) {
      view.showPath(path);
    }
  };

  autorun(() => {
    const currentPath = getUrl();
    const newPath = view.currentPath;
    if (newPath !== currentPath) {
      const { url: currentUrl } = queryString.parseUrl(currentPath);
      const { url: newUrl } = queryString.parseUrl(newPath);
      const replace = currentUrl === newUrl;
      navigate(newPath, replace);
    }
  });
};

export const getUrl = () => window.location.pathname + window.location.search;

const navigate = (path: string, replace?: boolean) =>
  replace
    ? window.history.replaceState(null, '', path)
    : window.history.pushState(null, '', path);

type OnMatchedPath = (
  params: Record<string, string>,
  query: Record<string, string>,
) => void;

export const matchPaths = (paths: [string, OnMatchedPath][]) => {
  const pathList = paths.map(([path, handler]) => ({
    route: path,
    handler,
  }));
  return (path: string) => {
    const matched = findMatchedRoutes(path, pathList)[0];
    if (!matched) return false;
    const { route, params, query } = matched;
    route.handler(params, query);
    return matched;
  };
};

export const fillPath = (
  path: string,
  params: Record<string, Maybe<string>>,
  query: Record<string, Maybe<string>> = {},
) => {
  const resultPath = Object.entries(reject(isNil, params)).reduce(
    (result, [key, value]) => (result = result.replace(':' + key, value!)),
    path,
  );
  const resultQuery = queryString.stringify(reject(isNil, query));
  return resultPath + (!isEmpty(resultQuery) ? '?' + resultQuery : '');
};
