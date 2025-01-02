import { useEffect } from "react";

type useClickOutsideProps = {
  ref: React.RefObject<HTMLDivElement | null>;
  onClickOutside: () => void;
};

export function useClickOutside({ ref, onClickOutside }: useClickOutsideProps) {
  useEffect(
    function () {
      function handleClickOutside(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          onClickOutside();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    },
    [ref, onClickOutside],
  );
}
