import Image from "next/image";
import { useOthers } from "@liveblocks/react/suspense";

function ActiveCollaborators() {
  const others = useOthers();

  const collaborators = others.map((other) => other.info);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, name, avatar, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="inline-block rounded-full size-8 ring-2 ring-dark-100"
            style={{ border: `1px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default ActiveCollaborators;
