import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const { state, updateBlogPost } = useContext(Context);

  const blogPostId = navigation.getParam("id");
  const blogPost = state.find((blogPost) => blogPost.id === blogPostId);

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        updateBlogPost(blogPostId, title, content, () => navigation.pop());
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
