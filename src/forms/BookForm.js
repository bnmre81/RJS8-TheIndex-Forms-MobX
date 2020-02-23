import React, { Component } from "react";
import bookStore from "../stores/bookStore";

class BookForm extends Component {
  state = {
    detail: "",
    color: "",
    authors: [this.props.author.id]
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    bookStore.addBook(this.state, this.props.author);
    this.props.closeModal();
  };
  render() {
    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.handleSubmit}>
          {bookStore.errors && (
            <div className="alert alert-danger" role="alert">
              {bookStore.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Book Detail</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Color</span>
            </div>
            <select
              name="color"
              className="form-control"
              onChange={this.handleChange}
            >
              <option value="Blue">Blue</option>
              <option value="green">green</option>
              <option value="white">white</option>
              <option value="red">red</option>
              <option value="yellow">yellow</option>
            </select>
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={this.handleChange}
            />
          </div>

          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default BookForm;
