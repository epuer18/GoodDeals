import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DeleteDeal } from "../components/deal/DeleteDeal";
import { UserContext } from "../components/user/userContext";
import { Comments } from "../components/deal/Comments";
import { DealLikes}from '../components/deal/DealLikes';

import "../asset/style/DealDetail.css";

export function DealDetail() {
  const [deal, setDeal] = useState(null);
  const { dealId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchDeal() {
      const response = await fetch(`/api/deals/id/${dealId}`);
      if (response.ok) {
        const data = await response.json();
        setDeal(data);
      } else {
        console.error("Deal not found");
      }
    }
    fetchDeal();
  }, [dealId]);

  if (!deal) {
    return <div>Loading...</div>;
  }

  const options = {
    year: 'numeric', 
    month: 'numeric', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true
  };

  const createdAt = new Date(deal.createdAt).toLocaleString('en-US', options);

  const isCreator = user && user.id === deal.creatorId;

  return (
    <div className="container-fluid">
      <div className="card">
        <img src={deal.imagelink} alt={deal.title} className="card-img-top" />
        <div className="card-body">
          <h2 className="card-title">{deal.title}</h2>
          <p className="card-text">{deal.description}</p>
          <p className="card-category"># {deal.category} </p>
          <p className="card-creator">Postby: {deal.creatorName} </p>
          <p className="card-creator">Posted at: {createdAt} </p>
          <hr className="solid"></hr>
          <div className="card-btn">
          <DealLikes
  dealId={dealId}
  initialLikes={deal.like}
  likedUsers={user && deal.likedUsers ? deal.likedUsers.includes(user.id) : false}
/>
          {/* <DealLikes dealId={dealId} initialLikes={deal.like} likedUsers={   
            (user && deal.likedUsers)
          ? 
          (deal.likedUsers.indexOf(user.id)+1): false}/> */}
              {isCreator && (
                <>
            <Link
              to={`/deals/edit/id/${dealId}`}
              className="btn btn-secondary ">
              Edit
            </Link>
            <DeleteDeal dealId={dealId} />
            </>)}
          </div>
          <Comments dealId={dealId} user={user} />
        </div>
      </div>
    </div>
  );
}

DealDetail.propTypes = {};
