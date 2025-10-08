# HappyJobs Admin Dashboard - Development Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx     # Navigation sidebar
│   ├── Navbar.jsx      # Top navigation bar
│   ├── StatCard.jsx    # Statistics cards
│   ├── Chart.jsx       # Chart components
│   ├── DataTable.jsx   # Data table component
│   └── RecentActivity.jsx # Activity feed component
├── contexts/           # React contexts
│   └── ThemeContext.jsx # Theme management
├── pages/              # Page components
│   ├── Dashboard.jsx   # Overview dashboard
│   ├── Jobseekers.jsx  # Jobseekers management
│   ├── Companies.jsx   # Companies management
│   ├── Jobs.jsx        # Jobs management
│   ├── Applications.jsx # Applications management
│   └── Settings.jsx   # Settings page
├── services/           # API services
│   └── api.js          # API client
└── App.jsx             # Main app component
```

## API Integration

### Backend Setup
Make sure your backend server is running on `http://localhost:3000` with the admin routes enabled.

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=HappyJobs Admin
VITE_DEV_MODE=true
```

### Using the API Service

```javascript
import apiService from '../services/api';

// Fetch dashboard stats
const stats = await apiService.getDashboardStats();

// Fetch jobseekers with pagination
const jobseekers = await apiService.getJobseekers({
  page: 1,
  limit: 10,
  search: 'john'
});

// Update application status
await apiService.updateApplicationStatus('app123', 'accepted');
```

## Customization

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route to `App.jsx`:
   ```jsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation item to `Sidebar.jsx`:
   ```jsx
   { name: 'New Page', href: '/new-page', icon: NewIcon }
   ```

### Customizing Colors

Update `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0EA5A4', // Your primary color
        // ... other shades
      }
    }
  }
}
```

### Adding New Components

Create reusable components in `src/components/` following the existing patterns:

```jsx
// Example: CustomButton.jsx
import React from 'react';

const CustomButton = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
```

## Development Tips

### Hot Reload
The development server supports hot reload. Changes to components will automatically update in the browser.

### Debugging
- Use React Developer Tools browser extension
- Check browser console for errors
- Use `console.log` for debugging API calls

### Styling
- Use Tailwind CSS classes for styling
- Follow the existing component patterns
- Use the design system colors defined in `tailwind.config.js`

### State Management
- Use React Context for global state (theme, user preferences)
- Use local state for component-specific data
- Consider using React Query for server state management

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing

## Troubleshooting

### Common Issues

1. **PostCSS Error**: Make sure `@tailwindcss/postcss` is installed
2. **API Connection**: Check that the backend server is running
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Getting Help

- Check the browser console for errors
- Review the README.md for detailed documentation
- Check the component structure for reference
