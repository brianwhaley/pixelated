import React from 'react';
import renderer from 'react-test-renderer';
import Menu from './pixelated.menu-simple';

const menuItems = {
  Home: './index.html',
  Resume: '/resume.html',
};

describe('Menu', () => {
  test('Menu with props snapshot renders', () => {
    const cMenu = renderer.create(<Menu menuItems={menuItems} />);
    const tree = cMenu.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
