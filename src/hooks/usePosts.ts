import { useState, useEffect, useRef } from 'react';
import { PostService } from '../services/postService';
import type { Post, PostFilters } from '../types';

export function usePosts(filters?: PostFilters) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mountedRef = useRef(false);

    const fetchPosts = async () => {
        if (!mountedRef.current) return;

        setLoading(true);
        setError(null);

        try {
            const data = await PostService.getPosts(filters);
            if (mountedRef.current) setPosts(data);
        } catch (err) {
            if (mountedRef.current) { // Check if still mounted before setting state
                const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
                setError(errorMessage);
                console.error('Error fetching posts:', err);
            }
        } finally {
            if (mountedRef.current) setLoading(false);
        }
    };

    useEffect(() =>{
        mountedRef.current = true;
        fetchPosts();
        return () => {
            mountedRef.current = false;
        }
    }, [filters?.page, filters?.limit, filters?.search, filters?.sort, filters?.order]);

    return { posts, loading, error, refetch: fetchPosts };
}