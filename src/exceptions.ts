export abstract class ApplicationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Represents a not okay respponse from an external API
 */
export class ExternalAPIException extends ApplicationException {}

/**
 * Represents a error during fetch to an external API
 */
export class NetworkFetchException extends ApplicationException {}
