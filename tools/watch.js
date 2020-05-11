class Watch {
    constructor(obj = {}, fn = () => {}) {
      this.obj = obj;
      this.fn = fn;

      return this.init();
    }
    _handler(fn = null) {
      return {
        // 如果 target[property] 为对象时递归代理，否则返回属性值
        get(target, property, receiver) {
          try {
            return new Proxy(target[property], handler);
          } catch (err) {
            return Reflect.get(target, property, receiver);
          }
        },
        // 当对象赋值的时候，触发的代理方法（如果有 set 代理， 则触发 set 代理，否则触发该方法）
        defineProperty(target, property, descriptor) {
          fn();
          return Reflect.defineProperty(target, property, descriptor);
        },
        // 当删除对象属性时触发的代理方法
        deleteProperty(target, property) {
          fn();
          return Reflect.deleteProperty(target, property);
        },
      };
    }
    init() {
      return new Proxy(this.obj, this._handler(this.fn));
    }
  }

  let i = 0;
  const obj = [];
  let watchObj = new Watch(obj, () => {
    console.log('Object changed:', ++i)
  })
  watchObj[0] = 'a';
  watchObj.length = 3;