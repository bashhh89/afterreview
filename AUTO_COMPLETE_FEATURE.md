# Auto-Complete Assessment Feature

## Overview
The Auto-Complete Assessment feature allows for rapid, AI-driven completion of the scorecard questionnaire. This feature is invaluable for development and end-to-end testing but should not be visible or accessible in production environments.

## Configuration

### Environment Variable
The visibility and functionality of this feature is controlled by an environment variable:

```
NEXT_PUBLIC_ENABLE_AUTO_COMPLETE=true|false
```

- When set to `true`: The auto-complete feature will be visible and functional.
- When not set or set to `false`: The auto-complete feature will be completely hidden and disabled.

### Default Behavior
- In development environments (`process.env.NODE_ENV === 'development'`): The auto-complete feature is enabled by default.
- In production environments (`process.env.NODE_ENV === 'production'`): The auto-complete feature is disabled by default.

### How to Enable for Development/Testing
To enable this feature in any environment, add the following to your `.env.local` file:

```
NEXT_PUBLIC_ENABLE_AUTO_COMPLETE=true
```

### How to Ensure it's Disabled in Production
For production deployments, either:
1. Do not set this environment variable, or
2. Explicitly set it to `false`:

```
NEXT_PUBLIC_ENABLE_AUTO_COMPLETE=false
```

## Implementation Details
The feature is conditionally rendered and functionality is controlled based on the following logic:

```javascript
// Check specific environment variable first
if (typeof process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE === 'string') {
  return process.env.NEXT_PUBLIC_ENABLE_AUTO_COMPLETE.toLowerCase() === 'true';
}
  
// Fallback to development environment check
return process.env.NODE_ENV === 'development';
```

This ensures that even if the code containing the auto-complete functionality is deployed to production, it will not be visible or accessible to users unless explicitly enabled. 