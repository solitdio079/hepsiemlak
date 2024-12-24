import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/root'
import ErrorPage from './error-page'
import Login, {action as loginAction} from './routes/login'
import Tweets, {action as sendTweetAction, loader as tweetLoader} from './routes/tweets'
import {loader as initialTweetLoader} from './routes/loaders/initialTweetsLoader'
import AdminRoot from './routes/admin/adminRoot'
import EditUser, {action as edituserAction, loader as editUserLoader} from './routes/admin/users/editUser'
import CreateResidence from './routes/admin/listings/residence/createResidence'
import ResidenceStep1 from './routes/admin/listings/residence/step1'
import ResidenceStep2 from './routes/admin/listings/residence/step2'
import ResidenceStep3 from './routes/admin/listings/residence/step3'
import ResidenceStep4, {action as createResidenceAction} from './routes/admin/listings/residence/step4'
import { action as logoutAction } from './routes/logout'
import { loader as singleListingLoader } from './loaders/singleListingLoader'
import {loader as allListingsLoader} from './loaders/allListingLoader'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/listings",
        children: [
          {
            path: "/listings/single/:id"
          }
        ]
    },
      {
        path: "/loaders",
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/loaders/allListingLoader",
            loader: allListingsLoader
        },
          {
          path: '/loaders/singleListingLoader/:id',
          loader: singleListingLoader

        }]
      
      },
    
      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
        action: loginAction,
      },
      {
        path: "/logout",
        action: logoutAction
      },
      {
        path: '/admin',
        element: <AdminRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/admin/profile/:id',
            element: <EditUser />,
            errorElement: <ErrorPage />,
            action: edituserAction,
            loader: editUserLoader,
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
                action: createResidenceAction
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/loaders',
    children: [
      {
        path: '/loaders/initialtweets',
        loader: initialTweetLoader,
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
