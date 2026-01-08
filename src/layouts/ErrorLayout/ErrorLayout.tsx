import { useRouteError } from "react-router-dom";

export function ErrorLayout(): JSX.Element {
  const err = useRouteError() as RouteError;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-5xl font-light text-[#5C9C9C] mb-2">
          <strong className="font-normal">Error {err.status || 500}</strong>
        </h1>
        <p className="text-lg text-gray-600">
          {err.statusText ?? err.message}
        </p>
      </div>
    </div>
  );
}

type RouteError = Error & { status?: number; statusText?: string };