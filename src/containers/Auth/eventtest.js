import React, { Component } from 'react';
import * as classshared from '../../components/commoncss/classconst';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ImageUpload from '../../components/FilestackUpload/FilestackUpload';

import { FilestackType } from '../../shared/utility';
class eventtest extends Component {
    onEditorStateChange = (editorState) => {

        let value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        console.log(value)
    }

    onSuccessImageupload = (result) => {
        let imageurl = result.filesUploaded[0]["url"];
        alert(imageurl)
    };
    render() {

        return (
            <React.Fragment>
                <ImageUpload buttontype={FilestackType.userprofilepic} onSuccessupload={this.onSuccessImageupload} />

                <Editor
                   
                    editorClassName={classshared.texteditor}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </React.Fragment>
        )
    }
}

export default eventtest;