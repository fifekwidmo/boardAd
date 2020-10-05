import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

const mockProps = {
  posts: [
    {
      _id: 1,
      title: 'Room for rent',
      description: 'I have a spare room for rent. Low price!',
      dateOfUpdate: '2020-10-02',
      dateOfPublication: '2020-10-01',
      price: '20',
    },
  ],
  fetchPublishedPosts: () => console.log('function fetchPublishedPosts'),
};

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<HomepageComponent {...mockProps} />);
    expect(component).toBeTruthy();
  });
});