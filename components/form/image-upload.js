/* globals firebase */
import React from 'react';
import { connect } from 'unistore/react';
import { actions } from '../../datastore';
import md5 from 'md5';
import getUploadObservable from '../../utilities/storage/get-upload-observable';
import resizeImage from '../../utilities/storage/resize-image';

import { Button } from 'rmwc/Button';
import { IconButton } from 'rmwc/IconButton';

import '@material/button/dist/mdc.button.min.css';
import './form.css';

export class ImageUpload extends React.Component {
  constructor() {
    super();

    this.input = React.createRef();
    this.resizeContainer = React.createRef();

    this.state = {
      uploads: [],
      uploading: false,
    };
  }

  get storage() {
    return firebase.storage();
  }

  componentDidMount() {
    if (this.props.autoOpen) {
      this.input.current.click();
    }
  }

  async handleInputChange({ target }) {
    const promises = [...target.files].map(async file => {
      const originalSrc = await getFileSrc(file);

      const { blob, dimensions, src } = await resizeImage(
        originalSrc,
        this.resizeContainer.current,
        this.props.options
      );

      return {
        blob,
        dimensions,
        file,
        src,
        progress: 0,
      };
    });

    const uploads = await Promise.all(promises);

    this.setState({ uploads });
  }

  async handleUploadClick() {
    this.setState({ uploading: true });

    await Promise.all(
      this.state.uploads.map(
        ({ src, blob }, i) =>
          new Promise((resolve, reject) => {
            const ref = this.getFileRef(src);

            getUploadObservable(ref, blob).subscribe(this.handleUploadProgress(i), reject, resolve);
          })
      )
    );

    this.setState({ uploading: false });
  }

  getFileRef(src) {
    const { currentUser, environment } = this.props;
    const hash = md5(src);

    return environment.schema.userUploads(this.storage, currentUser.uid, hash);
  }

  handleUploadProgress(i) {
    return ({ progress, path, url }) => {
      if (progress) {
        const uploads = [...this.state.uploads];

        uploads[i].progress = progress;

        this.setState({ uploads });
      } else if (url) {
        this.props.onComplete({ path, url });
      }
    };
  }

  render() {
    const { height, width, disabled, multiple, url, useIconButton } = this.props;
    const { uploads, uploading } = this.state;

    const id = `image-upload`;

    return (
      <div className="image-upload">
        <div className="images">
          {uploads.length ? (
            uploads.map((upload, i) => (
              <Image
                key={i}
                src={upload.src}
                progress={upload.progress}
                dimensions={upload.dimensions}
                height={height}
                width={width}
              />
            ))
          ) : (
            <Image src={url} height={height} width={width} />
          )}
        </div>
        <div ref={this.resizeContainer} />

        <div className="buttons">
          <input
            id={id}
            type="file"
            multiple={multiple}
            ref={this.input}
            onChange={this.handleInputChange.bind(this)}
          />
          <label htmlFor={id}>
            {useIconButton ? (
              <IconButton
                use="attachment"
                disabled={disabled || uploading}
                onClick={() => this.input.current.click()}
              />
            ) : (
              <Button
                raised
                disabled={disabled || uploading}
                onClick={() => this.input.current.click()}
              >
                {this.props.buttonContents ? (
                  <span>{this.props.buttonContents}</span>
                ) : multiple ? (
                  <span>Select file(s)</span>
                ) : (
                  <span>Select file</span>
                )}
              </Button>
            )}
          </label>
          {!!uploads.length &&
            !useIconButton && (
              <Button raised disabled={uploading} onClick={this.handleUploadClick.bind(this)}>
                Upload
              </Button>
            )}
          {!!uploads.length &&
            useIconButton && (
              <IconButton
                use="send"
                disabled={uploading}
                onClick={this.handleUploadClick.bind(this)}
              />
            )}
        </div>
      </div>
    );
  }
}

export default connect(
  'currentUser,environment',
  actions
)(ImageUpload);

function Image({ dimensions, height, width, progress, src }) {
  return (
    <div className="image-wrapper">
      <img src={src} style={{ height: height }} />
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      {dimensions && (
        <span className="dimensions">
          {dimensions.width}x{dimensions.height}
        </span>
      )}
    </div>
  );
}

async function getFileSrc(file) {
  const reader = new FileReader();
  const promise = new Promise(resolve => {
    reader.addEventListener('load', () => resolve(reader.result), false);
  });

  reader.readAsDataURL(file);

  return promise;
}
