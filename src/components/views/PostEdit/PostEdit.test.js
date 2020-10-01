import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

const mockProps = {
  post:
    {
      _id: 1,
      title: 'Room for rent',
      description: 'I have a spare room for rent. Low price!',
      dateOfUpdate: '2020-10-02',
      dateOfPublication: '2020-10-01',
      price: '20',
    },
  getPost: () => console.log('getPost'),
  id: 1,
  match: {params: 1},
};

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditComponent  {...mockProps} />);
    expect(component).toBeTruthy();
  });
});