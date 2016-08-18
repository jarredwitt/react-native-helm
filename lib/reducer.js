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
    case actions.MODAL: {
      if (state.get('isModal')) {
        console.warn('ReactNavigationHelm: Cannot call modal when modal is active'); // eslint-disable-line
        return state;
      }

      let modalRoot = state.get('modal');
      const nextScene = getNextScene(state.get('scenes'), action.key);

      modalRoot = modalRoot.update('routes', routes => {
        let updatedRoutes = routes.clear().push(nextScene);
        return updatedRoutes.update(0, route => route.merge(action.props));
      });

      return state.set('modal', modalRoot).set('isModal', true);
    }
    case actions.POP: {
      const currentRootKey = state.get('isModal') ? 'modal' : getCurrentRootKey(state.get('roots'));

      // Make sure we don't pop past 0
      if (state.get(currentRootKey).get('index') === 0) {
        if (currentRootKey === 'modal') {
          return state.set('isModal', false);
        }

        return state;
      }

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') - 1);
      navRoot = navRoot.update('routes', routes => {
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

      navRoot = navRoot.update('routes', routes => {
        let updatedRoutes = routes.push(nextScene);
        return updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));
      });

      return state.set(currentRootKey, navRoot);
    }
    default: {
      return state;
    }
  }
};

function setActiveKey(state) {
  const currentRoot = state.get('isModal') ? 'modal' : state.get('roots').get('routes').get(state.get('roots').get('index')).get('key');
  const currentSceneIndex = state.get(currentRoot).get('routes').get(state.get(currentRoot).get('index')).get('key');

  return state.set('activeScene', currentSceneIndex.split('-')[0]);
}

export default (state, action) => {
  let newState = reducer(state, action);
  return setActiveKey(newState);
};
