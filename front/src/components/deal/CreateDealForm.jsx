import React from 'react';
import PropTypes from 'prop-types';

export function CreateDealForm({ dealData, handleChange, handleSubmit }){
  return (
    <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title</label>
    <div className="form-group mb-3">
      <input
        type="text"
        name="title"
        placeholder="Deal Title"
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
        placeholder="Deal Description"
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
        placeholder="Deal Link"
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
        placeholder="Image Link"
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
      Submit Deal
    </button>
  </form>
  );
};

CreateDealForm.propTypes = {
  dealData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    weblink: PropTypes.string,
    imagelink: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

