import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import CommentsList from "../common/comments/CommentsList";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((comments) => setComments(comments));
    }, []);
    const handleRemove = (id) => {
        api.comments
            .remove(id)
            .then((id) =>
                setComments(comments.filter((comment) => comment._id === id))
            );
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">Add Comment Form</div>
            </div>
            {comments.length > 0 && (
                <div className="card">
                    <div className="card-body">
                        <h3>Comments</h3>
                        <hr />
                        <CommentsList
                            comments={comments}
                            onRemove={handleRemove}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
