import { JSX } from "react";

import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";

function Document(): JSX.Element {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">This is a fake document title</p>
        </div>
      </Header>
      <Editor />
    </div>
  );
}

export default Document;
