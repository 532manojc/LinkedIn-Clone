"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { ThumbsUp, MessageSquare, Share2, Image, Video, X } from "react-feather"
import postsData from "../data/posts.json"
import userData from "../data/users.json"

function Home() {
  const [posts, setPosts] = useState([])
  const [newPostText, setNewPostText] = useState("")
  const [suggestedConnections, setSuggestedConnections] = useState([])
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState({})

  // Use useCallback to prevent infinite re-renders
  // const loadData = useCallback(() => {
  //   // Load posts from JSON
  //   const postsWithLikes = postsData.map((post) => {
  //     // Get liked status from localStorage
  //     const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {}
  //     return {
  //       ...post,
  //       isLiked: likedPosts[post.id] ? true : false,
  //       likes: likedPosts[post.id] ? post.likes + 1 : post.likes,
  //     }
  //   })

  //   setPosts(postsWithLikes)

  //   // Get suggested connections (first 3 users)
  //   setSuggestedConnections(userData.slice(0, 3))

  //   // Load comments from localStorage
  //   const savedComments = JSON.parse(localStorage.getItem("comments")) || {}
  //   setComments(savedComments)
  // }, [])
  const loadData = useCallback(() => {
    // Load posts from localStorage if available
    let storedPosts = JSON.parse(localStorage.getItem("posts"));
  
    if (!storedPosts) {
      storedPosts = postsData.map((post) => {
        const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
        return {
          ...post,
          isLiked: likedPosts[post.id] ? true : false,
          likes: likedPosts[post.id] ? post.likes + 1 : post.likes,
        };
      });
      localStorage.setItem("posts", JSON.stringify(storedPosts)); // Store initial posts
    }
  
    setPosts(storedPosts);
  
    // Get suggested connections
    setSuggestedConnections(userData.slice(0, 3));
  
    // Load comments from localStorage
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setComments(savedComments);
  }, []);
  

  useEffect(() => {
    loadData()
  }, [loadData])

  // const handleLike = (postId) => {
  //   // Update posts state
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) =>
  //       post.id === postId
  //         ? {
  //             ...post,
  //             isLiked: !post.isLiked,
  //             likes: post.isLiked ? post.likes - 1 : post.likes + 1,
  //           }
  //         : post,
  //     ),
  //   )

  //   // Update localStorage
  //   const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {}

  //   if (likedPosts[postId]) {
  //     delete likedPosts[postId]
  //   } else {
  //     likedPosts[postId] = true
  //   }

  //   localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
  // }
  const handleLike = (postId) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      );
  
      // Save updated posts to localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  
    // Update localStorage for liked posts separately
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    if (likedPosts[postId]) {
      delete likedPosts[postId];
    } else {
      likedPosts[postId] = true;
    }
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  };
  

  const handleComment = (post) => {
    setSelectedPost(post)
    setShowCommentModal(true)
  }

  const handleCloseCommentModal = () => {
    setShowCommentModal(false)
    setSelectedPost(null)
    setCommentText("")
  }

  // const handleAddComment = (e) => {
  //   e.preventDefault()

  //   if (!commentText.trim() || !selectedPost) return

  //   // Create a new comment
  //   const newComment = {
  //     id: Date.now().toString(),
  //     userId: "johndoe",
  //     userName: "John Doe",
  //     userImage: "/images/3job.png",
  //     text: commentText,
  //     timestamp: "Just now",
  //   }

  //   // Update comments state
  //   const updatedComments = { ...comments }
  //   if (!updatedComments[selectedPost.id]) {
  //     updatedComments[selectedPost.id] = []
  //   }
  //   updatedComments[selectedPost.id].push(newComment)
  //   setComments(updatedComments)

  //   // Update localStorage
  //   localStorage.setItem("comments", JSON.stringify(updatedComments))

  //   // Update post comment count
  //   setPosts((prevPosts) =>
  //     prevPosts.map((post) => (post.id === selectedPost.id ? { ...post, comments: post.comments + 1 } : post)),
  //   )

  //   // Clear input
  //   setCommentText("")
  // }
  const handleAddComment = (e) => {
    e.preventDefault();
  
    if (!commentText.trim() || !selectedPost) return;
  
    // Create a new comment
    const newComment = {
      id: Date.now().toString(),
      userId: "johndoe",
      userName: "John Doe",
      userImage: "/images/3job.png",
      text: commentText,
      timestamp: "Just now",
    };
  
    // Update comments state
    const updatedComments = { ...comments };
    if (!updatedComments[selectedPost.id]) {
      updatedComments[selectedPost.id] = [];
    }
    updatedComments[selectedPost.id].push(newComment);
    setComments(updatedComments);
  
    // Update localStorage for comments
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  
    // Update post comment count and save posts in localStorage
    const updatedPosts = posts.map((post) =>
      post.id === selectedPost.id ? { ...post, comments: post.comments + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Store updated posts
  
    // Clear input
    setCommentText("");
  };
  

  const handleShare = (postId) => {
    // For simplicity, just show an alert
    alert("Share functionality would open a modal here")
  }

  const handleNewPost = (e) => {
    e.preventDefault()

    if (!newPostText.trim()) return

    // Create a new post
    const newPost = {
      id: Date.now().toString(),
      userId: "johndoe",
      userName: "John Doe",
      userImage: "/images/3job.png",
      content: newPostText,
      image: null,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: "Just now",
    }

    // Add to posts
    setPosts([newPost, ...posts])

    // Save to localStorage for profile page
    const userPosts = JSON.parse(localStorage.getItem("userPosts")) || []
    userPosts.unshift(newPost)
    localStorage.setItem("userPosts", JSON.stringify(userPosts))

    // Clear input
    setNewPostText("")
  }

  const handleConnect = (userId) => {
    // Add to connections
    const connections = JSON.parse(localStorage.getItem("connections")) || []
    if (!connections.includes(userId)) {
      connections.push(userId)
      localStorage.setItem("connections", JSON.stringify(connections))

      // Remove from suggested connections
      setSuggestedConnections((prev) => prev.filter((user) => user.id !== userId))
    }
  }

  return (
    <div className="container" style={{ marginTop: "80px", paddingBottom: "30px" }}>
      <div className="row">
        {/* Left sidebar - Profile summary */}
        <div className="col-lg-3 d-none d-lg-block">
          <div className="profile-card">
            <div className="profile-banner"></div>
            <div className="profile-info">
              <img
                src="/images/3job.png"
                alt="Profile"
                className="profile-avatar"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "/placeholder.svg?height=80&width=80"
                }}
              />
              <h5 className="mt-2 mb-1">John Doe</h5>
              <p className="text-muted small mb-2">Software Engineer at Tech Company</p>

              <div className="border-top border-bottom py-3 my-3">
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Who viewed your profile</span>
                  <span className="text-primary fw-bold">38</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted small">Views of your post</span>
                  <span className="text-primary fw-bold">142</span>
                </div>
              </div>

              <div className="text-start">
                <p className="small mb-1">Access exclusive tools & insights</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content - Posts */}
        <div className="col-lg-6 col-md-8 col-sm-12">
          {/* Create post card */}
          <div className="post-card p-3 mb-3 x">
            <form onSubmit={handleNewPost}>
              <div className="d-flex mb-3">
                <img
                  src="/images/3job.png"
                  alt="Profile"
                  className="profile-img me-2"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=50&width=50"
                  }}
                />
                <input
                  type="text"
                  className="form-control post-input"
                  placeholder="Start a post"
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                />
              </div>

              <div className="post-actions">
                <div className="post-action">
                  <Image size={18} color="#70b5f9" />
                  <span>Photo</span>
                </div>
                <div className="post-action">
                  <Video size={18} color="#7fc15e" />
                  <span>Video</span>
                </div>
                <div className="post-action">
                  <button type="submit" className="btn btn-primary px-4">
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div className="post-card p-3 mb-3" key={post.id}>
              <div className="d-flex align-items-center mb-3">
                <img
                  src={post.userImage || "/placeholder.svg"}
                  alt={post.userName}
                  className="profile-img me-2"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=50&width=50"
                  }}
                />
                <div>
                  <Link to={`/profile/${post.userId}`} className="text-decoration-none">
                    <h6 className="mb-0">{post.userName}</h6>
                  </Link>
                  <small className="text-muted">{post.timestamp}</small>
                </div>
              </div>

              <p>{post.content}</p>

              {post.image && (
                <div className="text-center mb-3">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post"
                    className="post-image"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.style.display = "none"
                    }}
                  />
                </div>
              )}

              <div className="d-flex justify-content-between border-top pt-3 mt-3">
                <button className="btn btn-sm btn-link text-decoration-none" onClick={() => handleLike(post.id)}>
                  <ThumbsUp size={16} className={post.isLiked ? "text-primary" : "text-muted"} />
                  <span className={post.isLiked ? "text-primary" : "text-muted"}> {post.likes}</span>
                </button>

                <button
                  className="btn btn-sm btn-link text-decoration-none text-muted"
                  onClick={() => handleComment(post)}
                >
                  <MessageSquare size={16} className="me-1" />
                  {post.comments}
                </button>

                <button
                  className="btn btn-sm btn-link text-decoration-none text-muted"
                  onClick={() => handleShare(post.id)}
                >
                  <Share2 size={16} className="me-1" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right sidebar - Suggested connections */}
        <div className="col-lg-3 col-md-4 d-none d-md-block">
          <div className="feed-card x">
            <h6 className="feed-title">Add to your feed</h6>

            {suggestedConnections.map((user) => (
              <div className="feed-item" key={user.id}>
                <img
                  src={user.profileImage || "/placeholder.svg"}
                  alt={user.name}
                  className="feed-avatar"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "/placeholder.svg?height=48&width=48"
                  }}
                />
                <div className="feed-info">
                  <div className="feed-name">{user.name}</div>
                  <div className="feed-headline">{user.headline}</div>
                  <button className="connect-btn" onClick={() => handleConnect(user.id)}>
                    + Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && selectedPost && (
        <div className="comment-modal">
          <div className="comment-modal-content">
            <div className="comment-modal-header">
              <h5>Comments</h5>
              <button className="btn btn-sm btn-link text-decoration-none" onClick={handleCloseCommentModal}>
                <X size={20} />
              </button>
            </div>

            <div className="comment-modal-body">
              <div className="comment-list">
                {comments[selectedPost.id] && comments[selectedPost.id].length > 0 ? (
                  comments[selectedPost.id].map((comment) => (
                    <div className="comment-item" key={comment.id}>
                      <img
                        src={comment.userImage || "/placeholder.svg"}
                        alt={comment.userName}
                        className="comment-avatar"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=40&width=40"
                        }}
                      />
                      <div className="comment-content">
                        <div className="comment-name">{comment.userName}</div>
                        <div className="comment-text">{comment.text}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No comments yet. Be the first to comment!</p>
                )}
              </div>

              <form onSubmit={handleAddComment} className="comment-form">
                <input
                  type="text"
                  className="comment-input"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

