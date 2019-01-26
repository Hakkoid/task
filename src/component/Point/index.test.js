import React from 'react';
import { mount } from 'enzyme';
import Point from './index';
import renderer from 'react-test-renderer';


describe( 'Point', () => {

    it('renders without crashing', () => {
        mount(<Point id = '0' onClose = {() => {}} />)
    })


    describe( 'onClose event', () => {
        
        it('should send the id prop to the callback func', () => {

            let handler = (event) => { expect(event).toBe(id)}

            let id = '0';
            let component = mount(<Point id = {id} onClose = {handler}/>);
            component.find('.Point__Close').simulate('click')

            id = 'ssss';
            component.setProps({id})
            component.find('.Point__Close').simulate('click')
        })

    })


    it( 'Snapshot', () => {
        const component = renderer.create(
        <Point id = '0' onClose = { () => {}} />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})