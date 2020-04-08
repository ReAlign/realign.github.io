// import API from '@theme/utils/api'
import yd from '@theme/utils/yd-translate';
const PO = {};

PO.idPrefix = 'j-m-popover-';
PO.classPrefix = 'm-popover-';
PO.popoverId = `${PO.idPrefix}wrapper`;
PO.popoverClass = `${PO.classPrefix}wrapper`;
PO.pHeaderId = `${PO.idPrefix}header`;
PO.pHeaderClass = `${PO.classPrefix}header`;
PO.pBodyId = `${PO.idPrefix}body`;
PO.pBodyClass = `${PO.classPrefix}body`;
PO.pFooterId = `${PO.idPrefix}footer`;
PO.pFooterClass = `${PO.classPrefix}footer`;
PO.show = (domNode, result) => {
  const pNode = document.querySelector(`#${PO.popoverId}`);
  if (!pNode) {
    PO.insertPopover();
  }
  PO.showPopover(domNode, result);
};
PO.insertStyle = () => {
  const style = document.createElement('style');
  style.type = 'text/css';

  try {
    style.appendChild(document.createTextNode(`
      .${PO.popoverClass} {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        max-width: 300px;
        max-height: 160px;
        background: linear-gradient(to right, #ae4967, #35495e);
        box-shadow: 0 3px 6px #999;
        border-radius: 3px;
        color: #fff;
        padding: 6px 16px;
        overflow: auto;
        z-index: 1000;
      }
    `));
  } catch (ex) {
    // 针对 IE
    style.styleSheet.cssText = '';
  }

  document.head.appendChild(style);
};
PO.insertDom = () => {
  const _popover = document.createElement('div');
  _popover.id = PO.popoverId;
  _popover.className = PO.popoverClass;
  _popover.innerHTML = `
        <div id="${PO.pHeaderId}" class="${PO.pHeaderClass}"></div>
        <div id="${PO.pBodyId}" class="${PO.pBodyClass}"></div>
        <div id="${PO.pFooterId}" class="${PO.pFooterClass}"></div>
      `;
  document.body.appendChild(_popover);
};
PO.insertPopover = () => {
  PO.insertStyle();
  PO.insertDom();
};
PO.showPopover = (domNode, result) => {
  const pNode = document.querySelector(`#${PO.popoverId}`);

  const pBody = document.querySelector(`#${PO.pBodyId}`);
  pBody.innerHTML = result.translation;

  const d = domNode ? domNode.focusNode.parentElement.getBoundingClientRect() : {
    bottom: 0,
    left: 0,
  };
  pNode.style.top = `${d.bottom}px`;
  pNode.style.left = `${d.left}px`;
  pNode.style.display = 'inline-block';
};

const u = {
  click() {
    const pNode = document.querySelector(`#${PO.popoverId}`);
    if(pNode) {
      pNode.style.display = 'none';
    }
  },
  // 双击处理函数
  // doubleClick() {
  //   // var text = '';
  //   // if (window.getSelection) {
  //   //   text = window.getSelection().toString();
  //   // } else if (document.selection && document.selection.type != 'Control') {
  //   //   text = document.selection.createRange().text;
  //   // }
  //   // if ('' != text) {
  //   //   console.log(text);
  //   // }
  //   console.log('暂时不会处理双击，请使用选中操作~');
  // },
  // 释放鼠标处理函数
  mouseUp(evt) {
    setTimeout(u.getSelectionAndTransIt.bind(null, evt), 0);
  },
  async getSelectionAndTransIt(evt) {
    let text = '';
    let sObj;
    let dsObj;

    if (window.getSelection) {
      sObj = window.getSelection();
      text = sObj.toString();
    } else if (document.selection && document.selection.type !== 'Control') {
      dsObj = document.selection.createRange();
      text = dsObj.text;
    }
    if ('' !== text) {
      const result = (await yd.ajax(text) || {});
      // console.log(evt, sObj);
      PO.show(sObj || dsObj, result);
    }
  },
};

export default {
  methods: {
    initTransCont() {
      document.addEventListener('click', u.click, false);
      // document.addEventListener('dblclick', u.doubleClick, true);
      document.addEventListener('mouseup', u.mouseUp, true);
    },
  }
}