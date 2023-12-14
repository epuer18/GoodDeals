import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditDealForm } from "../components/deal/EditDealForm";
import "../asset/style/EditDeal.css";

export function EditDeal() {
  const [dealData, setDeal] = useState({
    title: "",
    description: "",
    weblink: "",
    imagelink: "",
    category: "",
  });
  const { dealId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeal() {
      try {
        const response = await fetch(`/api/deals/id/${dealId}`);
        if (response.ok) {
          const data = await response.json();
          setDeal(data);
        } else {
          console.error("Error fetching deal details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchDeal();
  }, [dealId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeal((prevDealData) => ({
      ...prevDealData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/deals/id/${dealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: dealData.title,
          description: dealData.description,
          weblink: dealData.weblink,
          imagelink: dealData.imagelink,
          category: dealData.category,
        }),
      });

      if (response.ok) {
        alert("Deal updated successfully!");
        navigate(`/deals/id/${dealId}`);
      } else {
        console.error("Error updating deal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2>Edit Deal</h2>
          <div className="edit-form">
            <EditDealForm
              dealData={dealData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

EditDeal.propTypes = {};
