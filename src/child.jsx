import React, { Component } from "react";
import PropTypes from "prop-types";
import Editor from './ueditor'

export default class Child extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {
      val: 0
    };
  }

  componentDidMount() {

  }

  render() {
    return (
    <div id="ddd">
        <Editor />
      </div>
    );
  }
}
