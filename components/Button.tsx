/** @jsx h */
import { h } from "preact";

export function Button(
  props: h.JSX.HTMLAttributes<HTMLButtonElement> & {
    class?: string;
  }
) {
  return (
    <button
      {...props}
      class={`
        whitespace-nowrap
        py-1
        px-2
        my-1/2
        mx-1
        border-2
        rounded
        outline-none
        hover:outline-none
        focus:outline-none
        ${props.class}
      `}
    />
  );
}
