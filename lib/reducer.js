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
    case actions.POP: {
      const currentRootKey = getCurrentRootKey(state.get('roots'));

      // Make sure we don't pop past 0
      if (state.get(currentRootKey).get('index') === 0) {
        return state;
      }

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') - 1);
      navRoot = navRoot.update('routes', routes => {
        let updatedRoutes = routes.pop();
        updatedRoutes = updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));

        return updatedRoutes;
      });

      return state.set(currentRootKey, navRoot);
    }
    case actions.PUSH: {
      const currentRootKey = getCurrentRootKey(state.get('roots'));
      const nextScene = getNextScene(state.get('scenes'), action.key);

      let navRoot = state.get(currentRootKey);
      navRoot = navRoot.set('index', navRoot.get('index') + 1);

      navRoot = navRoot.update('routes', routes => {
        let updatedRoutes = routes.push(nextScene);
        updatedRoutes = updatedRoutes.update(navRoot.get('index'), route => route.merge(action.props));

        return updatedRoutes;
      });

      return state.set(currentRootKey, navRoot);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
