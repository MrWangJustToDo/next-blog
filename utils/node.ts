import { delay } from "./delay";

class NodeItem<T> {
  previous: NodeItem<T>;
  next: NodeItem<T>;
  constructor(readonly val: T) {}
}

class TreeNode<T> {
  private head: NodeItem<T>;
  private foot: NodeItem<T>;
  // 自动删除时间
  readonly time: number = 20000;
  // 最大查找深度
  readonly deepSearchLength: number = 10;

  constructor(val?: T) {
    if (val !== undefined) {
      const nodeItem = new NodeItem<T>(val);
      this.head = nodeItem;
      this.foot = nodeItem;
    }
  }

  delete(item: NodeItem<T>) {
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

  getPre(item: NodeItem<T>): NodeItem<T> | undefined {
    return item.previous;
  }

  getNext(item: NodeItem<T>): NodeItem<T> | undefined {
    return item.next;
  }

  add(val: T, deleteTime?: number): NodeItem<T> {
    // 添加一个链表元素  并在指定时间内删除
    deleteTime = deleteTime === undefined ? this.time : deleteTime;
    const item = new NodeItem<T>(val);
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

  get(val: T): NodeItem<T> | undefined {
    let targetItem;
    let tempItem = this.foot;
    while (tempItem && tempItem.val !== val) {
      tempItem = tempItem.previous;
    }
    if (tempItem && tempItem.val === val) {
      targetItem = tempItem;
    }
    return targetItem;
  }
}

export { TreeNode };
