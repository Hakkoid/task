// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './index';
// import { Provider } from 'react-redux';
// import store from '../../store';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(  
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     div 
//   );
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

it('renders without crashing', () => {
  shallow(<App />);
});