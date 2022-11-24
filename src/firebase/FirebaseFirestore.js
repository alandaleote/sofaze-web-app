import firebase from "./firebase.config";

const firestore = firebase.firestore();

const createDocument = (collection, document) => {
  return firestore.collection(collection).add(document)
};

const FirebaseFirestore = {
  createDocument
};

export default FirebaseFirestore;
