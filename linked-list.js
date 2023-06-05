/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }


  /** getNodeAtIdx(idx): retrieve node at idx */

  getNodeAtIdx(idx) {
    let cur = this.head;

    let count = 0;

    while (cur !== null && count !== idx) {
      count += 1;
      cur = cur.next;
    }

    return cur;
  }


  /** removeNodeAtIdx(idx): remove node at idx */

  removeNodeAtIdx(idx) {

    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index')
    }

    let prevNode = this.getNodeAtIdx(idx - 1);

    // remove head:

    if (idx === 0) {
      let headToRemove = this.getNodeAtIdx(0);
      this.head = headToRemove.next
      this.length --;

      if (this.length < 2) {
        this.tail = this.head
      }

      return headToRemove.val;
    }

    // remove tail:

    if (idx === this.length - 1) {
      let tailToRemove = this.getNodeAtIdx(this.length - 1)
      this.tail = prevNode;
      prevNode.next = null;
      this.length --;
      
      return tailToRemove.val;
    }

    // remove from middle:

    else {
      let nodeToRemove = prevNode.next;
      prevNode.next = this.getNodeAtIdx(idx + 1)

      this.length --;
      return nodeToRemove.val;
    }
      

  }


  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length ++;
  }


  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    } 

    this.length ++;
  }


  /** pop(): return & remove last item. */

  pop() {
    if (this.length < 1) {throw new Error('Blank list')};

    return this.removeNodeAtIdx(this.length - 1);
  }


  /** shift(): return & remove first item. */

  shift() {
    if (this.length < 1) {throw new Error('Blank list')};

    return this.removeNodeAtIdx(0);
  }


  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx > this.length - 1 || idx < 0) { throw new Error('Invalid index')};

    let node = this.getNodeAtIdx(idx);

    return node.val;
  }


  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let nodeToSwitch = this.getNodeAtIdx(idx);
    nodeToSwitch.val = val;
  }


  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index');
    }
  
    // Inserting at the beginning of the list
    if (idx === 0) {
      this.unshift(val);

    // Inserting at the end of the list
    } else if (idx === this.length) {
      this.push(val);

    // Inserting in middle
    } else {
      let prevNode = this.getNodeAtIdx(idx - 1);
      let followingNode = prevNode.next;
      let newNode = new Node(val);
      newNode.next = followingNode;
      prevNode.next = newNode;
      this.length++;
    }

  }


  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    if (idx > this.length || idx < 0) {
      throw new Error('Invalid index');
    }

    // if removing head
    if (idx === 0) {
      return this.shift();
    }
    // if removing tail
    if (idx === this.length - 1) {
      return this.pop()
    }
    // if removing from middle
    else {
    let prevNode = this.getNodeAtIdx(idx);
    let followingNode = this.getNodeAtIdx(idx);
    let valToReturn = this.getNodeAtIdx(idx).val;
    prevNode.next = followingNode;
    return valToReturn;
    }
  }


  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    }

    let count = 0;
    let total = 0;

    while (count <= this.length - 1) {
      total += this.getAt(count);
      count ++;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
