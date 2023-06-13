import dynamic from 'next/dynamic';
import React from 'react';
// import { Quill } from 'react-quill';

const Quill = dynamic(import('react-quill'), { ssr: false });

export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
  ],
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
};
