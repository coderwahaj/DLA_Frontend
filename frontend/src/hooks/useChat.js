import { useState, useCallback, useEffect } from 'react';
import api from '@/api/axios';

export const useChat = () => {
  const [messages,       setMessages]       = useState([]);
  const [sessions,       setSessions]       = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading,      setIsLoading]      = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error,          setError]          = useState(null);

  // ── Load history ─────────────────────────────────────────────────────────
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true);
    setError(null);
    try {
      const res = await api.get('/chat/history', { params: { limit: 50 } });
      const data = res.data;

      const items = data?.data?.items || [];
      setSessions(
        items.map((item) => ({
          id:        item.queryId,
          title:     item.queryText.slice(0, 60) + (item.queryText.length > 60 ? '…' : ''),
          queryText: item.queryText,
          response:  item.response,
          createdAt: item.queryCreatedAt,
        }))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (content) => {
    try {
      setIsLoading(true);
      setError(null);

      const userMessage = {
        id:        `user-${Date.now()}`,
        type:      'user',
        sender:    'user',
        content,
        text:      content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);

      const res = await api.post('/chat', {
        message: content,
        sessionId: currentSession,
        queryType: 'general',
        top_k: 5,
      });
      const data = res.data;
      const { response: r, query: q } = data.data;

      const botMessage = {
        id:         `bot-${r.id}`,
        type:       'bot',
        sender:     'bot',
        content:    r.responseText,
        text:       r.responseText,
        citations:  r.citations  || [],
        confidence: r.confidence || 0,
        numSources: r.numSources || 0,
        responseId: r.id,
        timestamp:  new Date(r.createdAt),
      };
      setMessages((prev) => [...prev, botMessage]);
      setCurrentSession(q.id);

      // Prepend to sessions list
      setSessions((prev) => [
        {
          id:        q.id,
          title:     content.slice(0, 60) + (content.length > 60 ? '…' : ''),
          queryText: content,
          response: {
            responseId:       r.id,
            responseText:     r.responseText,
            citations:        r.citations  || [],
            confidence:       r.confidence || 0,
            numSources:       r.numSources || 0,
            responseCreatedAt: r.createdAt,
          },
          createdAt: q.createdAt,
        },
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          id:        `err-${Date.now()}`,
          type:      'bot',
          sender:    'bot',
          content:   `⚠️ **Error:** ${err.message}`,
          text:      `⚠️ Error: ${err.message}`,
          citations: [],
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  // ── Delete chat ───────────────────────────────────────────────────────────
  const deleteChat = useCallback(async (queryId) => {
    setSessions((prev) => prev.filter((s) => s.id !== queryId));
    if (currentSession === queryId) {
      setMessages([]);
      setCurrentSession(null);
    }
    try {
      await api.delete(`/chat/${queryId}`);
    } catch {
      loadHistory(); // re-sync on failure
    }
  }, [currentSession, loadHistory]);

  // ── Submit feedback ───────────────────────────────────────────────────────
  const submitFeedback = useCallback(async ({ responseId, rating, comment = '' }) => {
    if (!responseId || !rating) return;
    const res = await api.post('/chat/feedback', { responseId, rating, comment });
    return res.data;
  }, []);

  // ── Load session into messages ────────────────────────────────────────────
  const loadSession = useCallback((session) => {
    const msgs = [
      {
        id:        `user-${session.id}`,
        type:      'user',
        sender:    'user',
        content:   session.queryText,
        text:      session.queryText,
        timestamp: new Date(session.createdAt),
      },
    ];
    if (session.response) {
      msgs.push({
        id:         `bot-${session.id}`,
        type:       'bot',
        sender:     'bot',
        content:    session.response.responseText,
        text:       session.response.responseText,
        citations:  session.response.citations   || [],
        confidence: session.response.confidence  || 0,
        numSources: session.response.numSources  || 0,
        responseId: session.response.responseId,
        timestamp:  new Date(session.response.responseCreatedAt),
      });
    }
    setMessages(msgs);
    setCurrentSession(session.id);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentSession(null);
  }, []);

  return {
    messages,
    sessions,
    currentSession,
    isLoading,
    historyLoading,
    error,
    sendMessage,
    deleteChat,
    submitFeedback,
    loadSession,
    clearMessages,
    reloadHistory: loadHistory,
  };
};

export default useChat;