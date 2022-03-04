import { useOptimizedContext } from "./ContextProvider";

export default function CompB() {
  const { b, update } = useOptimizedContext();
  console.log(`renderizei b = ${b}`);
  return (
    <>
      <h1>CompB</h1>
      <button
        onClick={() => update(({ a, b: prevB }) => ({ a, b: prevB + 1 }))}
      >
        Increment B
      </button>
    </>
  );
}
