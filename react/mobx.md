- inject 基于高阶组件

- get 和 set 方法，它们每当对象进行取值或者赋值操作时，都会自动出发，可以看到当发生 get 行为时就会调用 observerManagers 的 collect 来进行数据收集，当发生 set 行为时会调用 obserManagers.trigger 函数来执行其对应的所有监听函数。

```
let nowObserver = null;
let nowTarget = null;
let observerStack = [];
let targetStack = [];
let isCollecting = false;

class Observer {
    constructor() {
        this._observers = {};
    }

    _addNowObserver = (proxyID) => {
        this._observers[proxyID] = this._observers[proxyID] || {};
        this._observers[proxyID].target = nowTarget;
        this._observers[proxyID].watchers = this._observers[proxyID].watchers || [];
        this._observers[proxyID].watchers.push(nowObserver);
    };

    trigger = (id) => {
        let ds = this._observers[id];
        if (ds && ds.watchers) {
            ds.watchers.forEach(d => {
                d.call(ds.target || this);
            });
        }
    };

    beginCollect = (observer, target) => {
        isCollecting = true;
        observerStack.push(observer);
        targetStack.push(target);
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    };

    collect = (proxyID) => {
        if (nowObserver) {
            this._addNowObserver(proxyID);
        }
    };

    endCollect = () => {
        isCollecting = false;
        observerStack.pop();
        targetStack.pop();
        nowObserver = observerStack.length > 0 ? observerStack[observerStack.length - 1] : null;
        nowTarget = targetStack.length > 0 ? targetStack[targetStack.length - 1] : null;
    };
}

export default new Observer();

function observable(target, name, descriptor) {
    let v = descriptor.initializer.call(this);
    // 如果值是对象，为其值也创建observable
    if (typeof v === 'object') {
        createObservable(v);
    }
    let observable = new Observable(v);
    return {
        enumerable: true,
        configurable: true,
        get: function () {
            return observable.get();
        },
        set: function (v) {
            // 重新赋值对象的时候，为其值也创建observable
            if (typeof v === 'object') {
                createObservable(v);
            }
            return observable.set(v);
        }
    };
}

let ReactMixin = {
  componentWillMount: function () {
    autorun(() => {
        this.render();
        this.forceUpdate();
    });
  }
};

function observer(target) {
  const targetCWM = target.prototype.componentWillMount;
  target.prototype.componentWillMount = function () {
      targetCWM && targetCWM.call(this);
      ReactMixin.componentWillMount.call(this);
  }
}

export {
  observable,
  observer
}
```

- 这里要说的是 observer 函数，它重写了原组件的 componentWillMount 对象，其目的是为了给 render 函数加上 autorun 监听。

```
import observerManagers from './observer-manager';

const autorun = function (handler) {
  observerManagers.beginCollect(handler);
  handler();
  observerManagers.endCollect();
};
```

- autorun 只有三句话，开始收集、首次执行监听函数、结束收集。

```
import Observable from './observable';

let createObservableProperty = function (target, property) {
    let observable = new Observable(target[property]);
    Object.defineProperty(target, property, {
        get: function () {
            return observable.get();
        },
        set: function (value) {
            return observable.set(value);
        }
    });

    if (typeof (target[property]) === 'object') {
        for (let i in target[property]) {
            if (target[property].hasOwnProperty(i)) {
                createObservableProperty(target[property], i);
            }
        }
    }
};

let extendsObservable = function (target, obj) {
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            target[i] = obj[i];
            createObservableProperty(target, i);
        }
    }
};

let createObservable = function (target) {
    for (let i in target) {
        if (target.hasOwnProperty(i)) {
            createObservableProperty(target, i);
        }
    }
};

export {
    extendsObservable,
    createObservable
}
```
