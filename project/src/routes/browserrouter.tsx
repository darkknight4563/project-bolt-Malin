import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import App from '../App';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Features from '../pages/Features';
import ContentLibrary from '../pages/ContentLibrary';
import Community from '../pages/Community';
import Privacy from '../pages/Privacy';
import MoodTracker from '../pages/MoodTracker';
import GetStarted from '../pages/GetStarted';
import LearnMore from '../pages/LearnMore';
import WellnessPlan from '../pages/WellnessPlan';
import Login from '../pages/admin/Login';
import AdminLayout from '../components/admin/AdminLayout';
import Posts from '../pages/admin/Posts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>
  },
  {
    path: '/blog',
    element: <Layout><Blog /></Layout>
  },
  {
    path: '/blog/:slug',
    element: <Layout><BlogPost /></Layout>
  },
  {
    path: '/features',
    element: <Layout><Features /></Layout>
  },
  {
    path: '/content-library',
    element: <Layout><ContentLibrary /></Layout>
  },
  {
    path: '/community',
    element: <Layout><Community /></Layout>
  },
  {
    path: '/privacy',
    element: <Layout><Privacy /></Layout>
  },
  {
    path: '/mood-tracker',
    element: <Layout><MoodTracker /></Layout>
  },
  {
    path: '/get-started',
    element: <Layout><GetStarted /></Layout>
  },
  {
    path: '/learn-more',
    element: <Layout><LearnMore /></Layout>
  },
  {
    path: '/wellness-plan',
    element: <Layout><WellnessPlan /></Layout>
  },
  {
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: <AdminLayout><Posts /></AdminLayout>
  },
  {
    path: '/admin/posts',
    element: <AdminLayout><Posts /></AdminLayout>
  }
]);