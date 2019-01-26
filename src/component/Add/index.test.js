import React from 'react';
import { mount } from 'enzyme';
import Add from './index';
import renderer from 'react-test-renderer';


describe( 'Add', () => {

    it('renders without crashing', () => {
        mount(<Add onAdd={()=>{}}/>)
    })


    describe( 'onAdd event', () => {
        
        it('Click on the button should send the input state to the callback func', () => {

            let handler = (event) => { expect(event).toBe('one')}

            let component = mount(<Add onAdd = {handler}/>);
            component.setState({input: 'one'});
            component.find('.Add__Button').simulate('submit')
        })

        it('Submit form handler should send the input state to the callback func', () => {

            let handler = (event) => { expect(event).toBe('six')}

            let component = mount(<Add onAdd = {handler}/>);
            component.setState({input: 'six'});
            component.find('.Add').simulate('submit')
        })
    })


    it( 'Snapshot', () => {
        const component = renderer.create(
        <Add onAdd = { () => {}} />,
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})