import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import List from './List'; //importing js file from name List
import Box from '../Box/Box'

let Students;

describe('List component ', () => {

    beforeEach(()=>{
    Students = [
            {id:3, text:"bob", css:"selected"},
            {id:4, text:"sam", css:"empty"},
            {id:5, text:"frank", css:"selected"}
        ]
    });

    it('Should render without error', () => {
        const wrapper = shallow(<List />);
        expect(wrapper).to.be.ok;
    });

    it('should find component using its class name', () => {
        const wrapper = shallow(<List />);
        expect(wrapper.find(".list").length).to.equal(1);
    });

    it('should get the header from component', () => {
        const wrapper = shallow(<List header="Students"/>);
        expect(wrapper.text()).to.equal('Students');
    });

    it('should render out 3 boxes', () => {
        const wrapper = mount(<List header="Students" items={Students}/>);
        expect(wrapper.find('.box').length).to.equal(3); 
    });

    it('should display sam in the 2 boxes', () => {
        const wrapper = mount(<List header="Students" items={Students}/>);
        expect(wrapper.find(Box).length).to.equal(3); 
        expect(wrapper.find(Box).at(1).find('div > div').html()).to.equal('<div data-id="4" class="empty">sam</div>');  
        var item = wrapper.find(Box).at(1);
        expect(item.props().id).to.equal(4);
    });

    it('should call function when 2nd box is clicked', () => {
        const stub = sinon.stub();
        const wrapper = mount(<List click={stub} header="Students" items={Students}/>);
        wrapper.find(Box).at(1).find('div > div').simulate('click');
        expect(stub.callCount).to.equal(1);
    });
});