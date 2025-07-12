import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ProductList from '../pages/ProductList';
import UserListPage from '../pages/UserListPage';
import BackofficeLayout from '../layout/BackofficeLayout';
import ProductPage from '../pages/pim/ProductPage';
import CategoryPage from '../pages/pim/CategoryPage';
import PostPage from '../pages/pim/PostListPage';

const AppRoutes = () => (
    <Routes>
        {/* Route cha có layout */}
        <Route path="/" element={<BackofficeLayout />}>
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
