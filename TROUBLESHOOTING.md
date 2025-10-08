# HappyJobs Admin Dashboard - Troubleshooting Guide

## Common Issues and Solutions

### 1. PostCSS/Tailwind CSS Errors

#### Error: `Cannot apply unknown utility class 'border-border'`
**Solution**: Remove non-standard Tailwind classes and use proper utilities.

```css
/* ❌ Wrong */
@apply border-border;

/* ✅ Correct */
@apply border-gray-200 dark:border-gray-700;
```

#### Error: `tailwindcss directly as a PostCSS plugin`
**Solution**: Install the correct PostCSS plugin.

```bash
npm install @tailwindcss/postcss
```

Update `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### 2. Node.js Version Issues

#### Error: `Vite requires Node.js version 20.19+ or 22.12+`
**Solution**: Update Node.js or use a compatible version.

```bash
# Check current version
node --version

# Update Node.js (using nvm)
nvm install 22.12.0
nvm use 22.12.0
```

### 3. Development Server Issues

#### Server not starting
**Solution**: Clear cache and reinstall dependencies.

```bash
# Clear node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Start development server
npm run dev
```

#### Port already in use
**Solution**: Kill the process or use a different port.

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 5174
```

### 4. Build Issues

#### Build fails with CSS errors
**Solution**: Check for invalid Tailwind classes and fix them.

```bash
# Check for build errors
npm run build

# Fix any CSS issues in src/index.css
```

#### Missing dependencies
**Solution**: Install all required packages.

```bash
npm install tailwindcss postcss autoprefixer recharts lucide-react react-router-dom
```

### 5. API Connection Issues

#### Backend not responding
**Solution**: Ensure backend server is running.

```bash
# Start backend server
cd ../backend
npm run dev

# Check if API is accessible
curl http://localhost:3000/api/health
```

#### CORS errors
**Solution**: Update backend CORS configuration.

```javascript
// In backend/server.js
const allowedOrigins = [
  'http://localhost:5173', // Add admin dashboard URL
  'http://localhost:5174',
  // ... other origins
];
```

### 6. Styling Issues

#### Dark mode not working
**Solution**: Check theme context and CSS classes.

```jsx
// Ensure ThemeProvider wraps the app
<ThemeProvider>
  <App />
</ThemeProvider>
```

#### Colors not applying
**Solution**: Check Tailwind config and use proper color classes.

```javascript
// In tailwind.config.js
colors: {
  primary: {
    500: '#0EA5A4', // Ensure colors are defined
  }
}
```

### 7. Component Issues

#### Components not rendering
**Solution**: Check imports and component structure.

```jsx
// Ensure proper imports
import React from 'react';
import { Link } from 'react-router-dom';
```

#### Routing not working
**Solution**: Check route configuration.

```jsx
// In App.jsx
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/jobseekers" element={<Jobseekers />} />
  // ... other routes
</Routes>
```

## Debugging Tips

### 1. Check Browser Console
- Open Developer Tools (F12)
- Look for JavaScript errors
- Check Network tab for API failures

### 2. Check Terminal Output
- Look for build errors
- Check for missing dependencies
- Verify server startup messages

### 3. Verify File Structure
```
hj-admin/
├── src/
│   ├── components/
│   ├── pages/
│   ├── contexts/
│   └── services/
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

### 4. Test Individual Components
```jsx
// Test a simple component
const TestComponent = () => {
  return <div className="bg-primary-500 text-white p-4">Test</div>;
};
```

## Getting Help

### 1. Check Documentation
- Read README.md for setup instructions
- Check DEVELOPMENT.md for development guide
- Review component examples

### 2. Common Commands
```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for linting issues
npm run lint
```

### 3. Reset Everything
```bash
# Complete reset
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Still Having Issues?

1. **Check Node.js version**: Should be 20.19+ or 22.12+
2. **Verify all dependencies**: Run `npm install` to ensure all packages are installed
3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
4. **Check file permissions**: Ensure you have read/write access to the project directory
5. **Review error messages**: Look for specific error details in the terminal output

If problems persist, check the browser console for specific error messages and refer to the official documentation for React, Vite, and Tailwind CSS.




8618847716


on mobile number screen : 

contact support click should open to mail to "hello@techinium.com"


on personal details screen: 

logo
basic instead of personal
remove steps progress bar
full name => check for atleast 4 character
age replace with dob 
current city 



on job preferences => 


remove prefereed job roles and preferred compaines

on rest of the things make value selecteable as you were doing for prefereed job roles and preferred compaines and for "fuel preferences" it should be multi select. 


add one more section for preferred city and it should be multi select.




on education details : 


give the option to select education upto : 

class 5, Matircaulation, 10+2, Diploma, Graduate, post Graduate



on work experince => 

total years of expericnce => it should be a section to provide year and month with dropdown. 



so after personal details => edcutaion details => resume upload => job preference => docs upload and all



on personal details screen: 


date of birth should be a date picker, 