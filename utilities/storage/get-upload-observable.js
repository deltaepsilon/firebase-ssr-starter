import { Observable } from 'rxjs';
import isBrowser from '../is-browser';

export default isBrowser(function uploadRef(ref, fileOrBlob) {
  return Observable.create(observer => {
    const uploadTask = ref.put(fileOrBlob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = getSnapshotProgress(snapshot);
        observer.next({ progress });
      },
      error => observer.error(error),
      async () => {
        const url = await uploadTask.snapshot.ref.getDownloadURL();

        observer.next({ progress: 100 });
        observer.next({ url, path: uploadTask.snapshot.ref.toString() });
        observer.complete();
      }
    );
  });
});

function getSnapshotProgress(snapshot) {
  return snapshot.bytesTransferred / snapshot.totalBytes;
}
