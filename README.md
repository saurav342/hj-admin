# HappyJobs Admin Dashboard

A modern, responsive admin dashboard for managing the HappyJobs platform.

## Features

- **Dashboard Overview**: Real-time statistics and analytics
- **Jobseekers Management**: View and manage job seeker accounts
- **Companies Management**: Manage employer accounts and profiles
- **Jobs Management**: Monitor job postings and applications
- **Applications Management**: Track and update application statuses
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 3000

### Installation

1. Navigate to the admin directory:
   ```bash
   cd hj-admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the API URL in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` directory, ready for deployment to Netlify or any static hosting service.

## Deployment to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your Git repository and set build command to `npm run build`
   - Set publish directory to `dist`

3. Configure environment variables in Netlify:
   - Go to Site settings > Environment variables
   - Add `VITE_API_BASE_URL` with your production backend URL

## API Integration

The admin dashboard connects to the following backend endpoints:

- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/jobseekers` - List jobseekers with pagination
- `GET /api/admin/companies` - List companies with pagination
- `GET /api/admin/jobs` - List jobs with pagination
- `GET /api/admin/applications` - List applications with pagination
- `PATCH /api/admin/applications/:id/status` - Update application status
- `PATCH /api/admin/users/:id/toggle-status` - Toggle user active status

## Technologies Used

- React 19
- React Router DOM
- Tailwind CSS
- Lucide React (Icons)
- Recharts (Charts)
- Vite (Build tool)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DataTable.jsx   # Data table component
│   ├── StatCard.jsx    # Statistics card component
│   ├── Chart.jsx       # Chart component
│   ├── Sidebar.jsx     # Navigation sidebar
│   └── Navbar.jsx      # Top navigation bar
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Jobseekers.jsx  # Jobseekers management
│   ├── Companies.jsx   # Companies management
│   ├── Jobs.jsx        # Jobs management
│   └── Applications.jsx # Applications management
├── services/           # API service layer
│   └── api.js         # API client
└── contexts/          # React contexts
    └── ThemeContext.jsx # Theme management (optional)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the HappyJobs platform.# hj-admin
