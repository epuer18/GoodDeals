import { useEffect, useState, useContext } from "react";
import { UserContext } from "../user/userContext";

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
        console.log("in likes", { userId: user.id, like: newLikes })
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
      // Check if the Enter key is pressed
      if (event.key === "Enter") {
        handleLike();
      }
    };
  
    return (
      <span
      tabIndex="0" // Make the element focusable
      onClick={handleLike}
      onKeyPress={handleKeyPress} // Handle key press for accessibility
      className="star-section"
      role="button" // Indicate that the element is interactive
    >
        {liked ? <span className="fa fa-heart checked"></span> : <span className="fa fa-heart-o unchecked"></span>}
        {likes}
      </span>
    );
  };