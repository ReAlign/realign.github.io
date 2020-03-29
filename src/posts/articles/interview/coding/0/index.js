// /**
//  *  组件间通信
//  *    Vue
//  *      父子    Props&Refs / emit
//  *      非父子  EventBus
//  *      全局    Vuex
//  *    React
//  *      父子    Props / callback
//  *      非父子  Event
//  *      全局    Redux/Mobx
//  *      new     Content Api
//  */
// const _ = {
//     typeOf(o) {
//         return o === null ? String(o) : {}.toString.call(o).slice(8, -1).toLowerCase();
//     }
// };
// /**
//  * @name    EventBus    事件总线
//  * @description
//  * 1. 构造函数
//  *      事件 Map
//  * 2. emit
//  */
// class EventBus {
//     constructor() {
//         // 绑定的事件集合
//         this._evts = new Map();
//         // 绑定事件的最大数
//         this._max = 1;
//     }
// }

// EventBus.prototype.emit = function (type, ...args) {
//     const evt = this._evts.get(type);
//     const _emit_ = (_evt, _args) => {
//         if (_args.length) {
//             _evt.apply(this, _args);
//         } else {
//             _evt.call(this);
//         }
//     };

//     if (!evt) {
//         console.error(`Event ${type} is not register.`);
//         return false;
//     }
//     if (_.typeOf(evt) === 'array') {
//         evt.forEach(item => {
//             _emit_(item, args);
//         });
//     } else {
//         _emit_(evt, args);
//     }
//     return true;
// };

// EventBus.prototype.on = function (type, fn) {
//     const evt = this._evts.get(type);
//     if (!evt) {
//         this._evts.set(type, fn);
//     } else {
//         console.log('size: ', this._evts.size);
//         // if(this._evts.size >= this._max) {
//         //     console.error('events has to max.');
//         //     return false;
//         // } else {
//         if (evt && _.typeOf(evt) === 'function') {
//             this._evts.set(type, [evt, fn]);
//         } else {
//             evt.push(fn);
//         }
//         // }
//     }
// };

// module.exports = new EventBus();

class EventBus {
  constructor() {
    // 绑定的事件集合
    this._evts = {};
  }
  emit(type, ...args) {
    // 获取
    const evt = this._evts[type];
    const _emit_ = (_evt, _args) => {
      // 执行事件，有参数 / 无参数 区分处理
      _args.length ? _evt.apply(this, _args) : _evt.call(this);
    };

    // 不存在触发事件
    if (!evt) {
      console.error(`Event ${type} is not register.`);
      return false;
    }
    evt.forEach(item => {
      _emit_(item, args);
    });
    return true;
  }
  on(type, fn) {
    const evt = this._evts[type];
    if (!evt) {
      this._evts[type] = [fn];
    } else {
      evt.push(fn);
    }
  }
}

module.exports = new EventBus();