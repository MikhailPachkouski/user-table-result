import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import AddCommentForm from "../common/comments/AddCommentForm";
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
    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
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
