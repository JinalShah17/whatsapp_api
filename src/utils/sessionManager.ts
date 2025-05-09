type Session = {
  userId: string;
  lastActive: number;
};

const sessions: Record<string, Session> = {};
const SESSION_TIMEOUT = 1 * 60 * 1000; // 10 mins

export const SessionManager = {
  startSession(userId: string) {
    sessions[userId] = { userId, lastActive: Date.now() };
  },

  updateSession(userId: string) {
    if (sessions[userId]) {
      sessions[userId].lastActive = Date.now();
    }
  },

  isSessionActive(userId: string): boolean {
    const session = sessions[userId];
    if (!session) return false;

    const now = Date.now();
    const isExpired = now - session.lastActive > SESSION_TIMEOUT;

    if (isExpired) {
      delete sessions[userId];
      return false;
    }

    return true;
  },

  endSession(userId: string) {
    delete sessions[userId];
  }
};
