import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

/**
 * Domain-specific exception for missing game entities.
 */
export class GameNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Game with identifier "${identifier}" was not found in the vault.`);
  }
}

/**
 * Domain-specific exception for conflicting game slugs.
 */
export class DuplicateGameSlugException extends ConflictException {
  constructor(slug: string) {
    super(`A game with unique slug "${slug}" already exists in the catalog.`);
  }
}

/**
 * Domain-specific exception for missing collections.
 */
export class CollectionNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Collection with ID "${id}" does not exist.`);
  }
}

/**
 * Domain-specific exception for duplicate game in collection.
 */
export class GameAlreadyInCollectionException extends ConflictException {
  constructor(collectionId: string, gameId: string) {
    super(`Game "${gameId}" is already registered within collection "${collectionId}".`);
  }
}

/**
 * Domain-specific exception for missing reviews.
 */
export class ReviewNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Review with ID "${id}" was not found.`);
  }
}

/**
 * Domain-specific exception for invalid telemetry values.
 */
export class InvalidPlaytimeException extends BadRequestException {
  constructor(minutes: number) {
    super(`Playtime increment must be a positive integer, received: ${minutes}`);
  }
}
