import { subtitle, title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <p className={subtitle()}>This is the docs page! </p>
      <p>Did you know that docs are important?</p>
    </div>
  );
}
