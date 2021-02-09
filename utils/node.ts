import { delay } from "./delay";

class NodeItem<T, F> {
  previous: NodeItem<T, F>;
  next: NodeItem<T, F>;
  constructor(readonly key: T, readonly value: F) {}
}

class TreeNode<T, F> {
  private head: NodeItem<T, F>;
  private foot: NodeItem<T, F>;
  // 自动删除时间
  readonly time: number = 20000;
  // 最大查找深度
  readonly deepSearchLength: number = 10;

  constructor(key?: T, value?:F) {
    if (key !== undefined) {
      const nodeItem = new NodeItem<T, F>(key, value);
      this.head = nodeItem;
      this.foot = nodeItem;
    }
  }

  delete(item: NodeItem<T, F>) {
    const pre = this.getPre(item);
    const next = this.getNext(item);
    item!.next = null;
    item!.previous = null;
    if (!pre && !next) {
      // 前一个后一个都不存在，当前就只有一个链表项
      this.head = null;
      this.foot = null;
    } else if (!pre) {
      // 如果前一个不存在，表示当前就是第一个
      this.head = next;
      next!.previous = null;
    } else if (!next) {
      // 如果后一个不存在，表示当前就是最后一个
      this.foot = pre;
      pre!.next = null;
    } else {
      // 两边都有
      pre.next = next;
      next.previous = pre;
    }
  }

  getPre(item: NodeItem<T, F>): NodeItem<T, F> | undefined {
    return item.previous;
  }

  getNext(item: NodeItem<T, F>): NodeItem<T, F> | undefined {
    return item.next;
  }

  add(key: T, value: F,deleteTime?: number): NodeItem<T, F> {
    // 添加一个链表元素  并在指定时间内删除
    deleteTime = deleteTime === undefined ? this.time : deleteTime;
    const item = new NodeItem<T, F>(key, value);
    if (this.head === null || this.head === undefined) {
      // 第一次添加或者前面的删除空了
      this.head = item;
      this.foot = item;
    } else {
      const lastFoot = this.foot;
      lastFoot.next = item;
      item.previous = lastFoot;
      this.foot = item;
    }
    delay(deleteTime, () => this.delete(item));
    return item;
  }

  get(key: T): NodeItem<T, F> | undefined {
    let targetItem;
    let tempItem = this.foot;
    while (tempItem && tempItem.key !== key) {
      tempItem = tempItem.previous;
    }
    if (tempItem && tempItem.key === key) {
      targetItem = tempItem;
    }
    return targetItem;
  }
}

export { TreeNode };
