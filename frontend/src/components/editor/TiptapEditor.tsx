import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const TiptapEditor = ({ value = "", onChange, placeholder }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || "Write your content here...",
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] rounded-b-lg border border-t-0 border-gray-200 bg-white px-4 py-3 shadow-sm focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-lg">
      <div className="flex flex-wrap gap-2 rounded-t-lg border border-gray-200 bg-gray-50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded border px-3 py-1 text-sm"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded border px-3 py-1 text-sm"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="rounded border px-3 py-1 text-sm"
        >
          Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="rounded border px-3 py-1 text-sm"
        >
          Ordered List
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
