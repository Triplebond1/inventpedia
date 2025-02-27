// export const getPostVersions = async (req: AuthRequest, res: Response) => {
//     const { postId } = req.params;
  
//     try {
//       const post = await Post.findById(postId).select('versions');
//       if (!post) {
//         return res.status(404).json({ message: 'Post not found' });
//       }
  
//       return res.status(200).json(post.versions);
//     } catch (error) {
//       console.error('Error fetching post versions:', error);
//       return res.status(500).json({ message: 'Error fetching post versions', error });
//     }
//   };
  