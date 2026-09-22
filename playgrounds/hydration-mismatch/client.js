import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from './App.js';

hydrateRoot(document.querySelector('#root'), React.createElement(App), {
  onRecoverableError(error) {
    console.warn('Expected hydration mismatch:', error.message);
  },
});
