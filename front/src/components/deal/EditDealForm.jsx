import React from "react";
import PropTypes from "prop-types";

export function EditDealForm({ dealData, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <div className="form-group mb-3">
        <input
          type="text"
          name="title"
          value={dealData.title}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={dealData.description}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="weblink">Deal Link</label>
        <input
          type="text"
          name="weblink"
          value={dealData.weblink}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="imagelink">Image Link</label>
        <input
          type="text"
          name="imagelink"
          value={dealData.imagelink}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={dealData.category}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Select Category</option>
          <option value="grocery">Grocery</option>
          <option value="beauty">Beauty</option>
          <option value="fashion">Fashion</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Update Deal
      </button>
    </form>
  );
}

EditDealForm.propTypes = {
  dealData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weblink: PropTypes.string.isRequired,
    imagelink: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
