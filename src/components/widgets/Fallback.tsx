export function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown | any;
  resetErrorBoundary: Function;
}) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div className="bg-red-50  p-5" role="alert">
      <p className="text-5xl text-red-300">Something went wrong:</p>
      <pre className="text-lg text-red-700">
        {error.message as unknown as string}
      </pre>
      <button
        className="bg-slate-700 text-white p-3 text-lg"
        onClick={() => resetErrorBoundary()}
      >
        Reset
      </button>
    </div>
  );
}
