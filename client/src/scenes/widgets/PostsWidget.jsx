import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  //const rows = useSelector((state) => state.rows); // get template rows

  // get all posts on the HomePage
  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // get posts of a user on their page
  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //console.log(posts[posts.length - 1].postRows);
  //console.log("POSTs:", posts);

  return (
    // <h1>Hello World!</h1>
    // <PostWidget
    //   key={posts[0]._id}
    //   postId={posts[0]._id}
    //   postUserId={posts[0].userId}
    //   name={`${posts[0].firstName} ${posts[0].lastName}`}
    //   description={posts[0].description}
    //   location={posts[0].location}
    //   picturePath={posts[0].picturePath}
    //   userPicturePath={posts[0].userPicturePath}
    //   likes={posts[0].likes}
    //   comments={posts[0].comments}
    //   isProfile={posts[0].isProfile}
    // />
    <>
      {posts.toReversed().map(
        ({
          _id, // there is some destructring going on in here to get the props of each post
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
          postRows,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
            postRows={postRows}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
