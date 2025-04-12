import {
  CollectionReference,
  DocumentReference,
  Firestore,
} from "firebase/firestore"

/**
 * Abstract Class for working with a Firestore database.
 * Provides a protected Firestore instance and enforces a consistent structure for subclasses.
 */
export default abstract class BaseStore {
  /**
   * Used to interact with the database. Marked a private to ensure controlled access.
   */
  private readonly _db: Firestore

  constructor(db: Firestore) {
    this._db = db
  }

  protected get db() {
    return this._db
  }
}

/**
 * Interface for Firestore CRUD operations.
 */
export interface CRUDStore<T> {
  /**
   * Creates a document of type `T` in the specified collection.
   * @param ref - A reference to the collection where the document will be created.
   * @returns A promise that resolves to a refeence for the newly created document.
   */
  create(ref: CollectionReference<T>): Promise<DocumentReference<T>>

  /**
   * Updates an existing document of type `T` by its reference with the provided partial payload.
   * @params ref - The reference to the document to be updated.
   * @param payload - A partial object containg the fields to update.
   * @returns A promise that resolves when the update is complete.
   */
  updateByRef(ref: DocumentReference<T>, payload: Partial<T>): Promise<void>

  /**
   * Deletes an existing document of type `T` by its reference.
   * @param ref - The reference to the document to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteByRef(ref: DocumentReference<T>): Promise<void>
}
