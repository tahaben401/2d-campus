# CampusView - University Campus Management System

CampusView is a modern, interactive web application designed to manage university campus resources, specifically focusing on housing and building analytics. It features a 2D interactive map, real-time statistics, and an AI-powered assistant.

## Features

- **Interactive Campus Map**: Visualize buildings and their status (occupancy, maintenance, etc.) on a 2D map.
- **Housing Management**: Manage rooms, floors, and buildings with ease.
- **Real-Time Statistics**: Dashboard providing insights into occupancy rates, maintenance requests, and more.
- **AI Chatbot Assistant**: An intelligent chatbot to answer queries about room availability, building status, and general campus information.
- **Secure Authentication**: Robust Login and Signup system with secure session management.
- **Dark Mode**: Fully supported dark/light theme for comfortable viewing.
- **Responsive Design**: Optimized for both desktop and tablet experiences.

## Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v7)
- **State Management**: React Hooks (Context API for Theme)
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Notifications**: Sonner

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 2d-campus
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Backend Setup**
   Ensure the backend API is running on `http://localhost:3000` (Auth) and `http://localhost:8001` (Chatbot) for full functionality.

## Project Structure

- `src/components`: Reusable UI components (Sidebar, Header, CampusMapView, Chatbot, etc.).
- `src/pages`: Main pages (Login, Signup).
- `src/context`: React Context providers (ThemeContext).
- `src/data`: Mock data for development and testing.
- `src/assets`: Static assets.

## Contributing

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---
**Note**: This project is intended for educational purposes as part of a university project.
