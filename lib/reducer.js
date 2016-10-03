import * as actions from './constants';

function getCurrentRootKey(roots) {
  const currentRootIndex = roots.get('index');
  return roots.get('routes').get(currentRootIndex).get('key');
}

function getNextScene(scenes, key) {
  let scene = scenes.get(key);
  if (!scene) {
    throw new Error(`ReactNavigationHelm: Could not find scene ${key}`);
  }

  scene = scene.set('key', `${key}-${Date.now()}`);

  return scene;
}

// state is an immutable map
const reducer = (state, action) => {
  switch (action.type) {
    case actions.LEFT_DRAWER_POP: {
      const currentRootKey = 'leftDrawer';

      // Make sure we don't pop past 0
      if (state.get(currentRootKey).get('index') === 0) {
        return state;
      }

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') - 1);
      navRoot = navRoot.update('routes', (routes) => {
        let updatedRoutes = routes.pop();
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set(currentRootKey, navRoot);
    }
    case actions.LEFT_DRAWER_PUSH: {
      const nextScene = getNextScene(state.get('scenes'), action.key);

      let navRoot = state.get('leftDrawer');
      navRoot = navRoot.set('index', navRoot.get('index') + 1)
      .update('routes', (routes) => {
        let updatedRoutes = routes.push(nextScene);
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set('leftDrawer', navRoot);
    }
    case actions.MODAL: {
      if (state.get('isModal')) {
        console.warn('ReactNavigationHelm: Cannot call modal when modal is active'); // eslint-disable-line
        return state;
      }

      let modalRoot = state.get('modal');
      const nextScene = getNextScene(state.get('scenes'), action.key);

      modalRoot = modalRoot.update('routes', (routes) => {
        let updatedRoutes = routes.clear().push(nextScene);
        return updatedRoutes.update(0, route => route.merge(action.props));
      }).set('index', 0);

      return state.set('modal', modalRoot).set('isModal', true).merge(action.navProps);
    }
    case actions.MODAL_POP: {
      return state.set('isModal', false);
    }
    case actions.POP: {
      const currentRootKey = state.get('isModal') ? 'modal' : getCurrentRootKey(state.get('roots'));

      // Make sure we don't pop past 0
      if (state.get(currentRootKey).get('index') === 0) {
        if (currentRootKey === 'modal') {
          return state.set('isModal', false);
        }

        return state.merge(action.navProps);
      }

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') - 1);
      navRoot = navRoot.update('routes', (routes) => {
        let updatedRoutes = routes.pop();
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set(currentRootKey, navRoot);
    }
    case actions.PUSH: {
      const currentRootKey = state.get('isModal') ? 'modal' : getCurrentRootKey(state.get('roots'));
      const nextScene = getNextScene(state.get('scenes'), action.key);

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') + 1);

      navRoot = navRoot.update('routes', (routes) => {
        let updatedRoutes = routes.push(nextScene);
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set(currentRootKey, navRoot).merge(action.navProps);
    }
    case actions.RIGHT_DRAWER_POP: {
      const currentRootKey = 'rightDrawer';

      // Make sure we don't pop past 0
      if (state.get(currentRootKey).get('index') === 0) {
        return state;
      }

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') - 1);
      navRoot = navRoot.update('routes', (routes) => {
        let updatedRoutes = routes.pop();
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set(currentRootKey, navRoot);
    }
    case actions.RIGHT_DRAWER_PUSH: {
      const nextScene = getNextScene(state.get('scenes'), action.key);

      let navRoot = state.get('rightDrawer');
      navRoot = navRoot.set('index', navRoot.get('index') + 1);

      navRoot = navRoot.update('routes', (routes) => {
        let updatedRoutes = routes.push(nextScene);
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set('rightDrawer', navRoot);
    }
    case actions.SWITCH: {
      const nextRootIndex = state.get('roots').get('routes').findIndex(route => route.get('key') === action.key);

      return state.update('roots', roots => roots.set('index', nextRootIndex)).merge(action.navProps);
    }
    case actions.TOGGLE_LEFT_DRAWER: {
      return state.set('leftDrawerVisible', !state.get('leftDrawerVisible'));
    }
    case actions.TOGGLE_RIGHT_DRAWER: {
      return state.set('rightDrawerVisible', !state.get('rightDrawerVisible'));
    }
    default: {
      return state;
    }
  }
};

function setActiveKey(state) {
  const currentRoot = state.get('roots').get('routes').get(state.get('roots').get('index')).get('key');
  const currentSceneIndex = state.get(currentRoot).get('routes').get(state.get(currentRoot).get('index')).get('key');

  return state.set('activeScene', currentSceneIndex.split('-')[0]).set('activeRoot', currentRoot);
}

export default onNavigate => (state, action) => {
  let newState = reducer(state, action);

  const navEvent = {
    activeRoot: newState.get('isModal') ? 'modal' : newState.get('activeRoot'),
    activeScene: newState.get('activeScene'),
    action: action.type,
    actionProps: action.props,
    leftDrawerVisible: newState.get('leftDrawerVisible'),
    rightDrawerVisible: newState.get('rightDrawerVisible'),
  };

  onNavigate(navEvent);

  return setActiveKey(newState);
};
