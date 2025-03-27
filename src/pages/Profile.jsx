// "use client"

// import { useState, useEffect } from "react"
// import { useParams } from "react-router-dom"
// import { Edit2, ThumbsUp, MessageSquare, Share2, X } from "react-feather"
// import userData from "../data/users.json"
// import postsData from "../data/posts.json"

// function Profile() {
//   const { username } = useParams()
//   const [user, setUser] = useState(null)
//   const [userPosts, setUserPosts] = useState([])
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedBio, setEditedBio] = useState("")
//   const [editedHeadline, setEditedHeadline] = useState("")
//   const [suggestedConnections, setSuggestedConnections] = useState([])
//   const [connectionCount, setConnectionCount] = useState(0)
//   const [showCommentModal, setShowCommentModal] = useState(false)
//   const [selectedPost, setSelectedPost] = useState(null)
//   const [commentText, setCommentText] = useState("")
//   const [comments, setComments] = useState({})

//   useEffect(() => {   
//     // Find user by username
//     const foundUser = userData.find((u) => u.id === username) || userData[0]

//     // Get user from localStorage if exists
//     const localUser = JSON.parse(localStorage.getItem(`user_${foundUser.id}`))

//     if (localUser) {
//       setUser(localUser)
//       setEditedBio(localUser.bio || "")
//       setEditedHeadline(localUser.headline || "")
//     } else {
//       setUser(foundUser)
//       setEditedBio(foundUser.bio || "")
//       setEditedHeadline(foundUser.headline || "")
//     }

//     // Get connections count
//     const connections = JSON.parse(localStorage.getItem("connections")) || []
//     setConnectionCount(connections.length)

//     // Load comments from localStorage
//     const savedComments = JSON.parse(localStorage.getItem("comments")) || {}
//     setComments(savedComments)

//     // Filter posts by user
//     const filteredPosts = postsData.filter((post) => post.userId === foundUser.id)

//     // Get user posts from localStorage (for newly added posts)
//     const savedUserPosts = JSON.parse(localStorage.getItem("userPosts")) || []
//     const allUserPosts = [...savedUserPosts, ...filteredPosts]

//     // Remove duplicates
//     const uniquePosts = allUserPosts.filter((post, index, self) => index === self.findIndex((p) => p.id === post.id))

//     setUserPosts(uniquePosts)

//     // Get suggested connections (exclude current user)
//     setSuggestedConnections(userData.filter((u) => u.id !== foundUser.id).slice(0, 3))
//   }, [username])
//   // useEffect(() => {
//   //   const foundUser = userData.find((u) => u.id === username) || userData[0];
  
//   //   const localUser = JSON.parse(localStorage.getItem(`user_${foundUser.id}`));
//   //   setUser(localUser || foundUser);
//   //   setEditedBio((localUser || foundUser).bio || "");
//   //   setEditedHeadline((localUser || foundUser).headline || "");
  
//   //   const connections = JSON.parse(localStorage.getItem("connections")) || [];
//   //   setConnectionCount(connections.length);
  
//   //   const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
//   //   setComments(savedComments);
  
//   //   const savedUserPosts = JSON.parse(localStorage.getItem(`userPosts_${foundUser.id}`)) || [];
//   //   const filteredPosts = postsData.filter((post) => post.userId === foundUser.id);
//   //   const allUserPosts = [...savedUserPosts, ...filteredPosts];
  
//   //   const uniquePosts = allUserPosts.filter(
//   //     (post, index, self) => index === self.findIndex((p) => p.id === post.id)
//   //   );
  
//   //   setUserPosts(uniquePosts);
//   //   localStorage.setItem(`userPosts_${foundUser.id}`, JSON.stringify(uniquePosts));
  
//   //   setSuggestedConnections(userData.filter((u) => u.id !== foundUser.id).slice(0, 3));
//   // }, [username]);
  

//   const handleSaveProfile = () => {
//     const updatedUser = {
//       ...user,
//       bio: editedBio,
//       headline: editedHeadline,
//     }

//     setUser(updatedUser)
//     localStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser))
//     setIsEditing(false)
//   }

//   const handleLike = (postId) => {
//     // Update posts state
//     setUserPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               isLiked: !post.isLiked,
//               likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//             }
//           : post,
//       ),
//     )

//     // Update localStorage
//     const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {}

//     if (likedPosts[postId]) {
//       delete likedPosts[postId]
//     } else {
//       likedPosts[postId] = true
//     }

//     localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
//   }
//   // const handleLike = (postId) => {
//   //   setUserPosts((prevPosts) => {
//   //     const updatedPosts = prevPosts.map((post) =>
//   //       post.id === postId
//   //         ? {
//   //             ...post,
//   //             isLiked: !post.isLiked,
//   //             likes: post.isLiked ? post.likes - 1 : post.likes + 1,
//   //           }
//   //         : post
//   //     );
  
//   //     localStorage.setItem(`userPosts_${user.id}`, JSON.stringify(updatedPosts));
//   //     return updatedPosts;
//   //   });
//   // };
  

//   const handleComment = (post) => {
//     setSelectedPost(post)
//     setShowCommentModal(true)
//   }

//   const handleCloseCommentModal = () => {
//     setShowCommentModal(false)
//     setSelectedPost(null)
//     setCommentText("")
//   }

//   const handleAddComment = (e) => {
//     e.preventDefault()

//     if (!commentText.trim() || !selectedPost) return

//     // Create a new comment
//     const newComment = {
//       id: Date.now().toString(),
//       userId: "johndoe",
//       userName: "John Doe",
//       userImage: "/placeholder.svg?height=40&width=40",
//       text: commentText,
//       timestamp: "Just now",
//     }

//     // Update comments state
//     const updatedComments = { ...comments }
//     if (!updatedComments[selectedPost.id]) {
//       updatedComments[selectedPost.id] = []
//     }
//     updatedComments[selectedPost.id].push(newComment)
//     setComments(updatedComments)

//     // Update localStorage
//     localStorage.setItem("comments", JSON.stringify(updatedComments))

//     // Update post comment count
//     setUserPosts((prevPosts) =>
//       prevPosts.map((post) => (post.id === selectedPost.id ? { ...post, comments: post.comments + 1 } : post)),
//     )

//     // Clear input
//     setCommentText("")
//   }
//   // const handleAddComment = (e) => {
//   //   e.preventDefault();
//   //   if (!commentText.trim() || !selectedPost) return;
  
//   //   const newComment = {
//   //     id: Date.now().toString(),
//   //     userId: "johndoe",
//   //     userName: "John Doe",
//   //     userImage: "/placeholder.svg?height=40&width=40",
//   //     text: commentText,
//   //     timestamp: "Just now",
//   //   };
  
//   //   setComments((prevComments) => {
//   //     const updatedComments = { ...prevComments };
//   //     if (!updatedComments[selectedPost.id]) {
//   //       updatedComments[selectedPost.id] = [];
//   //     }
//   //     updatedComments[selectedPost.id].push(newComment);
  
//   //     localStorage.setItem("comments", JSON.stringify(updatedComments));
//   //     return updatedComments;
//   //   });
  
//   //   setUserPosts((prevPosts) => {
//   //     const updatedPosts = prevPosts.map((post) =>
//   //       post.id === selectedPost.id ? { ...post, comments: post.comments + 1 } : post
//   //     );
  
//   //     localStorage.setItem(`userPosts_${user.id}`, JSON.stringify(updatedPosts));
//   //     return updatedPosts;
//   //   });
  
//   //   setCommentText("");
//   // };
  

//   const handleShare = (postId) => {
//     // For simplicity, just show an alert
//     alert("Share functionality would open a modal here")
//   }

//   if (!user) {
//     return (
//       <div className="container mt-5 pt-5">
//         <p>Loading profile...</p>
//       </div>
//     )
//   }

//   return (
//     <div className="container" style={{ marginTop: "80px", paddingBottom: "30px" }}>
//       <div className="row">
//         {/* Main content - Profile */}
//         <div className="col-lg-9 col-md-8 newcard">
//           <div className="profile-header">
//             {/* <img src="src/images/profile.png?height=200&width=800" alt="Cover" className="profile-cover" /> */}

//             <div className="profile-details">
//               <div className="d-flex justify-content-between newcard">
//                 <img
//                   // src={user.profileImage || "src/images/profile.png?height=120&width=120"}
//                   src="/images/3job.png?height=120&width=120"
//                   alt={user.name}
//                   className="profile-pic-large"
//                 />
                

//                 {user.id === "johndoe" && (
//                   <button className="btn btn-outline-primary edit-button" onClick={() => setIsEditing(!isEditing)}>
//                     {/* <Edit2 size={20} className="me-1" /> */}
//                     {isEditing ? "Cancel" : "Edit Profile"}
//                   </button>
//                 )}
//               </div>

//               <div className="mt-3">
//                 {isEditing ? (
//                   <div className="mb-3">
//                     <input
//                       type="text"
//                       className="form-control mb-2"
//                       value={editedHeadline}
//                       onChange={(e) => setEditedHeadline(e.target.value)}
//                       placeholder="Headline"
//                     />
//                     <textarea
//                       className="form-control mb-2"
//                       value={editedBio}
//                       onChange={(e) => setEditedBio(e.target.value)}
//                       placeholder="Bio"
//                       rows="3"
//                     ></textarea>
//                     <button className="btn btn-primary" onClick={handleSaveProfile}>
//                       Save Changes
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     <h4>{user.name}</h4>
//                     <p>{user.headline}</p>
//                     <p>{user.location}</p>
//                     <p>{connectionCount} connections</p>

//                     {user.bio && (
//                       <div className="mt-3">
//                         <h5>About</h5>
//                         <p>{user.bio}</p>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="mt-4">
//             <h5>Posts</h5>

//             {userPosts.length === 0 ? (
//               <p>No posts yet.</p>
//             ) : (
//               userPosts.map((post) => (
//                 <div className="card mb-3" key={post.id}>
//                   <div className="card-body">
//                     <div className="d-flex align-items-center mb-3">
//                       <img
//                         src={user.profileImage || "/placeholder.svg?height=50&width=50"}
//                         alt={user.name}
//                         className="profile-img me-2"
//                       />
//                       <div>
//                         <h6 className="mb-0">{user.name}</h6>
//                         <small className="text-muted">{post.timestamp}</small>
//                       </div>
//                     </div>

//                     <p>{post.content}</p>

//                     {post.image && (
//                       <img src={"/images/18.jpg"} alt="Post" className="post-image mb-3" />
//                     )}

//                     <div className="d-flex justify-content-between border-top pt-3 mt-3">
//                       <button className="btn btn-sm btn-link text-decoration-none" onClick={() => handleLike(post.id)}>
//                         <ThumbsUp size={16} className={post.isLiked ? "text-primary" : "text-muted"} />
//                         <span className={post.isLiked ? "text-primary" : "text-muted"}> {post.likes}</span>
//                       </button>

//                       <button
//                         className="btn btn-sm btn-link text-decoration-none text-muted"
//                         onClick={() => handleComment(post)}
//                       >
//                         <MessageSquare size={16} className="me-1" />
//                         {post.comments}
//                       </button>

//                       <button
//                         className="btn btn-sm btn-link text-decoration-none text-muted"
//                         onClick={() => handleShare(post.id)}
//                       >
//                         <Share2 size={16} className="me-1" />
//                         Share
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Right sidebar - Suggested connections */}
//         <div className="col-lg-3 col-md-4">
//           <div className="card sidebar newcard">
//             <div className="card-body">
//               <h6 className="mb-3">People You May Know</h6>

//               {suggestedConnections.map((connection) => (
//                 <div className="d-flex align-items-center mb-3" key={connection.id}>
//                   <img
//                     src={connection.profileImage || "/placeholder.svg?height=50&width=50"}
//                     alt={connection.name}
//                     className="profile-img me-2"
//                   />
//                   <div>
//                     <h6 className="mb-0">{connection.name}</h6>
//                     <small className="text-muted">{connection.headline}</small>
//                     <div>
//                       <button className="btn btn-sm btn-outline-primary mt-1">Connect</button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Comment Modal */}
//       {showCommentModal && selectedPost && (
//         <div className="comment-modal">
//           <div className="comment-modal-content">
//             <div className="comment-modal-header">
//               <h5>Comments</h5>
//               <button className="btn btn-sm btn-link text-decoration-none" onClick={handleCloseCommentModal}>
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="comment-modal-body">
//               <div className="comment-list">
//                 {comments[selectedPost.id] && comments[selectedPost.id].length > 0 ? (
//                   comments[selectedPost.id].map((comment) => (
//                     <div className="comment-item" key={comment.id}>
//                       <img
//                         src={comment.userImage || "/placeholder.svg?height=40&width=40"}
//                         alt={comment.userName}
//                         className="comment-avatar"
//                       />
//                       <div className="comment-content">
//                         <div className="comment-name">{comment.userName}</div>
//                         <div className="comment-text">{comment.text}</div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-muted">No comments yet. Be the first to comment!</p>
//                 )}
//               </div>

//               <form onSubmit={handleAddComment} className="comment-form">
//                 <input
//                   type="text"
//                   className="comment-input"
//                   placeholder="Add a comment..."
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                 />
//                 <button type="submit" className="btn btn-primary">
//                   Post
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Profile

"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ThumbsUp, MessageSquare, Share2, X } from "react-feather"
import userData from "../data/users.json"
import postsData from "../data/posts.json"

function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [userPosts, setUserPosts] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editedBio, setEditedBio] = useState("")
  const [editedHeadline, setEditedHeadline] = useState("")
  const [suggestedConnections, setSuggestedConnections] = useState([])
  const [connectionCount, setConnectionCount] = useState(0)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState({})

  useEffect(() => {
    // Find user by username
    const foundUser = userData.find((u) => u.id === username) || userData[0]

    // Get user from localStorage if exists
    const localUser = JSON.parse(localStorage.getItem(`user_${foundUser.id}`))

    if (localUser) {
      setUser(localUser)
      setEditedBio(localUser.bio || "")
      setEditedHeadline(localUser.headline || "")
    } else {
      setUser(foundUser)
      setEditedBio(foundUser.bio || "")
      setEditedHeadline(foundUser.headline || "")
    }

    // Get connections count
    const connections = JSON.parse(localStorage.getItem("connections")) || []
    setConnectionCount(connections.length)

    // Load comments from localStorage
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {}
    setComments(savedComments)

    // Filter posts by user
    const filteredPosts = postsData.filter((post) => post.userId === foundUser.id)

    // Get user posts from localStorage (for newly added posts)
    const savedUserPosts = JSON.parse(localStorage.getItem("userPosts")) || []

    // Get liked posts from localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {}

    // Combine posts and add liked status
    const allUserPosts = [...savedUserPosts, ...filteredPosts]

    // Remove duplicates
    const uniquePosts = allUserPosts.filter((post, index, self) => index === self.findIndex((p) => p.id === post.id))

    // Apply likes and comments to posts
    const processedPosts = uniquePosts.map((post) => {
      // Store original values if not already stored
      if (!post.originalLikes) {
        post.originalLikes = post.likes
      }

      // Apply like status
      const isLiked = likedPosts[post.id] ? true : false

      // Get comment count
      const commentCount = savedComments[post.id] ? savedComments[post.id].length : 0

      return {
        ...post,
        isLiked: isLiked,
        likes: isLiked ? post.originalLikes + 1 : post.originalLikes,
        comments: commentCount,
        originalLikes: post.originalLikes,
      }
    })

    setUserPosts(processedPosts)

    // Get suggested connections (exclude current user)
    setSuggestedConnections(userData.filter((u) => u.id !== foundUser.id).slice(0, 3))
  }, [username])

  const handleSaveProfile = () => {
    const updatedUser = {
      ...user,
      bio: editedBio,
      headline: editedHeadline,
    }

    setUser(updatedUser)
    localStorage.setItem(`user_${user.id}`, JSON.stringify(updatedUser))
    setIsEditing(false)
  }

  const handleLike = (postId) => {
    // Update posts state
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.originalLikes : post.originalLikes + 1,
            }
          : post,
      ),
    )

    // Update localStorage
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {}

    if (likedPosts[postId]) {
      delete likedPosts[postId]
    } else {
      likedPosts[postId] = true
    }

    localStorage.setItem("likedPosts", JSON.stringify(likedPosts))
  }

  const handleComment = (post) => {
    setSelectedPost(post)
    setShowCommentModal(true)
  }

  const handleCloseCommentModal = () => {
    setShowCommentModal(false)
    setSelectedPost(null)
    setCommentText("")
  }

  const handleAddComment = (e) => {
    e.preventDefault()

    if (!commentText.trim() || !selectedPost) return

    // Create a new comment
    const newComment = {
      id: Date.now().toString(),
      userId: "johndoe",
      userName: "John Doe",
      userImage: "/placeholder.svg?height=40&width=40",
      text: commentText,
      timestamp: "Just now",
    }

    // Update comments state
    const updatedComments = { ...comments }
    if (!updatedComments[selectedPost.id]) {
      updatedComments[selectedPost.id] = []
    }
    updatedComments[selectedPost.id].push(newComment)
    setComments(updatedComments)

    // Update localStorage
    localStorage.setItem("comments", JSON.stringify(updatedComments))

    // Update post comment count - use actual comment count
    setUserPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === selectedPost.id ? { ...post, comments: updatedComments[selectedPost.id].length } : post,
      ),
    )

    // Clear input
    setCommentText("")
  }

  const handleShare = (postId) => {
    // For simplicity, just show an alert
    alert("Share functionality would open a modal here")
  }

  if (!user) {
    return (
      <div className="container mt-5 pt-5">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container" style={{ marginTop: "80px", paddingBottom: "30px" }}>
      <div className="row">
        {/* Main content - Profile */}
        <div className="col-lg-9 col-md-8 x">
          <div className="profile-header">
            {/* <img src="src/images/profile.png?height=200&width=800" alt="Cover" className="profile-cover" /> */}

            <div className="profile-details">
              <div className="d-flex justify-content-between newcard">
                <img
                  // src={user.profileImage || "src/images/profile.png?height=120&width=120"}
                  src="/images/3job.png?height=120&width=120"
                  alt={user.name}
                  className="profile-pic-large"
                />

                {user.id === "johndoe" && (
                  <button className="btn btn-outline-primary edit-button" onClick={() => setIsEditing(!isEditing)}>
                    {/* <Edit2 size={20} className="me-1" /> */}
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                )}
              </div>

              <div className="mt-3">
                {isEditing ? (
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      value={editedHeadline}
                      onChange={(e) => setEditedHeadline(e.target.value)}
                      placeholder="Headline"
                    />
                    <textarea
                      className="form-control mb-2"
                      value={editedBio}
                      onChange={(e) => setEditedBio(e.target.value)}
                      placeholder="Bio"
                      rows="3"
                    ></textarea>
                    <button className="btn btn-primary" onClick={handleSaveProfile}>
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <>
                    <h4>{user.name}</h4>
                    <p>{user.headline}</p>
                    <p>{user.location}</p>
                    <p>{connectionCount} connections</p>

                    {user.bio && (
                      <div className="mt-3">
                        <h5>About</h5>
                        <p>{user.bio}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h5>Posts</h5>

            {userPosts.length === 0 ? (
              <p>No posts yet.</p>
            ) : (
              userPosts.map((post) => (
                <div className="card mb-3" key={post.id}>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src={user.profileImage || "/placeholder.svg?height=50&width=50"}
                        alt={user.name}
                        className="profile-img me-2"
                      />
                      <div>
                        <h6 className="mb-0">{user.name}</h6>
                        <small className="text-muted">{post.timestamp}</small>
                      </div>
                    </div>

                    <p>{post.content}</p>

                    {post.image && <img src={"/images/18.jpg"} alt="Post" className="post-image mb-3" />}

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
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right sidebar - Suggested connections */}
        <div className="col-lg-3 col-md-4">
          <div className="card sidebar x">
            <div className="card-body">
              <h6 className="mb-3">People You May Know</h6>

              {suggestedConnections.map((connection) => (
                <div className="d-flex align-items-center mb-3" key={connection.id}>
                  <img
                    src={connection.profileImage || "/placeholder.svg?height=50&width=50"}
                    alt={connection.name}
                    className="profile-img me-2"
                  />
                  <div>
                    <h6 className="mb-0">{connection.name}</h6>
                    <small className="text-muted">{connection.headline}</small>
                    <div>
                      <button className="btn btn-sm btn-outline-primary mt-1">Connect</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                        src={comment.userImage || "/placeholder.svg?height=40&width=40"}
                        alt={comment.userName}
                        className="comment-avatar"
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

export default Profile

