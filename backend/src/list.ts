import { v4 as uuidv4 } from "uuid";

export class Node<T> {
  prev?: Node<T>;
  next?: Node<T>;
  data: T & { key: string };

  constructor(data: T & { key: string }) {
    this.data = data;
  }
}

export class List<T> {
  private itemsCount = 0;
  private root?: Node<T>;

  pushAfterParent(data: T, key: string, parentKey: string): T | null {
    if (!this.root) {
      return null;
    }

    let currentNode: Node<T> | undefined = this.root;

    while (currentNode) {
      if (currentNode.data.key === parentKey) {
        const newNode = new Node<T>({ ...data, key });

        if (currentNode.next) {
          newNode.next = currentNode.next;
          currentNode.next.prev = newNode;
        }

        currentNode.next = newNode;
        newNode.prev = currentNode;

        this.itemsCount++;
        return data;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  push(data: T, key: string) {
    if (!this.root) {
      this.root = new Node({ ...data, key });
    } else {
      let temp = this.root;

      while (temp.next !== undefined) {
        temp = temp.next;
      }

      temp.next = new Node({ ...data, key });
      temp.next.prev = temp;
    }

    this.itemsCount++;

    return data;
  }

  get(key: string): T | null {
    if (!this.root) return null;

    let target: T | null = null;

    let node: Node<T> | undefined = this.root;

    while (node !== undefined) {
      if (node.data.key === key) {
        target = node.data;
        break;
      }

      node = node.next;
    }

    return target;
  }

  delete(key: string) {
    if (!this.root) return null;

    let target: T | null = null;
    let currentNode: Node<T> = this.root;

    while (currentNode.next !== undefined) {
      if (currentNode.data.key !== key) {
        currentNode = currentNode.next;
        continue;
      }

      if (currentNode.prev) {
        currentNode.prev.next = currentNode.next;
      }

      if (currentNode.next) {
        currentNode.next.prev = currentNode.prev;
      }

      target = currentNode.data;
      break;
    }

    if (!target) {
      return null;
    }

    this.itemsCount--;
    return target;
  }

  toArray(): T[] {
    const list: T[] = [];

    for (let node = this.root?.next; node !== undefined; node = node.next) {
      list.push(node.data);
    }

    return list;
  }

  print() {
    if (!this.root) {
      return console.log("List is empty");
    }

    for (
      let node: Node<T> | undefined = this.root;
      node !== undefined;
      node = node.next
    ) {
      console.log(node.data);
    }
  }

  get size() {
    return this.itemsCount;
  }
}

class Cell {
  id: string;
  title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.title = title;
  }
}

const list = new List<Cell>();

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();

console.log(id1);
console.log(id2);
console.log(id3);

console.log("\n\n");

list.push({ id: id1, title: "Primeiro item da lista" }, id1);
list.push({ id: id2, title: "Segundo item da lista" }, id2);
list.push({ id: id3, title: "Terceiro item da lista" }, id3);
list.pushAfterParent({ id: id4, title: "After first node" }, id4, id1);

const deleted = list.delete(id2);

console.log("Deleted item: ", deleted);
console.log("\n\n");

const node = list.get(id3);

console.log("Retrieved item", node);

console.log("\n\n");

list.print();

console.log(list.size);
