/* globals firebase */
import React from 'react';
import { Button } from 'rmwc/Button';
import ImageUpload from '../form/image-upload';
import deleteImage from '../../utilities/storage/delete-image';

import '@material/button/dist/mdc.button.min.css';
import './settings.css';

export default function ProfileImage({ settings, setSettings }) {
  return (
    <div className="profile-image">
      {settings.photoURL ? (
        <div className="form-row">
          <img src={settings.photoURL} alt="profile image" />
          <Button raised onClick={clearPhotoUrl(setSettings, settings.photoURLPath)}>
            Remove/Replace
          </Button>
        </div>
      ) : (
        <ImageUpload
          url={settings.photoURL}
          height="250px"
          width="250px"
          options={{ height: 250, width: 250 }}
          onComplete={async ({ url, path }) => setSettings({ photoURL: url, photoURLPath: path })}
          buttonText="Select profile image"
        />
      )}
    </div>
  );
}

function clearPhotoUrl(setSettings, path) {
  const deleteValue = firebase.firestore.FieldValue.delete();

  return async () => {
    await setSettings({ photoURL: deleteValue, photoURLPath: deleteValue });
    return deleteImage(path);
  };
}
