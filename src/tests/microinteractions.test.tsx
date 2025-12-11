import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MicroInteractions } from '../components/general/microinteractions';

describe('MicroInteractions Component', () => {
  let originalBody: HTMLElement;

  beforeEach(() => {
    originalBody = document.body;
    // Clear all classes from body before each test
    document.body.className = '';
  });

  describe('Class Addition', () => {
    it('should add buttonring class when buttonring prop is true', () => {
      MicroInteractions({ buttonring: true });
      expect(document.body.classList.contains('buttonring')).toBe(true);
    });

    it('should add cartpulse class when cartpulse prop is true', () => {
      MicroInteractions({ cartpulse: true });
      expect(document.body.classList.contains('cartpulse')).toBe(true);
    });

    it('should add formglow class when formglow prop is true', () => {
      MicroInteractions({ formglow: true });
      expect(document.body.classList.contains('formglow')).toBe(true);
    });

    it('should add grayscalehover class when grayscalehover prop is true', () => {
      MicroInteractions({ grayscalehover: true });
      expect(document.body.classList.contains('grayscalehover')).toBe(true);
    });

    it('should add imgscale class when imgscale prop is true', () => {
      MicroInteractions({ imgscale: true });
      expect(document.body.classList.contains('imgscale')).toBe(true);
    });

    it('should add imgtwist class when imgtwist prop is true', () => {
      MicroInteractions({ imgtwist: true });
      expect(document.body.classList.contains('imgtwist')).toBe(true);
    });

    it('should add imghue class when imghue prop is true', () => {
      MicroInteractions({ imghue: true });
      expect(document.body.classList.contains('imghue')).toBe(true);
    });

    it('should add simplemenubutton class when simplemenubutton prop is true', () => {
      MicroInteractions({ simplemenubutton: true });
      expect(document.body.classList.contains('simplemenubutton')).toBe(true);
    });
  });

  describe('Class Removal', () => {
    it('should remove buttonring class when buttonring prop is false', () => {
      document.body.classList.add('buttonring');
      MicroInteractions({ buttonring: false });
      expect(document.body.classList.contains('buttonring')).toBe(false);
    });

    it('should remove cartpulse class when cartpulse prop is false', () => {
      document.body.classList.add('cartpulse');
      MicroInteractions({ cartpulse: false });
      expect(document.body.classList.contains('cartpulse')).toBe(false);
    });

    it('should remove formglow class when formglow prop is false', () => {
      document.body.classList.add('formglow');
      MicroInteractions({ formglow: false });
      expect(document.body.classList.contains('formglow')).toBe(false);
    });

    it('should remove grayscalehover class when grayscalehover prop is false', () => {
      document.body.classList.add('grayscalehover');
      MicroInteractions({ grayscalehover: false });
      expect(document.body.classList.contains('grayscalehover')).toBe(false);
    });

    it('should remove imgscale class when imgscale prop is false', () => {
      document.body.classList.add('imgscale');
      MicroInteractions({ imgscale: false });
      expect(document.body.classList.contains('imgscale')).toBe(false);
    });

    it('should remove imgtwist class when imgtwist prop is false', () => {
      document.body.classList.add('imgtwist');
      MicroInteractions({ imgtwist: false });
      expect(document.body.classList.contains('imgtwist')).toBe(false);
    });

    it('should remove imghue class when imghue prop is false', () => {
      document.body.classList.add('imghue');
      MicroInteractions({ imghue: false });
      expect(document.body.classList.contains('imghue')).toBe(false);
    });

    it('should remove simplemenubutton class when simplemenubutton prop is false', () => {
      document.body.classList.add('simplemenubutton');
      MicroInteractions({ simplemenubutton: false });
      expect(document.body.classList.contains('simplemenubutton')).toBe(false);
    });
  });

  describe('Multiple Classes', () => {
    it('should add multiple classes when multiple props are true', () => {
      MicroInteractions({
        buttonring: true,
        cartpulse: true,
        formglow: true
      });
      expect(document.body.classList.contains('buttonring')).toBe(true);
      expect(document.body.classList.contains('cartpulse')).toBe(true);
      expect(document.body.classList.contains('formglow')).toBe(true);
    });

    it('should handle mixed true and false props', () => {
      MicroInteractions({
        buttonring: true,
        cartpulse: false,
        formglow: true,
        imgscale: false
      });
      expect(document.body.classList.contains('buttonring')).toBe(true);
      expect(document.body.classList.contains('cartpulse')).toBe(false);
      expect(document.body.classList.contains('formglow')).toBe(true);
      expect(document.body.classList.contains('imgscale')).toBe(false);
    });

    it('should handle all microinteractions at once', () => {
      MicroInteractions({
        buttonring: true,
        cartpulse: true,
        formglow: true,
        grayscalehover: true,
        imgscale: true,
        imgtwist: true,
        imghue: true,
        simplemenubutton: true
      });
      expect(document.body.classList.contains('buttonring')).toBe(true);
      expect(document.body.classList.contains('cartpulse')).toBe(true);
      expect(document.body.classList.contains('formglow')).toBe(true);
      expect(document.body.classList.contains('grayscalehover')).toBe(true);
      expect(document.body.classList.contains('imgscale')).toBe(true);
      expect(document.body.classList.contains('imgtwist')).toBe(true);
      expect(document.body.classList.contains('imghue')).toBe(true);
      expect(document.body.classList.contains('simplemenubutton')).toBe(true);
    });
  });

  describe('Toggle Behavior', () => {
    it('should toggle class on when switching from false to true', () => {
      MicroInteractions({ buttonring: false });
      expect(document.body.classList.contains('buttonring')).toBe(false);
      MicroInteractions({ buttonring: true });
      expect(document.body.classList.contains('buttonring')).toBe(true);
    });

    it('should toggle class off when switching from true to false', () => {
      MicroInteractions({ cartpulse: true });
      expect(document.body.classList.contains('cartpulse')).toBe(true);
      MicroInteractions({ cartpulse: false });
      expect(document.body.classList.contains('cartpulse')).toBe(false);
    });

    it('should handle rapid toggling', () => {
      MicroInteractions({ formglow: true });
      MicroInteractions({ formglow: false });
      MicroInteractions({ formglow: true });
      MicroInteractions({ formglow: false });
      expect(document.body.classList.contains('formglow')).toBe(false);
    });
  });

  describe('ScrollFadeElements', () => {
    it('should accept scrollfadeElements string prop', () => {
      const selector = '.fade-element';
      // This just tests that the prop is accepted without error
      expect(() => {
        MicroInteractions({ scrollfadeElements: selector });
      }).not.toThrow();
    });

    it('should handle scrollfadeElements with class selector', () => {
      expect(() => {
        MicroInteractions({ scrollfadeElements: '.scroll-fade' });
      }).not.toThrow();
    });

    it('should handle scrollfadeElements with id selector', () => {
      expect(() => {
        MicroInteractions({ scrollfadeElements: '#fade-container' });
      }).not.toThrow();
    });

    it('should handle empty scrollfadeElements string', () => {
      expect(() => {
        MicroInteractions({ scrollfadeElements: '' });
      }).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty props object', () => {
      expect(() => {
        MicroInteractions({});
      }).not.toThrow();
    });

    it('should handle undefined values in props', () => {
      expect(() => {
        MicroInteractions({
          buttonring: undefined as any,
          cartpulse: undefined as any
        });
      }).not.toThrow();
    });

    it('should not add classes for undefined props', () => {
      MicroInteractions({
        buttonring: undefined as any
      });
      expect(document.body.classList.contains('buttonring')).toBe(false);
    });

    it('should handle null values in props', () => {
      expect(() => {
        MicroInteractions({
          buttonring: null as any
        });
      }).not.toThrow();
    });

    it('should preserve other body classes', () => {
      document.body.classList.add('existing-class');
      MicroInteractions({ buttonring: true });
      expect(document.body.classList.contains('existing-class')).toBe(true);
      expect(document.body.classList.contains('buttonring')).toBe(true);
    });

    it('should handle props with non-boolean values that are truthy', () => {
      const props: any = {
        buttonring: 'true',
        cartpulse: 1,
        formglow: 'enabled'
      };
      // Truthy values should not add classes (they're not true)
      MicroInteractions(props);
      // This depends on the implementation - the component checks for === true
      expect(document.body.classList.contains('buttonring')).toBe(false);
    });
  });

  describe('Real-world Scenarios', () => {
    it('should enable hover effects', () => {
      MicroInteractions({
        grayscalehover: true,
        imgscale: true
      });
      expect(document.body.classList.contains('grayscalehover')).toBe(true);
      expect(document.body.classList.contains('imgscale')).toBe(true);
    });

    it('should enable cart-specific animations', () => {
      MicroInteractions({
        cartpulse: true,
        simplemenubutton: true
      });
      expect(document.body.classList.contains('cartpulse')).toBe(true);
      expect(document.body.classList.contains('simplemenubutton')).toBe(true);
    });

    it('should enable form animations with scroll fade', () => {
      MicroInteractions({
        formglow: true,
        scrollfadeElements: '.form-section'
      });
      expect(document.body.classList.contains('formglow')).toBe(true);
    });

    it('should enable all image transformations', () => {
      MicroInteractions({
        imgscale: true,
        imgtwist: true,
        imghue: true,
        grayscalehover: true
      });
      expect(document.body.classList.contains('imgscale')).toBe(true);
      expect(document.body.classList.contains('imgtwist')).toBe(true);
      expect(document.body.classList.contains('imghue')).toBe(true);
      expect(document.body.classList.contains('grayscalehover')).toBe(true);
    });

    it('should disable all effects when props are false', () => {
      // First enable everything
      MicroInteractions({
        buttonring: true,
        cartpulse: true,
        formglow: true,
        grayscalehover: true,
        imgscale: true,
        imgtwist: true,
        imghue: true,
        simplemenubutton: true
      });

      // Then disable everything
      MicroInteractions({
        buttonring: false,
        cartpulse: false,
        formglow: false,
        grayscalehover: false,
        imgscale: false,
        imgtwist: false,
        imghue: false,
        simplemenubutton: false
      });

      expect(document.body.classList.contains('buttonring')).toBe(false);
      expect(document.body.classList.contains('cartpulse')).toBe(false);
      expect(document.body.classList.contains('formglow')).toBe(false);
      expect(document.body.classList.contains('grayscalehover')).toBe(false);
      expect(document.body.classList.contains('imgscale')).toBe(false);
      expect(document.body.classList.contains('imgtwist')).toBe(false);
      expect(document.body.classList.contains('imghue')).toBe(false);
      expect(document.body.classList.contains('simplemenubutton')).toBe(false);
    });
  });
});
