import * as actions from './constants';

const createMethods = dispatcher => ({
  leftDrawerPop: props => dispatcher({ type: actions.LEFT_DRAWER_POP, props }),
  leftDrawerPush: (key, props) => dispatcher({ type: actions.LEFT_DRAWER_PUSH, key, props }),
  modal: (key, props, navProps = {}) => dispatcher({ type: actions.MODAL, key, props, navProps }),
  modalPop: () => dispatcher({ type: actions.MODAL_POP }),
  pop: (props, navProps = {}) => dispatcher({ type: actions.POP, props, navProps }),
  push: (key, props, navProps = {}) => dispatcher({ type: actions.PUSH, key, props, navProps }),
  rightDrawerPop: props => dispatcher({ type: actions.RIGHT_DRAWER_POP, props }),
  rightDrawerPush: (key, props) => dispatcher({ type: actions.RIGHT_DRAWER_PUSH, key, props }),
  switch: (key, navProps = {}) => dispatcher({ type: actions.SWITCH, key, navProps }),
  toggleLeftDrawer: () => dispatcher({ type: actions.TOGGLE_LEFT_DRAWER }),
  toggleRightDrawer: () => dispatcher({ type: actions.TOGGLE_RIGHT_DRAWER }),
});

let navigator; // eslint-disable-line

export const initMethods = (dispatcher) => {
  const methods = createMethods(dispatcher);
  navigator = methods;
  Object.freeze(navigator);
  return methods;
};

export default navigator;
