type Resolve = (value?: unknown) => void
type Reject = (reason?: Error) => void

interface DeferredPromise<T> extends Promise<T> {
  resolve: Resolve
  reject: Reject
}

export function deferredPromise<T = unknown>() {
  let resolve: Resolve
  let reject: Reject

  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  }) as DeferredPromise<T>

  promise.resolve = resolve
  promise.reject = reject

  return promise
}
