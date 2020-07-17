import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ueditor.config";
import "./ueditor.all";
import './lang/zh-cn/zh-cn';
import './themes/default/css/ueditor.css';
import './themes/iframe.css';
import './third-party/jquery-1.10.2';
import './themes/default/images/icons.png';
import './themes/default/images/icons.gif';

export default class Editor extends Component {
  static propTypes = {};
  constructor(props) {
    super(props);
    this.state = {};
    this.id = undefined;
  }

  componentDidMount() {
    window.UEDITOR_HOME_URL = "./ueditor";
    let UE = window.UE;
    let id = this.id;
    if (id && UE) {
      const config = {
        // toolbars: [["bold", "italic", "underline", "kityformula", "diyimg"]],
        // initialContent: "",
        // autoHeightEnabled: false,
        // autoFloatEnabled: false,
        // elementPathEnabled: false,
        // wordCount: false,
        // enableAutoSave: false,
        // initialFrameWidth: 1000,
        // initialFrameHeight: 400
      };
      const editor = UE.getEditor(id, config);
      const self = this;
      editor.ready((status) => {
        console.log('init', status);
        if (!status) {
          UE.delEditor(id);
          self.initEditor();
          return;
        }

      });
    }
  }

  initEditor() {

  }

  render() {
    return (
      <div>
        <div
          ref={(c) => (this.id = c)}
          className="ueditor"
          name="content"
          type="text/plain"
        />
      </div>
    );
  }
}
