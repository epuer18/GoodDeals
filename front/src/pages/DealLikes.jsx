import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/userContext";

export const DealLikes = ({ dealId, initialLikes }) => {

    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
    const { user } = useContext(UserContext);
  
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
  
    return (
      <span onClick={handleLike} className="star-section">
        {liked ? <span className="fa fa-star checked"></span> : <span className="fa fa-star-o unchecked"></span>}
        {likes}
      </span>
    );
  };