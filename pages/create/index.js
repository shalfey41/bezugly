import { useState } from 'react';

import { getFirebase } from "../../helpers/firebase";

export default function CreatePost() {
  const [id, setId] = useState('');
  const [content, setContent] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();

    const db = getFirebase().firestore();

    if (id) {
      await db.collection('posts').doc(id).update({ content });
    } else {
      await db.collection('posts').add({ content });
    }

    alert('ok');
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={id} onChange={({ currentTarget: { value } }) => setId(value)} />
      <textarea value={content} onChange={({ currentTarget: { value } }) => setContent(value)} />
      <button>Go</button>
    </form>
  );
}
