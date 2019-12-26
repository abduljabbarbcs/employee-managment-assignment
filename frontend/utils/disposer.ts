/**
 * Keeps a collection of functions around that will "dispose" of some resource or process.
 */
export class Disposer {
  private onDispose: Function[] = [];

  add = (disposer: Function) => {
    this.onDispose.push(disposer);
  };

  dispose = () => {
    this.onDispose.forEach(dispose => dispose());
    this.onDispose = [];
  };
}
