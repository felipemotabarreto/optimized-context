import { useOptimizedContext } from "./ContextProvider";

export default function CompA() {
  const { a, update } = useOptimizedContext();
  console.log(`renderizei a = ${a}`);
  return (
    <>
      <h1>CompA</h1>
      <button
        onClick={() => update(({ a: prevA, b }) => ({ a: prevA + 1, b }))}
      >
        Increment A
      </button>
    </>
  );
}
