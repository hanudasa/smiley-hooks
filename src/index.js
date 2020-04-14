import { useState, useEffect } from 'react';
import _ from 'lodash';

export const useMergeableState = (initial, options = {}) => {
  const [payload, setPayload] = useState(initial || {});

  function mergePayload(newPayload) {
    setPayload({
      ...payload,
      ...newPayload,
    });
  }
  return [
    payload,
    mergePayload,
  ];
}

export const useUnequalHook = (handler, [params], options = {}) => {
  const [currentParams, setCurrentParams] = useState([]);

  useEffect(() => {
    (async() => {
      if ((!params || _.isEqual(params, currentParams)) && options.preventUpdate) return;
      await handler();
      setCurrentParams(params);
    })();
  }, [params]);
}