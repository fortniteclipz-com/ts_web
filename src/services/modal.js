const modal = {};
let instance = null;

modal.init = function (_instance) {
  instance = _instance
};

modal.show = function () {
  instance.show();
};

export default modal;
