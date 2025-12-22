# Project Localhost Ports

This document lists the localhost ports used by various projects in the Pixelated Technologies workspace for development servers.

## Next.js Projects

| Project | Port | URL |
|---------|------|-----|
| brianwhaley | 3000 | http://localhost:3000 |
| informationfocus | 3001 | http://localhost:3001 |
| leadscraper | 3002 | http://localhost:3002 |
| oaktreelandscaping | 3007 | http://localhost:3007 |
| palmetto-epoxy | 3003 | http://localhost:3003 |
| pixelated | 3004 | http://localhost:3004 |
| pixelated-admin | 3006 | http://localhost:3006 |
| pixelated-template | 3008 | http://localhost:3008 |
| pixelvivid | 3005 | http://localhost:3005 |

## Component Library

| Project | Port | URL |
|---------|------|-----|
| pixelated-components (Storybook) | 6006 | http://localhost:6006 |

## Projects Without Dev Ports

The following projects do not have development servers configured:

- **pixelated-blog-wp-theme**: WordPress theme (no Node.js dev server)

## Notes

- All Next.js projects use HTTPS in development mode (`--experimental-https`)
- Ports are configured in the `dev` script of each project's `package.json`
- pixelated-blog-wp-theme is a WordPress theme and does not have a development server in this workspace</content>
<parameter name="filePath">/Users/btwhaley/Git/pixelated-components/docs/projects-ports.md