import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Detail from './routes/Detail'
import Favorites from './routes/Favorites'
import Home from './routes/Home'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <ErrorBoundary><Home /></ErrorBoundary>,
      },
      {
        path: '/oeuvre/:objectID',
        element: <ErrorBoundary><Detail /></ErrorBoundary>,
      },
      {
        path: '/favoris',
        element: <ErrorBoundary><Favorites /></ErrorBoundary>,
      },
    ],
  },
])

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
