import express from 'express';
import multer from 'multer';

import post from "../models/PostSchema.js";

const router = express.Router();


export const getPosts = async (req, res) => {
  try {
    const posts = await post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
}

export const postPosts = async (req, res) => {
  try {
    const { title,  description } = req.body;
    const imageurl = req.file.path;
    const newPost = new post({
      title,
       description,
      imageurl
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message || error });
  }
}
