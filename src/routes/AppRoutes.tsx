import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProductList from '../pages/ProductList';
import UserListPage from '../pages/UserListPage';
import BackofficeLayout from '../layout/BackofficeLayout';
import ProductPage from '../pages/pim/ProductPage';
import CategoryPage from '../pages/pim/CategoryPage';
import PostPage from '../pages/pim/PostListPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import RequireAuth from '../components/RequireAuth';

const AppRoutes = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Route cha có layout */}
        <Route path="/" element={
          <RequireAuth>
            <BackofficeLayout />
          </RequireAuth>
        }>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="users" element={<UserListPage />} />
            <Route path="pim">
                <Route path="products" element={<ProductPage />} />
                <Route path="categories" element={<CategoryPage />} />
                <Route path="posts" element={<PostPage />} />
            </Route>
        </Route>
    </Routes>
);

export default AppRoutes;
