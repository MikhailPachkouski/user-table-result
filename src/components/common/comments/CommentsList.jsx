import PropTypes from "prop-types";
import React from "react";

const CommentsList = ({ comments }) => {
    console.log(comments);
    return (
        <div>
            {comments.map((comment) => (
                <p key={comment._id}>{comment.content}</p>
            ))}
        </div>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array
};

export default CommentsList;
