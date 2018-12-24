import helper from './helper';

import WalkThruModal from '../components/modal/walkThru'

const modal = {};
let instance = null;

modal.init = function (_instance) {
  instance = _instance;
  const walkThru = helper.getCookie("walkThru");
  if (walkThru !== "71wsiENt3Iyd") {
    instance.show(WalkThruModal)
    helper.setCookie("walkThru", "71wsiENt3Iyd");
  }
};

modal.show = function (component) {
  instance.show(component);
};

modal.close = function () {
  instance.close();
};

export default modal;
