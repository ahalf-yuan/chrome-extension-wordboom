class WordboomIframe {
  constructor(options) {
    this.node = null;
    this.style = {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '180px',
      height: '80px',
      background: '#f8f8f8',
      display: 'none',
    };

    this.create(options);
  }

  create(options) {
    const wordboomIframe = document.createElement('iframe');
    wordboomIframe.setAttribute('id', 'wordboom-iframe');

    const styleStr = this.transObjToStr(this.style);
    wordboomIframe.setAttribute('style', styleStr);
    wordboomIframe.setAttribute('src', options.src);
    // scrolling="no" frameborder="0"
    wordboomIframe.setAttribute('scrolling', 'no');
    wordboomIframe.setAttribute('frameborder', '0');
    document.body.appendChild(wordboomIframe);

    this.node = wordboomIframe;
  }

  setIframeStyle(obj) {
    this.style = {
      ...this.style,
      ...obj,
    };
    const styleStr = this.transObjToStr(this.style);
    this.node.setAttribute('style', styleStr);
  }

  show() {
    this.node.style.display = 'block';
  }

  hide() {
    this.node.style.display = 'none';
  }

  transObjToStr(obj) {
    return Object.entries(obj).reduce(
      (pre, [key, value]) => (pre += `${key}: ${value};`),
      ''
    );
  }
}

export default WordboomIframe;
