import helper from './helper';

import TutorialModal from '../components/modal/tutorial'

const modal = {};
let instance = null;

modal.init = function(_instance) {
  instance = _instance;

  const tutorial = helper.getCookie("tutorial");
  const tutorialValue = "0s68r4qHgAc1";
  if (tutorial !== tutorialValue) {
    instance.show(TutorialModal)
    helper.setCookie("tutorial", tutorialValue, 20 * 365);
  }
};

modal.show = function(component) {
  instance.show(component);
};

modal.close = function() {
  instance.close();
};

export default modal;
