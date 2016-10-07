import * as actions from './constants';

let _dispatcher;
const runDispatcher = (args) => {
  if (!_dispatcher) {
    console.error('ReactNativeHelm: Dispatcher has not been initialized. You must wait for the router to be initialized.');
    return () => false;
  }

  return _dispatcher(args);
};

export const methods = {
  leftDrawerPop: props => runDispatcher({ type: actions.LEFT_DRAWER_POP, props }),
  leftDrawerPush: (key, props) => runDispatcher({ type: actions.LEFT_DRAWER_PUSH, key, props }),
  modal: (key, props, navProps = {}) => runDispatcher({ type: actions.MODAL, key, props, navProps }),
  modalPop: () => runDispatcher({ type: actions.MODAL_POP }),
  pop: (props, navProps = {}) => runDispatcher({ type: actions.POP, props, navProps }),
  popTo: (key, props, navProps = {}) => runDispatcher({ type: actions.POP_TO, key, props, navProps }),
  push: (key, props, navProps = {}) => runDispatcher({ type: actions.PUSH, key, props, navProps }),
  rightDrawerPop: props => runDispatcher({ type: actions.RIGHT_DRAWER_POP, props }),
  rightDrawerPush: (key, props) => runDispatcher({ type: actions.RIGHT_DRAWER_PUSH, key, props }),
  switch: (key, navProps = {}) => runDispatcher({ type: actions.SWITCH, key, navProps }),
  toggleLeftDrawer: () => runDispatcher({ type: actions.TOGGLE_LEFT_DRAWER }),
  toggleRightDrawer: () => runDispatcher({ type: actions.TOGGLE_RIGHT_DRAWER }),
};

export const initNavigator = (dispatcher) => {
  _dispatcher = dispatcher;
  return methods;
};
