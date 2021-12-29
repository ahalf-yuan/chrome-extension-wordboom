/**
 * 用户文字选区，内容及位置等信息
 * https://www.zhangxinxu.com/wordpress/2011/04/js-range-html%E6%96%87%E6%A1%A3%E6%96%87%E5%AD%97%E5%86%85%E5%AE%B9%E9%80%89%E4%B8%AD%E3%80%81%E5%BA%93%E5%8F%8A%E5%BA%94%E7%94%A8%E4%BB%8B%E7%BB%8D/
 */
class UserSelection {
  constructor() {
    this.selectedText = '';
    this.selection = null;
    this.endPos = {
      x: 0,
      y: 0,
    };

    this.create();
  }

  create() {
    this.getSelection();
  }

  /**
   * Here maybe unnecessary
   * just for Chrome, but as a util method or lib, it's necessary.
   *
   * @returns Selection or Text Range
   */
  getSelection() {
    let selection;
    if (window.getSelection) {
      selection = window.getSelection(); // Selection Object
      this.selectedText = selection.toString();
    } else if (document.selection) {
      //IE浏览器 考虑到Opera，应该放在后面
      selection = document.selection.createRange(); // Text Range Object
      this.selectedText = selection.text;
    }
    this.selection = selection;
    return selection;
  }

  getRangeObject(selectionObject) {
    if (selectionObject.getRangeAt) {
      return selectionObject.getRangeAt(0);
    } else {
      // 较老版本Safari!
      var range = document.createRange();
      range.setStart(selectionObject.anchorNode, selectionObject.anchorOffset);
      range.setEnd(selectionObject.focusNode, selectionObject.focusOffset);
      return range;
    }
  }

  getRangeEndPos() {
    const currRange = this.getRangeObject(this.selection);
    const rangeRect = currRange.getBoundingClientRect();
    return rangeRect;
  }

  /**
   * bottom middle
   * bottom start
   * bottom end
   * @param {*} type
   */
  getPos(type) {
    // rect: {left, right, top, bottom, width, height, x, y}
    const rect = this.getRangeEndPos();
    const { right, bottom } = rect;

    // right bottom
    if (type === 'end') {
      return {
        x: right,
        y: bottom,
      };
    }

    // handle other
  }

  /**
   * 在range末尾insert虚拟元素，
   * 获取虚拟元素的html坐标，
   * 然后将其删除。
   */
  _getEndPos() {
    const currRange = this.getRangeObject(this.selection);

    const dummyNode = document.createElement('span');

    currRange.collapse(false);
    currRange.insertNode(dummyNode);

    const clientRect = dummyNode.getBoundingClientRect();

    dummyNode.parentNode.removeChild(dummyNode);
    return clientRect;
  }
}

export default UserSelection;
