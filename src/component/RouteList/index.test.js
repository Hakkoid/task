import React from 'react';
import { mount } from 'enzyme';
import RouteList from './index';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import store from '../../store.js';


describe( 'RouteList', () => {

    it('renders without crashing', () => {
        mount(
            <Provider store = { store }>
                <RouteList />
            </Provider>
        )
    })

    it( 'Snapshot', () => {
        const component = renderer.create(
            <Provider store = { store }>
                <RouteList />
            </Provider>,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})