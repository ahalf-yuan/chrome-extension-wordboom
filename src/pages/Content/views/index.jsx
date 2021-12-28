import React from 'react';
import { render } from 'react-dom';

import Translate from './Translate';
import './index.css';

render(<Translate />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
