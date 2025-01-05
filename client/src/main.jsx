import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/root'
import ErrorPage from './error-page'
import Login, {action as loginAction} from './routes/login'
import Tweets, {action as sendTweetAction, loader as tweetLoader} from './routes/tweets'
import {loader as initialTweetLoader} from './loaders/initialTweetsLoader'
import AdminRoot from './routes/admin/adminRoot'
import EditUser, {action as edituserAction, loader as editUserLoader} from './routes/admin/users/editUser'
import CreateResidence from './routes/admin/listings/residence/createResidence'
import ResidenceStep1 from './routes/admin/listings/residence/step1'
import ResidenceStep2 from './routes/admin/listings/residence/step2'
import ResidenceStep3 from './routes/admin/listings/residence/step3'
import ResidenceStep4, {action as createResidenceAction} from './routes/admin/listings/residence/step4'
import { action as logoutAction } from './routes/logout'
import { loader as singleListingLoader } from './loaders/singleListingLoader'
import { loader as singleLandLoader } from './loaders/singleLandLoader'
import { loader as singleProjectLoader } from './loaders/singleProjectLoader'
import { loader as listingFilterLoader } from './loaders/listingFilterLoader'
import { loader as homeSearchLoader } from './loaders/homeSearchLoader'
import { loader as allLandLoader } from './loaders/allLandLoader'
import { loader as allProjectLoader } from './loaders/allProjectLoader'
import { loader as landFilterLoader } from './loaders/landFilterLoader'
import { loader as projectFilterLoader } from './loaders/projectFilterLoader'
import {loader as allListingsLoader} from './loaders/allListingLoader'
import SingleListing from './routes/listings/singleListing'
import ListingList from './routes/listings/listingList'
import EditResidence, {loader as editResidenceLoader} from './routes/admin/listings/residence/edit/editResidence'
import ResidenceEditStep1 from './routes/admin/listings/residence/edit/step1'
import ResidenceEditStep2 from './routes/admin/listings/residence/edit/step2'
import ResidenceEditStep3 from './routes/admin/listings/residence/edit/step3'
import {action as deleteListingAction} from './routes/admin/listings/delete'
import ResidenceEditStep4, {
  action as editResidenceAction,
} from './routes/admin/listings/residence/edit/step4'
import Home from './routes/home'
import ListingIndex from './routes/listings/listingIndex'
import ListingFilter from './routes/listings/listingFilter'
import HomeSearchListing from './routes/listings/homeSearchListing'
import CreateLand, {action as createLandAction} from './routes/admin/land/createLand'
import CreateProject, {action as createProjectsAction} from './routes/admin/projects/createProject'
import LandRoot from './routes/land/landRoot'
import LandIndex from './routes/land/landIndex'
import EditLand, { action as editLandAction, loader as editLandLoader } from './routes/admin/land/editLand'
import {action as deleteLandAction} from './routes/admin/land/deleteLand'
import {action as deleteProjectAction} from './routes/admin/projects/deleteProject'
import LandFilter from './routes/land/landFilter'
import SingleLand from './routes/land/singleLand'
import ProjectRoot from './routes/project/projectRoot'
import ProjectIndex from './routes/project/projectIndex'
import EditProject, {
  action as editProjectAction,
  loader as editProjectLoader,
} from './routes/admin/projects/editProject'
import ProjectFilter from './routes/project/projectFilter'
import SingleProject from './routes/project/singleProject'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/land',
        element: <LandRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <LandIndex />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/land/filter',
            element: <LandFilter />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/land/single/:id',
        element: <SingleLand />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/project/single/:id",
        element: <SingleProject />,
        errorElement: <ErrorPage/>
      },
      {
        path: '/project',
        element: <ProjectRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ProjectIndex />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/project/filter",
            element: <ProjectFilter />,
            errorElement: <ErrorPage/>
          }
        ],
      },
      {
        path: '/listings',
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/listings/single/:id',
            element: <SingleListing />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/listings/delete/:id',
            action: deleteListingAction,
          },
          {
            path: '/listings/list',
            element: <ListingList />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: '/listings/list/:type',
                element: <ListingIndex />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/listings/list/filter',
                element: <ListingFilter />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/listings/list/homeSearch',
                element: <HomeSearchListing />,
                errorElement: <ErrorPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/loaders',
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/loaders/allLandLoader',
            loader: allLandLoader,
          },
          {
            path: '/loaders/allProjectLoader',
            loader: allProjectLoader,
          },
          {
            path: '/loaders/landFilterLoader',
            loader: landFilterLoader,
          },
          {
            path: '/loaders/projectFilterLoader',
            loader: projectFilterLoader,
          },
          {
            path: '/loaders/singleLandLoader/:id',
            loader: singleLandLoader,
          },
          {
            path: '/loaders/singleProjectLoader/:id',
            loader: singleProjectLoader,
          },
          {
            path: '/loaders/initialtweets',
            loader: initialTweetLoader,
          },
          {
            path: '/loaders/listingFilterLoader',
            loader: listingFilterLoader,
          },
          {
            path: '/loaders/homeSearchLoader',
            loader: homeSearchLoader,
          },
          {
            path: '/loaders/allListingLoader',
            loader: allListingsLoader,
          },
          {
            path: '/loaders/singleListingLoader/:id',
            loader: singleListingLoader,
          },
        ],
      },

      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
        action: loginAction,
      },
      {
        path: '/logout',
        action: logoutAction,
      },

      {
        path: '/admin',
        element: <AdminRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/admin/land/create',
            element: <CreateLand />,
            errorElement: <ErrorPage />,
            action: createLandAction,
          },
          {
            path: '/admin/land/edit/:id',
            element: <EditLand />,
            action: editLandAction,
            loader: editLandLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/land/delete/:id',
            action: deleteLandAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/projects/create',
            element: <CreateProject/>,
            errorElement: <ErrorPage />,
            action: createProjectsAction,
          },
          {
            path: '/admin/projects/edit/:id',
            element: <EditProject/>,
            action: editProjectAction,
            loader: editProjectLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "/admin/projects/delete/:id",
            action: deleteProjectAction,
            errorElement: <ErrorPage/>
          },
          {
            path: '/admin/profile/:id',
            element: <EditUser />,
            errorElement: <ErrorPage />,
            action: edituserAction,
            loader: editUserLoader,
          },
          {
            path: '/admin/listing/edit/:id',
            element: <EditResidence />,
            loader: editResidenceLoader,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <ResidenceEditStep1 />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/listing/edit/:id/2',
                element: <ResidenceEditStep2 />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/listing/edit/:id/3',
                element: <ResidenceEditStep3 />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/listing/edit/:id/4',
                element: <ResidenceEditStep4 />,
                errorElement: <ErrorPage />,
                action: editResidenceAction,
              },
            ],
          },
          {
            path: '/admin/listing/residence',
            element: <CreateResidence />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <ResidenceStep1 />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/listing/residence/2',
                element: <ResidenceStep2 />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/listing/residence/3',
                element: <ResidenceStep3 />,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/listing/residence/4',
                element: <ResidenceStep4 />,
                errorElement: <ErrorPage />,
                action: createResidenceAction,
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: '/tweets',
    element: <Tweets />,
    errorElement: <ErrorPage />,
    action: sendTweetAction,
    loader: tweetLoader,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
