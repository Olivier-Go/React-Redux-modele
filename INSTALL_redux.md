# Installation

`yarn add redux react-redux redux-devtools-extension`

## Mise en place du store

- créer un _reducer_ `src/reducers/nameForTheReducer.js`
``` javascript
const initialState = {
  // ici l'état initial
};

const nameForTheReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: return state;
  }
};

export default nameForTheReducer;

```


- créer un _store_ `src/store/index.js`

``` javascript
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from 'src/reducers/nameForTheReducer';

const store = createStore(
  // reducer
  reducer,
  // enhancer
  devToolsEnhancer(),
);

export default store;
```

- utilisation du composant Provider pour que nos composants puissent accéder au _store_. Par exemple dans src/index.js

``` javascript
import { Provider } from 'react-redux';

import store from 'src/store';

[...]

const rootReactElement = (
  <Provider store={store}>
    <App />
  </Provider>
);
```

- on peut alors visualiser le _state_ avec Redux dev tools

# Connexion d'un composant au store

- Créer un fichier dans src/containers (garder le même chemin que src/components pour le composant) : assistant pour le composant, qui va faire le lien avec le _store_

``` javascript
import { connect } from 'react-redux';

import LeComposant from 'src/components/...../LeComposant';

const mapStateToProps = (state) => ({
  // nom de la prop à remplir: donnée à récupérer dans le state
});

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeComposant);

```

- utiliser le nouveau composant à la place du composant de présentation (remplacer _components_ dans l'import par _containers_), et supprimer le cas échéant les props qui sont liées au state

## mapStateToProps : les props qui lisent une valeur du state

- indiquer le nom de la prop à remplir et la propriété du state qui correspond, par exemple :

``` javascript
const mapStateToProps = (state) => {
  return {
    // nom de la prop à remplir: donnée à récupérer dans le state
    messages: state.listMessages,
  };
};
```

=> on va injecter _state.listMessages_ dans la prop _messages_ du composant _LeComposant_ 

## mapDispatchToProps : les props qui doivent envoyer une action au store

Envoyer une action au store : par exemple si on veut modifier le state

- si on n'a pas encore de fichier pour les actions : créer un fichier `src/actions/nameForTheActions.js`

``` javascript
// action types
export const DO_SOMETHING = 'DO_SOMETHING';

// action creators
export const doSomething = (/* newValue */) => ({
  type: DO_SOMETHING,
  /* value: newValue,*/
});

```

- si l'action dont on a besoin n'existe pas encore : définir le _action type_ ("quelle est l'intention ?") et le _action creator_ (fonction qui permet de créer une action de tel type).

- ajouter le traitement de l'action dans le reducer (= quel est son impact sur le state)

``` javascript
import { DO_SOMETHING } from 'src/actions/nameForTheActions.js';

[...]

switch (action.type) {
    case DO_SOMETHING:
      // on retourne une copie du state
      return {
        // on déverse les informations du state actuel
        ...state,
        // on écrase certaines propriétés du state
        propriété_à_modifier: nouvelle_valeur,
        propriété_à_modifier2: action.payload,
      };
    [...]
```

- dans mapDispatchToProps, indiquer le nom de la prop à remplir et la callback
correspondante, qui utilise _dispatch_ et le _action creator_ pour envoyer l'action

``` javascript
import { doSomething } from 'src/actions/nameForTheActions.js';

const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: callback qui contient un appel à dispatch
  setValue: (/* param1 */) => {
    dispatch(doSomething(/* param1 */));
  },
});
```





