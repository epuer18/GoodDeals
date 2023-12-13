import { useState, useContext } from "react";
import { UserContext } from "../user/userContext";
import PropTypes from "prop-types";

export const DealLikes = ({ dealId, initialLikes, likedUsers }) => {
  const { user } = useContext(UserContext);
  const alreadyLiked = likedUsers;
  const [liked, setLiked] = useState(alreadyLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    if (!user) {
      alert("You must be logged in to like a deal.");
      return;
    }

    const newLikes = liked ? likes - 1 : likes + 1;

    try {
      const response = await fetch(`/api/deals/id/${dealId}/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, like: newLikes }),
      });

      if (response.ok) {
        setLiked(!liked);
        setLikes(newLikes);
      } else {
        console.error("Error updating deal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLike();
    }
  };

  return (
    <span
      tabIndex="0"
      onClick={handleLike}
      onKeyPress={handleKeyPress}
      className="star-section"
      role="button"
    >
      {liked ? (
        <span className="fa fa-heart checked"></span>
      ) : (
        <span className="fa fa-heart-o unchecked"></span>
      )}
      {likes}
    </span>
  );
};

DealLikes.propTypes = {
  dealId: PropTypes.string.isRequired,
  initialLikes: PropTypes.number.isRequired,
  likedUsers: PropTypes.number.isRequired,
};
