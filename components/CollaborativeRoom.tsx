"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

import Header from "./Header";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./editor/Editor";
import { Input } from "./ui/input";
import { useClickOutside } from "@/hooks/useClickOutside";
import { updateDocument } from "@/lib/actions/room.actions";

function CollaborativeRoom({ roomId, roomMetadata }: CollaborativeRoomProps) {
  const currentUserType = "editor";
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function updateTitleHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocumet = await updateDocument(roomId, documentTitle);

          if (updatedDocumet) {
            setEditing(false);
          }
        }
      } catch (e) {
        console.error(e);
      }

      setLoading(false);
    }
  }

  useClickOutside({
    ref: containerRef,
    onClickOutside: () => {
      setEditing((editing) => !editing);
      updateDocument(roomId, documentTitle);
    },
  });

  useEffect(
    function () {
      if (editing && inputRef.current) {
        inputRef.current.focus();
      }
    },
    [editing],
  );

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  height={24}
                  width={24}
                  onClick={() => setEditing((editing) => !editing)}
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm text-gray-400">Saving...</p>}
            </div>
            <div className="flex w-full justify-end flex-1 gap-2 sm:gap: 3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
}

export default CollaborativeRoom;
