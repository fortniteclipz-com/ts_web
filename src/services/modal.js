import helper from './helper';

import WalkThruModal from '../components/modal/walkThru'

const modal = {};
let instance = null;

modal.init = function(_instance) {
  instance = _instance;

  const walkThru = helper.getCookie("walkThru");
  const walkThruValue = "V7e8V48HTQWj";
  if (walkThru !== walkThruValue) {
    instance.show(WalkThruModal)
    helper.setCookie("walkThru", walkThruValue, 20 * 365);
  }
};

modal.show = function(component) {
  instance.show(component);
};

modal.close = function() {
  instance.close();
};

export default modal;
