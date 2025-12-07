enum HTTPVerb {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface Endpoint {
  url: string;
  method: HTTPVerb | null;
}

type EndpointCreator = (...args: string[]) => Endpoint;

interface EndpointsDefinition {
  [key: string]: EndpointCreator | EndpointsDefinition;
}

export const ApiEndpoints = {
  auth: {
    login: () => ({ url: "/auth/login", method: HTTPVerb.POST }),
    refresh: () => ({ url: "/auth/refresh", method: HTTPVerb.POST }),
  },
} as const satisfies EndpointsDefinition;
