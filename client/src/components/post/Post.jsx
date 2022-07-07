import React, { useState, useEffect } from 'react'
import './post.css'
import { MoreVert, CheckBoxOutlined, EmojiEmotions  } from '@material-ui/icons'
import {Users} from '../../dummyData'
import {Link} from "react-router-dom"

import {format} from 'timeago.js'

import axios from "axios"

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState(false)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser() 
    }, [post.userId])

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    return (
        <div className = 'post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to = {`profile/${user.username}`}>
                            <img src={user.profilePicture || PF+'person/noAvatar.jpg'} alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* The like and heart images will go here and the image address was refactored with the PF at 14:33 of the third video*/}
                        <CheckBoxOutlined htmlColor = "teal" className = 'likeIcon' onClick = {likeHandler}/>
                        <EmojiEmotions htmlColor = "tomato" className = 'likeIcon' onClick = {likeHandler}/>
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomLeft">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
