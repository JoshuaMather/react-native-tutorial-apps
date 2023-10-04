import React, { useContext } from 'react';
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation, route }) => {
    const id = route.params.id;
    const { state, editBlogPost } = useContext(Context);

    const blogPost = state.find((blogPost) => blogPost.id === id);

    return (
        <BlogPostForm
            initialValues={{ title: blogPost.title, content: blogPost.content }}
            onSubmit={(title, content) => {
                editBlogPost(id, title, content, () => navigation.pop());
            }}
        />
    );
};

export default EditScreen;
