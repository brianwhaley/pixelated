/// <reference types="vitest/globals" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { SiteHealthTemplate } from '../components/admin/site-health/site-health-template';

describe('SiteHealthTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when siteName is empty', () => {
    const { container } = render(
      <SiteHealthTemplate siteName="" fetchData={vi.fn()}>
        {() => <div>Test content</div>}
      </SiteHealthTemplate>
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows loading state initially', () => {
    const mockFetchData = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves

    render(
      <SiteHealthTemplate siteName="test-site" fetchData={mockFetchData}>
        {() => <div>Test content</div>}
      </SiteHealthTemplate>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders children with data when fetch succeeds', async () => {
    const mockData = { test: 'data' };
    const mockFetchData = vi.fn().mockResolvedValue(mockData);

    render(
      <SiteHealthTemplate siteName="test-site" fetchData={mockFetchData}>
        {(data: { test: string } | null) => <div>Data: {data?.test}</div>}
      </SiteHealthTemplate>
    );

    await waitFor(() => {
      expect(screen.getByText('Data: data')).toBeInTheDocument();
    });

    expect(mockFetchData).toHaveBeenCalledWith('test-site', true);
  });

  it('shows error state when fetch fails', async () => {
    const mockFetchData = vi.fn().mockRejectedValue(new Error('Fetch failed'));

    render(
      <SiteHealthTemplate siteName="test-site" fetchData={mockFetchData}>
        {() => <div>Test content</div>}
      </SiteHealthTemplate>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Fetch failed')).toBeInTheDocument();
    });
  });

  it('handles non-Error thrown values', async () => {
    const mockFetchData = vi.fn().mockRejectedValue('String error');

    render(
      <SiteHealthTemplate siteName="test-site" fetchData={mockFetchData}>
        {() => <div>Test content</div>}
      </SiteHealthTemplate>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to load data')).toBeInTheDocument();
    });
  });

  it('re-fetches data when siteName changes', async () => {
    const mockFetchData = vi.fn().mockResolvedValue({ test: 'data' });

    const { rerender } = render(
      <SiteHealthTemplate siteName="site1" fetchData={mockFetchData}>
        {(data: { test: string } | null) => <div>Data: {data?.test}</div>}
      </SiteHealthTemplate>
    );

    await waitFor(() => {
      expect(screen.getByText('Data: data')).toBeInTheDocument();
    });

    expect(mockFetchData).toHaveBeenCalledTimes(1);
    expect(mockFetchData).toHaveBeenCalledWith('site1', true);

    // Change siteName
    rerender(
      <SiteHealthTemplate siteName="site2" fetchData={mockFetchData}>
        {(data: { test: string } | null) => <div>Data: {data?.test}</div>}
      </SiteHealthTemplate>
    );

    await waitFor(() => {
      expect(mockFetchData).toHaveBeenCalledTimes(2);
    });

    expect(mockFetchData).toHaveBeenCalledWith('site2', true);
  });

  it('does not fetch when siteName becomes empty', async () => {
    const mockFetchData = vi.fn().mockResolvedValue({ test: 'data' });

    const { rerender } = render(
      <SiteHealthTemplate siteName="site1" fetchData={mockFetchData}>
        {(data: { test: string } | null) => <div>Data: {data?.test}</div>}
      </SiteHealthTemplate>
    );

    await waitFor(() => {
      expect(screen.getByText('Data: data')).toBeInTheDocument();
    });

    // Change to empty siteName
    rerender(
      <SiteHealthTemplate siteName="" fetchData={mockFetchData}>
        {(data: { test: string } | null) => <div>Data: {data?.test}</div>}
      </SiteHealthTemplate>
    );

    expect(mockFetchData).toHaveBeenCalledTimes(1); // Should not call again
  });

  it('cleans up on unmount', async () => {
    const mockFetchData = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves

    const { unmount } = render(
      <SiteHealthTemplate siteName="test-site" fetchData={mockFetchData}>
        {() => <div>Test content</div>}
      </SiteHealthTemplate>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    unmount();

    // Component should be unmounted, no state updates should occur
  });
});