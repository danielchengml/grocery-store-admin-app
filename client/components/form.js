import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input className="form-control" id="description" />
      </div>
      <div className="form-group">
        <label htmlFor="image_url">Image URL</label>
        <input className="form-control" id="image_url" />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input className="form-control" id="price" />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
