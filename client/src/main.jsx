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
import { loader as listingFilterLoader } from './loaders/listingFilterLoader'
import { loader as homeSearchLoader } from './loaders/homeSearchLoader'
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
        errorElement:<ErrorPage/>
    },
      {
        path: '/listings',
        children: [
          {
            path: '/listings/single/:id',
            element: <SingleListing />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/listings/delete/:id',
            action: deleteListingAction
          },
          {
            path: '/listings/list',
            element: <ListingList />,
            errorElement: <ErrorPage />,
            children: [{
              path: "/listings/list/:type",
              element: <ListingIndex />,
              errorElement:<ErrorPage/>
            },
              {
                path: "/listings/list/filter",
                element: <ListingFilter />,
                errorElement: <ErrorPage/>
              }, {
                path: "/listings/list/homeSearch",
                element: <HomeSearchListing />,
                errorElement: <ErrorPage/>
            }]
          },
        ],
      },
      {
        path: '/loaders',
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/loaders/initialtweets',
            loader: initialTweetLoader,
          },
          {
            path: "/loaders/listingFilterLoader",
            loader: listingFilterLoader
          },
          {
            path: "/loaders/homeSearchLoader",
            loader: homeSearchLoader
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
            path: "/admin/land/create",
            element: <CreateLand />,
            errorElement: <ErrorPage />,
            action: createLandAction
        },
          {
            path: "/admin/projects/create",
            element: <CreateProject/>,
            errorElement: <ErrorPage />,
            action: createProjectsAction
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
