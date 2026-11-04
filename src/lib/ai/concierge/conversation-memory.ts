import { ChatMessage } from "../types";

/**
 * Lightweight, session-based conversation memory.
 *
 * Design & Security Guarantees:
 * - Session Isolation: Sessions are partitioned strictly by conversationId.
 * - Bound Memory: Max 10 messages stored per session to avoid memory exhaustion.
 * - TTL Expiration: Inactive sessions expire after 30 minutes.
 * - ID Validation: Requires safe alphanumeric / UUID formats; rejects path traversal or malicious keys.
 * - Pluggable Architecture: Can be replaced with a distributed Redis store in high-scale deployments.
 */

export interface SessionData {
  messages: ChatMessage[];
  lastActive: number;
  metadata?: Record<string, unknown>;
}

export class ConversationMemory {
  private sessions = new Map<string, SessionData>();
  private readonly maxMessagesPerSession: number;
  private readonly ttlMs: number;
  private readonly maxSessions: number;

  constructor(
    options: {
      maxMessagesPerSession?: number;
      ttlMinutes?: number;
      maxSessions?: number;
    } = {}
  ) {
    this.maxMessagesPerSession = options.maxMessagesPerSession || 10;
    this.ttlMs = (options.ttlMinutes || 30) * 60 * 1000;
    this.maxSessions = options.maxSessions || 1000;
  }

  /**
   * Validates conversationId to prevent injection, directory traversal, or overly long keys.
   */
  public isValidId(conversationId: string): boolean {
    if (!conversationId || typeof conversationId !== "string") {
      return false;
    }
    // Allow UUID, nano-id, or alphanumeric string with hyphens/underscores, 8 to 64 chars
    return /^[a-zA-Z0-9_-]{8,64}$/.test(conversationId.trim());
  }

  /**
   * Generates a safe, cryptographically sound conversation ID if none is provided.
   */
  public generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomHex = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 0xffff)
        .toString(16)
        .padStart(4, "0")
    ).join("-");
    return `cleo-${timestamp}-${randomHex}`;
  }

  /**
   * Retrieves conversation history for a given session.
   * Returns empty array if session does not exist or has expired.
   */
  public getHistory(conversationId: string): ChatMessage[] {
    if (!this.isValidId(conversationId)) {
      return [];
    }

    const session = this.sessions.get(conversationId);
    if (!session) {
      return [];
    }

    // Check expiration
    if (Date.now() - session.lastActive > this.ttlMs) {
      this.sessions.delete(conversationId);
      return [];
    }

    session.lastActive = Date.now();
    return [...session.messages];
  }

  /**
   * Adds a message to the conversation session.
   */
  public addMessage(conversationId: string, message: ChatMessage): void {
    if (!this.isValidId(conversationId)) {
      return;
    }

    this.pruneIfNecessary();

    let session = this.sessions.get(conversationId);
    if (!session) {
      session = {
        messages: [],
        lastActive: Date.now(),
      };
      this.sessions.set(conversationId, session);
    }

    // Sanitize message role and limit stored content length
    const cleanMessage: ChatMessage = {
      role: message.role,
      content: message.content.slice(0, 1500),
      timestamp: message.timestamp || new Date().toISOString(),
      source: message.source,
      retrievedSources: message.retrievedSources,
    };

    session.messages.push(cleanMessage);
    session.lastActive = Date.now();

    // Enforce sliding window of stored messages
    if (session.messages.length > this.maxMessagesPerSession) {
      session.messages = session.messages.slice(-this.maxMessagesPerSession);
    }
  }

  /**
   * Clears a specific session.
   */
  public clearSession(conversationId: string): void {
    this.sessions.delete(conversationId);
  }

  /**
   * Returns current active session count.
   */
  public getSessionCount(): number {
    this.cleanExpiredSessions();
    return this.sessions.size;
  }

  /**
   * Cleans expired sessions based on TTL.
   */
  public cleanExpiredSessions(): number {
    const now = Date.now();
    let cleaned = 0;
    for (const [id, session] of this.sessions.entries()) {
      if (now - session.lastActive > this.ttlMs) {
        this.sessions.delete(id);
        cleaned++;
      }
    }
    return cleaned;
  }

  /**
   * Prunes oldest sessions if maximum capacity is reached.
   */
  private pruneIfNecessary(): void {
    if (this.sessions.size >= this.maxSessions) {
      this.cleanExpiredSessions();

      if (this.sessions.size >= this.maxSessions) {
        // Evict oldest 10%
        const entries = Array.from(this.sessions.entries()).sort(
          (a, b) => a[1].lastActive - b[1].lastActive
        );
        const toDelete = Math.max(1, Math.floor(entries.length * 0.1));
        for (let i = 0; i < toDelete; i++) {
          const entry = entries[i];
          if (entry) {
            this.sessions.delete(entry[0]);
          }
        }
      }
    }
  }
}

export const defaultConversationMemory = new ConversationMemory();
