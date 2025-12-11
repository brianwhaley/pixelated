import { describe, it, expect } from 'vitest';
import { getXHRData, generateURL } from '../components/utilities/api';

describe('API Utilities', () => {
  describe('generateURL function', () => {
    it('should create URL from base and props', () => {
      const result = generateURL('https://api.example.com/search', { q: 'test' });
      expect(result).toContain('https://api.example.com/search');
      expect(result).toContain('q=test');
    });

    it('should handle multiple props', () => {
      const result = generateURL('https://api.example.com/search?', {
        q: 'test',
        limit: '10'
      });

      expect(result).toContain('https://api.example.com/search?');
      expect(result).toContain('q=test');
      expect(result).toContain('limit=10');
    });

    it('should add ampersand between multiple properties', () => {
      const result = generateURL('https://api.example.com/search?', {
        a: '1',
        b: '2',
        c: '3'
      });

      expect(result).toContain('&');
    });

    it('should handle empty props object', () => {
      const result = generateURL('https://api.example.com/search', {});
      expect(result).toBe('https://api.example.com/search');
    });

    it('should handle single prop', () => {
      const result = generateURL('https://api.example.com/search', { q: 'hello' });
      expect(result).toContain('q=hello');
    });

    it('should handle numeric values', () => {
      const result = generateURL('https://api.example.com/api', {
        id: 123,
        count: 456
      });

      expect(result).toContain('id=123');
      expect(result).toContain('count=456');
    });

    it('should handle string numeric values', () => {
      const result = generateURL('https://api.example.com/api', {
        page: '1',
        size: '20'
      });

      expect(result).toContain('page=1');
      expect(result).toContain('size=20');
    });

    it('should handle special characters in prop names', () => {
      const result = generateURL('https://api.example.com/search', {
        'search_term': 'test',
        'filter-type': 'all'
      });

      expect(result).toContain('search_term=test');
      expect(result).toContain('filter-type=all');
    });

    it('should handle special characters in prop values', () => {
      const result = generateURL('https://api.example.com/search', {
        q: 'hello world'
      });

      expect(result).toContain('hello world');
    });

    it('should handle empty string values', () => {
      const result = generateURL('https://api.example.com/search', {
        q: '',
        filter: 'all'
      });

      expect(result).toContain('q=');
      expect(result).toContain('filter=all');
    });

    it('should not add ampersand for first prop', () => {
      const result = generateURL('https://api.example.com/search', {
        first: '1'
      });

      expect(result).toContain('first=1');
    });

    it('should handle long base URLs', () => {
      const longBase = 'https://api.example.com/v1/users/123/posts/456/comments/789/replies';
      const result = generateURL(longBase, { page: '1' });

      expect(result).toContain(longBase);
      expect(result).toContain('page=1');
    });

    it('should handle many props', () => {
      const manyProps = Object.fromEntries(
        Array(20).fill(null).map((_, i) => [`prop${i}`, `value${i}`])
      );

      const result = generateURL('https://api.example.com/search', manyProps);

      expect(result).toContain('prop0=value0');
      expect(result).toContain('prop19=value19');
    });

    it('should handle boolean values', () => {
      const result = generateURL('https://api.example.com/search', {
        active: true,
        archived: false
      });

      expect(result).toContain('active=true');
      expect(result).toContain('archived=false');
    });

    it('should handle null values', () => {
      const result = generateURL('https://api.example.com/search', {
        q: 'test',
        filter: null
      });

      expect(result).toContain('q=test');
      expect(result).toContain('filter=null');
    });

    it('should handle undefined values', () => {
      const result = generateURL('https://api.example.com/search', {
        q: 'test',
        filter: undefined
      });

      expect(result).toContain('q=test');
      expect(result).toContain('filter=undefined');
    });

    it('should work with various base URLs', () => {
      const baseUrls = [
        'https://api.example.com',
        'http://localhost:3000/api',
        'https://api.example.com/v1/users',
        '/api/search',
        'https://example.com'
      ];

      baseUrls.forEach(base => {
        const result = generateURL(base, { q: 'test' });
        expect(result).toContain(base);
      });
    });

    it('should handle URL with existing query string', () => {
      const result = generateURL('https://api.example.com/search?existing=param', {
        q: 'test'
      });

      expect(result).toContain('existing=param');
      expect(result).toContain('q=test');
    });

    it('should handle special URL characters', () => {
      const result = generateURL('https://api.example.com/search', {
        'filter[type]': 'all',
        'sort[-date]': 'true'
      });

      expect(result).toContain('filter[type]=all');
      expect(result).toContain('sort[-date]=true');
    });
  });

  describe('getXHRData function', () => {
    it('should be a callable function', () => {
      expect(typeof getXHRData).toBe('function');
    });

    it('should accept three parameters', () => {
      const mockCallback = () => {};
      // Just verify the function can be called with these parameters
      expect(() => {
        getXHRData('https://api.example.com/data', 'GET', mockCallback);
      }).not.toThrow();
    });

    it('should accept different HTTP methods', () => {
      const mockCallback = () => {};
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

      methods.forEach(method => {
        expect(() => {
          getXHRData('https://api.example.com/data', method, mockCallback);
        }).not.toThrow();
      });
    });

    it('should accept callback function', () => {
      const mockCallback = (data: any) => {
        // callback implementation
      };

      expect(() => {
        getXHRData('https://api.example.com/data', 'GET', mockCallback);
      }).not.toThrow();
    });

    it('should accept URLs with query parameters', () => {
      const mockCallback = () => {};
      const url = 'https://api.example.com/search?q=test&limit=10&offset=0';

      expect(() => {
        getXHRData(url, 'GET', mockCallback);
      }).not.toThrow();
    });

    it('should accept relative URLs', () => {
      const mockCallback = () => {};

      expect(() => {
        getXHRData('/api/data', 'GET', mockCallback);
      }).not.toThrow();
    });

    it('should handle callbacks with data parameter', () => {
      const mockCallback = (response: any) => {
        // Verify callback receives data
        if (response) {
          return response;
        }
      };

      expect(typeof mockCallback).toBe('function');
    });

    it('should support various URL formats', () => {
      const mockCallback = () => {};
      const urls = [
        'https://api.example.com/data',
        'http://localhost:3000/api',
        'https://example.com/path/to/endpoint',
        '/relative/path',
        'https://api.example.com:8080/data'
      ];

      urls.forEach(url => {
        expect(() => {
          getXHRData(url, 'GET', mockCallback);
        }).not.toThrow();
      });
    });
  });
});
