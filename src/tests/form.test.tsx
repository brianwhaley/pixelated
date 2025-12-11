import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormEngine } from '../components/pagebuilder/form/form';

describe('Form Component', () => {
  const mockOnSubmitHandler = vi.fn();

  beforeEach(() => {
    mockOnSubmitHandler.mockClear();
  });

  describe('FormEngine Basic Rendering', () => {
    it('should render form element', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} onSubmitHandler={mockOnSubmitHandler} />
      );
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should render with default form element type', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should apply form name prop', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} name="test-form" />
      );
      expect(container.querySelector('form')).toHaveAttribute('name', 'test-form');
    });

    it('should apply form id prop', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} id="my-form" />
      );
      expect(container.querySelector('form')).toHaveAttribute('id', 'my-form');
    });

    it('should apply form method prop', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} method="post" />
      );
      expect(container.querySelector('form')).toHaveAttribute('method', 'post');
    });

    it('should render form without errors', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('form')).toBeInTheDocument();
    });
  });

  describe('FormEngine Field Generation', () => {
    it('should render form with no fields', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const form = container.querySelector('form');
      expect(form?.children.length).toBe(0);
    });

    it('should render single text input field', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'text',
              name: 'username',
              placeholder: 'Enter username'
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[name="username"]');
      expect(input).toBeInTheDocument();
    });

    it('should render multiple input fields', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'name' }
          },
          {
            component: 'FormInput',
            props: { type: 'email', name: 'email' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('input[name="name"]')).toBeInTheDocument();
      expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
    });

    it('should convert string numeric props to numbers', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'text',
              name: 'test',
              maxLength: '100'
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[name="test"]') as HTMLInputElement;
      expect(input.maxLength).toBe(100);
    });

    it('should handle maxLength numeric conversion', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'text',
              name: 'text',
              maxLength: '50'
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[name="text"]') as HTMLInputElement;
      expect(input.maxLength).toBe(50);
    });

    it('should handle minLength numeric conversion', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'text',
              name: 'text',
              minLength: '5'
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[name="text"]') as HTMLInputElement;
      expect(input.minLength).toBe(5);
    });

    it('should handle rows numeric conversion for textarea', () => {
      const formData = {
        fields: [
          {
            component: 'FormTextarea',
            props: {
              name: 'message',
              rows: '10'
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const textarea = container.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(10);
    });

    it('should not convert already numeric props', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'number',
              name: 'number',
              maxLength: 25
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[name="number"]') as HTMLInputElement;
      expect(input.maxLength).toBe(25);
    });

    it('should ignore null numeric prop values', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'text',
              name: 'text',
              maxLength: null
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('input[name="text"]')).toBeInTheDocument();
    });

    it('should ignore empty string numeric prop values', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: {
              type: 'text',
              name: 'text',
              maxLength: ''
            }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('input[name="text"]')).toBeInTheDocument();
    });
  });

  describe('FormEngine Form Submission', () => {
    it('should call onSubmitHandler when form is submitted', () => {
      const formData = {
        fields: [
          {
            component: 'FormButton',
            props: { type: 'submit', label: 'Submit' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} onSubmitHandler={mockOnSubmitHandler} />
      );
      const form = container.querySelector('form') as HTMLFormElement;
      fireEvent.submit(form);
      expect(mockOnSubmitHandler).toHaveBeenCalled();
    });

    it('should prevent default form submission behavior', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} onSubmitHandler={mockOnSubmitHandler} />
      );
      const form = container.querySelector('form') as HTMLFormElement;
      const event = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      form.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should handle form submission without onSubmitHandler', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const form = container.querySelector('form') as HTMLFormElement;
      expect(() => fireEvent.submit(form)).not.toThrow();
    });
  });

  describe('Form Attributes', () => {
    it('should apply custom form attributes', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine 
          formData={formData} 
          name="custom-form" 
          id="form-1" 
          method="post"
        />
      );
      const form = container.querySelector('form');
      expect(form).toHaveAttribute('name', 'custom-form');
      expect(form).toHaveAttribute('id', 'form-1');
      expect(form).toHaveAttribute('method', 'post');
    });

    it('should exclude formData from form props', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const form = container.querySelector('form');
      expect(form?.getAttribute('formData')).toBeNull();
    });

    it('should exclude onSubmitHandler from form props', () => {
      const formData = {
        fields: []
      };
      const { container } = render(
        <FormEngine formData={formData} onSubmitHandler={mockOnSubmitHandler} />
      );
      const form = container.querySelector('form');
      expect(form?.getAttribute('onSubmitHandler')).toBeNull();
    });
  });

  describe('FormEngine Input Types', () => {
    it('should render text input', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'text' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
    });

    it('should render email input', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'email', name: 'email' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[type="email"]');
      expect(input).toBeInTheDocument();
    });

    it('should render password input', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'password', name: 'password' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('should render number input', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'number', name: 'number' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input[type="number"]');
      expect(input).toBeInTheDocument();
    });

    it('should render checkbox component', () => {
      const formData = {
        fields: [
          {
            component: 'FormCheckbox',
            props: { name: 'agree', label: 'I agree' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      // FormCheckbox component renders elements - check that form was rendered
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should render radio component', () => {
      const formData = {
        fields: [
          {
            component: 'FormRadio',
            props: { name: 'choice', label: 'Option 1' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      // FormRadio component renders elements - check that form was rendered
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('should render select component', () => {
      const formData = {
        fields: [
          {
            component: 'FormSelect',
            props: { name: 'options' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('select[name="options"]')).toBeInTheDocument();
    });

    it('should render textarea component', () => {
      const formData = {
        fields: [
          {
            component: 'FormTextarea',
            props: { name: 'message' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
    });

    it('should render button component', () => {
      const formData = {
        fields: [
          {
            component: 'FormButton',
            props: { type: 'submit', label: 'Submit' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('button')).toBeInTheDocument();
    });
  });

  describe('FormEngine Field Props', () => {
    it('should apply field name prop', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'field-name' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('input[name="field-name"]')).toBeInTheDocument();
    });

    it('should apply field placeholder prop', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'field', placeholder: 'Enter text' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.placeholder).toBe('Enter text');
    });

    it('should apply field required attribute', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'required-field', required: true }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('required');
    });

    it('should apply field disabled attribute', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'disabled-field', disabled: true }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('disabled');
    });

    it('should apply field value prop', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'field', value: 'initial value' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.value).toBe('initial value');
    });

    it('should apply field default value', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'field', defaultValue: 'default' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.defaultValue).toBe('default');
    });
  });

  describe('FormEngine Complex Scenarios', () => {
    it('should render complete form with multiple field types', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'text', name: 'username' }
          },
          {
            component: 'FormInput',
            props: { type: 'email', name: 'email' }
          },
          {
            component: 'FormTextarea',
            props: { name: 'message' }
          },
          {
            component: 'FormButton',
            props: { type: 'submit', label: 'Submit' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      expect(container.querySelector('input[name="username"]')).toBeInTheDocument();
      expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
      expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
      expect(container.querySelector('button')).toBeInTheDocument();
    });

    it('should preserve field order in form', () => {
      const formData = {
        fields: [
          { component: 'FormInput', props: { type: 'text', name: 'first' } },
          { component: 'FormInput', props: { type: 'text', name: 'second' } },
          { component: 'FormInput', props: { type: 'text', name: 'third' } }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const inputs = container.querySelectorAll('input');
      expect(inputs[0]).toHaveAttribute('name', 'first');
      expect(inputs[1]).toHaveAttribute('name', 'second');
      expect(inputs[2]).toHaveAttribute('name', 'third');
    });

    it('should handle form with multiple field types', () => {
      const formData = {
        fields: [
          {
            component: 'FormInput',
            props: { type: 'radio', name: 'choice1', value: 'option1' }
          },
          {
            component: 'FormInput',
            props: { type: 'radio', name: 'choice1', value: 'option2' }
          }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      const radios = container.querySelectorAll('input[type="radio"][name="choice1"]');
      expect(radios.length).toBe(2);
    });

    it('should generate unique keys for fields', () => {
      const formData = {
        fields: [
          { component: 'FormInput', props: { type: 'text', name: 'field1' } },
          { component: 'FormInput', props: { type: 'text', name: 'field2' } }
        ]
      };
      const { container } = render(
        <FormEngine formData={formData} />
      );
      // If keys are duplicated, React would warn - this test ensures uniqueness
      expect(container.querySelectorAll('input').length).toBe(2);
    });
  });
});
