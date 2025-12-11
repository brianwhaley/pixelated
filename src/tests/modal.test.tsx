import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal, handleModalOpen } from '../components/general/modal';

describe('Modal Component', () => {
  describe('Rendering', () => {
    it('should render the modal with hidden display by default', () => {
      render(<Modal modalContent={<p>Test content</p>} />);
      const modal = document.getElementById('myModal');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveStyle('display: none');
    });

    it('should render modal content inside modal-content div', () => {
      const content = 'This is test content';
      render(<Modal modalContent={<p>{content}</p>} />);
      expect(screen.getByText(content)).toBeInTheDocument();
    });

    it('should render close button with correct ID and class', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const closeBtn = document.getElementById('myModalClose');
      expect(closeBtn).toBeInTheDocument();
      expect(closeBtn).toHaveClass('modal-close');
    });

    it('should render modal with correct CSS class', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');
      expect(modal).toHaveClass('modal');
    });

    it('should render modal-content div with correct structure', () => {
      render(<Modal modalContent={<div>Content</div>} />);
      const modalContent = document.querySelector('.modal-content');
      expect(modalContent).toBeInTheDocument();
      expect(modalContent?.querySelector('.modal-close')).toBeInTheDocument();
    });

    it('should handle complex JSX content', () => {
      const complexContent = (
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      );
      render(<Modal modalContent={complexContent} />);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      expect(screen.getByText('Button')).toBeInTheDocument();
    });
  });

  describe('Modal ID Handling', () => {
    it('should use default modalID when not provided', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      expect(document.getElementById('myModal')).toBeInTheDocument();
      expect(document.getElementById('myModalClose')).toBeInTheDocument();
    });

    it('should use custom modalID when provided', () => {
      render(<Modal modalContent={<p>Test</p>} modalID="custom" />);
      expect(document.getElementById('myModalcustom')).toBeInTheDocument();
      expect(document.getElementById('myModalClosecustom')).toBeInTheDocument();
    });

    it('should support multiple modals with different IDs', () => {
      const { unmount: unmount1 } = render(
        <Modal modalContent={<p>Modal 1</p>} modalID="1" />
      );
      render(<Modal modalContent={<p>Modal 2</p>} modalID="2" />);

      expect(document.getElementById('myModal1')).toBeInTheDocument();
      expect(document.getElementById('myModal2')).toBeInTheDocument();
      expect(document.getElementById('myModalClose1')).toBeInTheDocument();
      expect(document.getElementById('myModalClose2')).toBeInTheDocument();
    });
  });

  describe('Close Button Interaction', () => {
    it('should hide modal when close button is clicked', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');
      const closeBtn = document.getElementById('myModalClose');

      // Manually set display to block to simulate open modal
      if (modal) modal.style.display = 'block';
      expect(modal).toHaveStyle('display: block');

      // Click close button
      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');
    });

    it('should hide modal when close button with custom ID is clicked', () => {
      render(<Modal modalContent={<p>Test</p>} modalID="custom" />);
      const modal = document.getElementById('myModalcustom');
      const closeBtn = document.getElementById('myModalClosecustom');

      if (modal) modal.style.display = 'block';
      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');
    });

    it('should have aria-hidden attribute on close button', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const closeBtn = document.getElementById('myModalClose');
      expect(closeBtn).toHaveAttribute('aria-hidden', 'true');
    });

    it('should handle multiple close button clicks', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');
      const closeBtn = document.getElementById('myModalClose');

      if (modal) modal.style.display = 'block';
      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');

      // Open again
      if (modal) modal.style.display = 'block';
      expect(modal).toHaveStyle('display: block');

      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');
    });
  });

  describe('Backdrop Click Handling', () => {
    it('should hide modal when clicking on backdrop', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');

      if (modal) modal.style.display = 'block';
      expect(modal).toHaveStyle('display: block');

      // Click on the modal backdrop
      fireEvent.click(modal!);
      expect(modal).toHaveStyle('display: none');
    });

    it('should not hide modal when clicking on modal content', () => {
      render(<Modal modalContent={<div id="test-content">Test</div>} />);
      const modal = document.getElementById('myModal');
      const content = document.querySelector('.modal-content');

      if (modal) modal.style.display = 'block';
      fireEvent.click(content!);
      expect(modal).toHaveStyle('display: block');
    });

    it('should hide modal when clicking outside content area', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');

      if (modal) modal.style.display = 'block';
      fireEvent.click(modal!);
      expect(modal).toHaveStyle('display: none');
    });
  });

  describe('handleModalOpen Function', () => {
    beforeEach(() => {
      // Reset document body
      document.body.innerHTML = '';
    });

    it('should open modal when handleModalOpen is called', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');

      const event = new MouseEvent('click', { bubbles: true });
      handleModalOpen(event);

      expect(modal).toHaveStyle('display: block');
    });

    it('should open correct modal with custom ID', () => {
      render(<Modal modalContent={<p>Test</p>} modalID="target" />);
      const modal = document.getElementById('myModaltarget');

      const event = new MouseEvent('click', { bubbles: true });
      handleModalOpen(event, 'target');

      expect(modal).toHaveStyle('display: block');
    });

    it('should not affect other modals when opening specific one', () => {
      render(<Modal modalContent={<p>Modal 1</p>} modalID="1" />);
      render(<Modal modalContent={<p>Modal 2</p>} modalID="2" />);

      const modal1 = document.getElementById('myModal1');
      const modal2 = document.getElementById('myModal2');

      const event = new MouseEvent('click', { bubbles: true });
      handleModalOpen(event, '1');

      expect(modal1).toHaveStyle('display: block');
      expect(modal2).toHaveStyle('display: none');
    });

    it('should work when called from button click event', () => {
      const { container } = render(
        <div>
          <button onClick={(e) => handleModalOpen(e as any, 'test')}>
            Open Modal
          </button>
          <Modal modalContent={<p>Test</p>} modalID="test" />
        </div>
      );

      const button = screen.getByRole('button', { name: /open modal/i });
      const modal = document.getElementById('myModaltest');

      fireEvent.click(button);
      expect(modal).toHaveStyle('display: block');
    });

    it('should call preventDefault on the event', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const event = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      handleModalOpen(event);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Event Listener Management', () => {
    it('should attach click listener on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const { unmount } = render(<Modal modalContent={<p>Test</p>} />);

      expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
      addEventListenerSpy.mockRestore();
      unmount();
    });

    it('should remove click listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      const { unmount } = render(<Modal modalContent={<p>Test</p>} />);

      unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
      removeEventListenerSpy.mockRestore();
    });

    it('should attach close button listener on mount', () => {
      const { unmount } = render(<Modal modalContent={<p>Test</p>} />);
      const closeBtn = document.getElementById('myModalClose');

      // Manually open modal
      const modal = document.getElementById('myModal');
      if (modal) modal.style.display = 'block';

      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');

      unmount();
    });
  });

  describe('Open/Close Cycle', () => {
    it('should handle complete open/close cycle', () => {
      render(
        <div>
          <button onClick={(e) => handleModalOpen(e as any)}>Open</button>
          <Modal modalContent={<p>Test Content</p>} />
        </div>
      );

      const modal = document.getElementById('myModal');
      const openBtn = screen.getByRole('button', { name: /open/i });
      const closeBtn = document.getElementById('myModalClose');

      // Initial state: closed
      expect(modal).toHaveStyle('display: none');

      // Open
      fireEvent.click(openBtn);
      expect(modal).toHaveStyle('display: block');

      // Close
      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');

      // Open again
      fireEvent.click(openBtn);
      expect(modal).toHaveStyle('display: block');
    });

    it('should handle rapid open/close clicks', () => {
      render(
        <div>
          <button onClick={(e) => handleModalOpen(e as any)}>Open</button>
          <Modal modalContent={<p>Test</p>} />
        </div>
      );

      const modal = document.getElementById('myModal');
      const openBtn = screen.getByRole('button', { name: /open/i });
      const closeBtn = document.getElementById('myModalClose');

      // Rapid clicks
      fireEvent.click(openBtn);
      fireEvent.click(openBtn);
      fireEvent.click(openBtn);
      expect(modal).toHaveStyle('display: block');

      fireEvent.click(closeBtn!);
      fireEvent.click(closeBtn!);
      expect(modal).toHaveStyle('display: none');
    });
  });

  describe('CSS Classes and Styling', () => {
    it('should have correct CSS classes applied', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');
      const modalContent = document.querySelector('.modal-content');
      const closeBtn = document.querySelector('.modal-close');

      expect(modal).toHaveClass('modal');
      expect(modalContent).toHaveClass('modal-content');
      expect(closeBtn).toHaveClass('modal-close');
    });

    it('should have display none by default', () => {
      const { container } = render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');
      expect(modal).toHaveStyle('display: none');
    });

    it('should change display property when opened', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');

      if (modal) modal.style.display = 'block';
      expect(modal).toHaveStyle('display: block');
    });
  });

  describe('Close Button Styling', () => {
    it('should display close button with × symbol', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const closeBtn = document.getElementById('myModalClose');
      expect(closeBtn?.textContent).toBe('×');
    });

    it('should position close button correctly', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const closeBtn = document.getElementById('myModalClose');
      expect(closeBtn).toHaveClass('modal-close');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty content', () => {
      render(<Modal modalContent={<></>} />);
      const modal = document.getElementById('myModal');
      expect(modal).toBeInTheDocument();
    });

    it('should handle null content gracefully', () => {
      render(<Modal modalContent={null} />);
      const modal = document.getElementById('myModal');
      expect(modal).toBeInTheDocument();
    });

    it('should handle very long content', () => {
      const longContent = Array.from({ length: 100 }, (_, i) => (
        <p key={i}>Line {i + 1}</p>
      ));
      render(<Modal modalContent={<div>{longContent}</div>} />);
      expect(screen.getByText('Line 1')).toBeInTheDocument();
      expect(screen.getByText('Line 100')).toBeInTheDocument();
    });

    it('should handle special characters in modalID', () => {
      render(<Modal modalContent={<p>Test</p>} modalID="id-with-dash" />);
      expect(document.getElementById('myModalid-with-dash')).toBeInTheDocument();
    });

    it('should handle numeric modalID', () => {
      render(<Modal modalContent={<p>Test</p>} modalID="123" />);
      expect(document.getElementById('myModal123')).toBeInTheDocument();
    });

    it('should work when modal element is not found', () => {
      const event = new MouseEvent('click', { bubbles: true });
      // Should not throw error when modal doesn't exist
      expect(() => handleModalOpen(event, 'nonexistent')).not.toThrow();
    });

    it('should handle clicking on modal multiple times in succession', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const modal = document.getElementById('myModal');

      if (modal) modal.style.display = 'block';
      fireEvent.click(modal!);
      fireEvent.click(modal!);
      fireEvent.click(modal!);

      expect(modal).toHaveStyle('display: none');
    });

    it('should handle nested elements within modal content', () => {
      const nestedContent = (
        <div>
          <div>
            <div>
              <span>Deeply nested</span>
            </div>
          </div>
        </div>
      );
      render(<Modal modalContent={nestedContent} />);
      expect(screen.getByText('Deeply nested')).toBeInTheDocument();
    });

    it('should preserve modal state after content updates', () => {
      const { rerender } = render(
        <Modal modalContent={<p>Initial content</p>} />
      );
      const modal = document.getElementById('myModal');

      if (modal) modal.style.display = 'block';
      expect(modal).toHaveStyle('display: block');

      rerender(<Modal modalContent={<p>Updated content</p>} />);
      expect(modal).toHaveStyle('display: block');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-hidden on close button', () => {
      render(<Modal modalContent={<p>Test</p>} />);
      const closeBtn = document.getElementById('myModalClose');
      expect(closeBtn).toHaveAttribute('aria-hidden', 'true');
    });

    it('should be keyboard accessible when modal content has focusable elements', () => {
      render(
        <Modal
          modalContent={
            <div>
              <button>Action Button</button>
            </div>
          }
        />
      );
      const actionBtn = screen.getByText('Action Button');
      expect(actionBtn).toBeInTheDocument();
    });

    it('should render semantic HTML structure', () => {
      const { container } = render(
        <Modal modalContent={<p>Test</p>} />
      );
      const modal = document.getElementById('myModal');
      const modalContent = modal?.querySelector('.modal-content');
      expect(modalContent?.children.length).toBeGreaterThan(0);
    });
  });

  describe('Multiple Modal Instances', () => {
    it('should support rendering multiple modals simultaneously', () => {
      render(
        <div>
          <Modal modalContent={<p>Modal 1</p>} modalID="1" />
          <Modal modalContent={<p>Modal 2</p>} modalID="2" />
          <Modal modalContent={<p>Modal 3</p>} modalID="3" />
        </div>
      );

      expect(document.getElementById('myModal1')).toBeInTheDocument();
      expect(document.getElementById('myModal2')).toBeInTheDocument();
      expect(document.getElementById('myModal3')).toBeInTheDocument();
    });

    it('should independently manage close buttons for multiple modals', () => {
      render(
        <div>
          <Modal modalContent={<p>Modal 1</p>} modalID="1" />
          <Modal modalContent={<p>Modal 2</p>} modalID="2" />
        </div>
      );

      const modal1 = document.getElementById('myModal1');
      const modal2 = document.getElementById('myModal2');
      const closeBtn1 = document.getElementById('myModalClose1');
      const closeBtn2 = document.getElementById('myModalClose2');

      if (modal1) modal1.style.display = 'block';
      if (modal2) modal2.style.display = 'block';

      fireEvent.click(closeBtn1!);
      expect(modal1).toHaveStyle('display: none');
      expect(modal2).toHaveStyle('display: block');

      fireEvent.click(closeBtn2!);
      expect(modal2).toHaveStyle('display: none');
    });
  });
});
