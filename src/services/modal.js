import helper from './helper';

import WalkThruModal from '../components/modal/walkThru'

const modal = {};
let instance = null;

modal.init = function (_instance) {
  instance = _instance;

  const walkThru = helper.getCookie("walkThru");
  if (walkThru !== "47H0FgUK6xdX") {
    instance.show(WalkThruModal)
    helper.setCookie("walkThru", "47H0FgUK6xdX", 20 * 365);
  }
};

modal.show = function (component) {
  instance.show(component);
};

modal.close = function () {
  instance.close();
};

export default modal;
