import React from 'react';

export default function UpdatingForm() {
  return (
    <form>
      <label className="form-label" htmlFor="title">
        Title
        <input name="title" className="form-control" id="title" type="text" />
      </label>
      <label className="form-label" htmlFor="description">
        Description
        <input name="description" className="form-control" id="description" type="text" />
      </label>
      <label className="form-label" htmlFor="status">
        Status
        <select defaultValue="" name="status" className="form-select" id="status" type="number">
          <option value="" disabled>Select your option</option>
          <option value="0">To do</option>
          <option value="1">In progress</option>
          <option value="2">Done</option>
        </select>
      </label>
    </form>
  );
}
