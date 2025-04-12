import { Firestore } from "firebase/firestore"
import UserStore from "./users"
import { initializeApp, FirebaseOptions } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import AuthStore from "./auth"

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCJgLPRoxFpZ9432kEawogv1oqaqhu735o",
  authDomain: "gettingstated-ecede.firebaseapp.com",
  projectId: "gettingstated-ecede",
  storageBucket: "gettingstated-ecede.firebasestorage.app",
  messagingSenderId: "802070077276",
  appId: "1:802070077276:web:e0b6c48382b51bd5e9ab99",
  measurementId: "G-3FJ63WSNVC",
}

const BUCKET_URL = "gs://pulsecheck-7cf2b.firebasestorage.app"

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app, BUCKET_URL)

/**
 * Enum to model Firestore collection names.
 * Use this enum to prevent hardcoded strings, reduces typos and
 * provides better autocompletion when referring to Firestore collections.
 */
export enum clx {
  /* Collection for storing polls */
  polls = "polls",
  /* Subcollection for questions */
  questions = "questions",
  /* Subcollection for storing prompt options */
  options = "options",
  /* Collection for storing user data */
  users = "users",
  /* Collection for storing poll sessions */
  sessions = "sessions",
  /* Collection for storing users in waiting room */
  waiting_users = "waiting_users",
  /* Collection for storing responses for poll session questions */
  responses = "responses",
  /* Collection for storing user submissions for poll sessions */
  submissions = "submissions",
}

/**
 * Serves as a central interface for managing Firestore.
 */
class APIStore {
  private readonly _auth: AuthStore
  private readonly _users: UserStore

  constructor(db: Firestore) {
    this._auth = new AuthStore()
    this._users = new UserStore(db)
  }

  public get auth(): AuthStore {
    return this._auth
  }

  public get users(): UserStore {
    return this._users
  }

  public get polls(): PollStore {
    return this._polls
  }

  public get sessions(): SessionStore {
    return this._sessions
  }

  public get submissions(): SubmissionStore {
    return this._submissions
  }
}

const api = new APIStore(firestore)

export default api
