import React from 'react';
import { Accordion } from '@/components/general/accordion';

export default {
  title: 'General',
  component: Accordion,
};

const mockItems = [
  {
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.'
  },
  {
    title: 'How does it work?',
    content: 'React uses a component-based architecture and virtual DOM for efficient rendering.'
  },
  {
    title: 'Why use React?',
    content: 'React provides reusable components, efficient updates, and a large ecosystem.'
  }
];

export const Default = () => (
  <Accordion items={mockItems} />
);

export const WithHTMLContent = () => (
  <Accordion items={[
    {
      title: 'Rich Content Example',
      content: (
        <div>
          <p>This accordion item contains <strong>HTML content</strong>.</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </div>
      )
    }
  ]} />
);

export const SingleItem = () => (
  <Accordion items={[
    {
      title: 'Single FAQ',
      content: 'This is a single accordion item for testing.'
    }
  ]} />
);
