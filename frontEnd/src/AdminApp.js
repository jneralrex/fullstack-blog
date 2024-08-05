import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import AdminLogin from './Admin/AdminLogin';
import AdminProtectedRoute from './Admin/AdminProtectedRoute';
import AdminControl from './Admin/AdminControl';
import AdminDefaultPage from './Admin/AdminDefaultPage';
import AdminSignUp from './Admin/AdminSignUp';
import AdminOverView from './Admin/AdminOverView';
import AllUserTable from './Admin/AllUserTable';
import AdminPost from './Admin/AdminPost';
import AllPostCard from './Admin/AllPostCard';
import AdminGlobalDataProvider from './Admin/AdminGlobalDataProvider';
import AdminSingleFeed, { AdminSingleFeedLoader } from './Admin/AdminSingleFeed';

const adminRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/admin" element={<AdminDefaultPage />}>
            <Route index element={ <AdminSignUp /> } />
            <Route path='/admin/login' element={ <AdminLogin /> } />
            <Route path="/admin/control-panel"
                element={
                    <AdminProtectedRoute>
                        <AdminControl />
                    </AdminProtectedRoute>
                }
            >
                <Route path='/admin/control-panel/over-view'
                    element={
                        <AdminProtectedRoute>
                            <AdminOverView />
                        </AdminProtectedRoute>

                    }
                />

                <Route path='/admin/control-panel/user-table'
                    element={
                        <AdminProtectedRoute>
                            <AllUserTable />
                        </AdminProtectedRoute>
                    }
                />

                <Route path='/admin/control-panel/create-post'
                    element={
                        <AdminProtectedRoute>
                            <AdminPost />
                        </AdminProtectedRoute>
                    }
                />

                <Route path='/admin/control-panel/all-posts'
                    element={
                        <AdminProtectedRoute>
                            <AllPostCard />
                        </AdminProtectedRoute>
                    }
                />

                <Route path='/admin/control-panel/:id'
                    element={
                        <AdminProtectedRoute>
                            <AdminSingleFeed />
                        </AdminProtectedRoute>
                    }
                    loader={AdminSingleFeedLoader}
                />
            </Route>
        </Route>
    )
);

function AdminApp() {
    return (
        <AdminGlobalDataProvider>
            <RouterProvider router={adminRouter} />
        </AdminGlobalDataProvider>
    );
}

export default AdminApp;
