import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from "prop-types";
import { toolbarConfig} from '../../../lib/RichTextEditorToolConfig';

class RichEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func
  };

  state = {
    value: RichTextEditor.createEmptyValue()
  }

  onChange = (value) => {
      this.props.onChange(value.toString('markdown'))
    this.setState({value});
    // console.log(value.toString('markdown'))
    // if (this.props.onChange) {
    //   // Send the changes up to the parent component as an HTML string.
    //   // This is here to demonstrate using `.toString()` but in a real app it
    //   // would be better to avoid generating a string on each change.
    //   this.props.onChange(
    //     value.toString('html')
    //   );
    // }
  };

  render () {
    return (
      <RichTextEditor
        value={this.state.value}
        onChange={this.onChange}
        // toolbarConfig={toolbarConfig}
        autoFocus={true}
        editorClassName="textEditor"
        // readOnly={true}
      />
    );
  }
}


export default RichEditor;