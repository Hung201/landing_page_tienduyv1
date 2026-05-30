import { useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
}

export default function RichTextEditor({ value, onChange, placeholder }) {
  const formats = useMemo(
    () => [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'color',
      'background',
      'align',
      'list',
      'bullet',
      'link',
    ],
    [],
  )

  return (
    <div className="rich-editor rounded-lg border border-gray-300 bg-white [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:min-h-[220px] [&_.ql-container]:rounded-b-lg [&_.ql-editor]:min-h-[220px]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  )
}
