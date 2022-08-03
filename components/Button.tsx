/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

export function Button(
  props: h.JSX.HTMLAttributes<HTMLButtonElement> & {
    class?: string;
  }
) {
  return (
    // <button
    //   {...props}
    //   disabled={!IS_BROWSER || props.disabled}
    //   class={tw`px-2 py-1 border(gray-100 2) hover:bg-gray-200`}
    // />
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
