import analytics from './analytics'
import helper from './helper';

import TutorialModal from '../components/modal/tutorial'

const modal = {};
let instance = null;

modal.init = function(_instance) {
    instance = _instance;

    setTimeout(() => {
        const tutorial = helper.getCookie("tutorial");
        const tutorialValue = "0s68r4qHgAc2";
        if (tutorial !== tutorialValue) {
            instance.show(TutorialModal)
            helper.setCookie("tutorial", tutorialValue, 20 * 365);
        }
    }, 500);
};

modal.show = function(component) {
    analytics.sendModalview(component.prototype.constructor.name);
    instance.show(component);
};

modal.close = function() {
    instance.close();
};

export default modal;
