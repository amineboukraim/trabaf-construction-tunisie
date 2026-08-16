'use client';

import React, { useState, useEffect } from 'react';
import { DataService } from '@/lib/data-service';
import { Message, MessageStatus } from '@/types';
import { formatDate } from '@/lib/utils';
import {
  Mail,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Phone,
  User,
  X,
  AlertCircle,
  MessageSquare
} from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const loadMessages = () => {
    setMessages(DataService.getMessages());
  };

  useEffect(() => {
    loadMessages();
    window.addEventListener('trabaf_storage_updated', loadMessages);
    return () => window.removeEventListener('trabaf_storage_updated', loadMessages);
  }, []);

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (msg.status === 'new') {
      DataService.updateMessageStatus(msg.id, 'read');
      loadMessages();
    }
  };

  const handleStatusChange = (id: string, status: MessageStatus) => {
    DataService.updateMessageStatus(id, status);
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, status });
    }
    loadMessages();
  };

  const handleDelete = (id: string) => {
    DataService.deleteMessage(id);
    if (selectedMessage?.id === id) setSelectedMessage(null);
    loadMessages();
  };

  const filteredMessages = messages.filter((m) => {
    if (filterStatus === 'all') return true;
    return m.status === filterStatus;
  });

  const unreadCount = messages.filter((m) => m.status === 'new').length;

  return (
    <div className="space-y-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E2E5C] p-6 rounded-2xl border border-[#18437E] shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#F5B800]" />
            Boîte de Réception Messages
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Consultez et traitez les demandes de devis et de contact transmises par les visiteurs.
          </p>
        </div>

        {unreadCount > 0 && (
          <div className="bg-rose-600 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow shrink-0">
            <AlertCircle className="w-4 h-4" />
            <span>{unreadCount} demande(s) non lue(s)</span>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'all'
              ? 'bg-[#F5B800] text-[#081B38] shadow font-black'
              : 'bg-[#0E2E5C] text-slate-300 hover:bg-[#18437E] border border-[#18437E]'
          }`}
        >
          Tous ({messages.length})
        </button>
        <button
          onClick={() => setFilterStatus('new')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'new'
              ? 'bg-rose-600 text-white shadow font-black'
              : 'bg-[#0E2E5C] text-slate-300 hover:bg-[#18437E] border border-[#18437E]'
          }`}
        >
          Nouveaux ({unreadCount})
        </button>
        <button
          onClick={() => setFilterStatus('read')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'read'
              ? 'bg-blue-600 text-white shadow font-black'
              : 'bg-[#0E2E5C] text-slate-300 hover:bg-[#18437E] border border-[#18437E]'
          }`}
        >
          Lus ({messages.filter((m) => m.status === 'read').length})
        </button>
        <button
          onClick={() => setFilterStatus('processed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'processed'
              ? 'bg-emerald-600 text-white shadow font-black'
              : 'bg-[#0E2E5C] text-slate-300 hover:bg-[#18437E] border border-[#18437E]'
          }`}
        >
          Traités ({messages.filter((m) => m.status === 'processed').length})
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0E2E5C] border border-[#18437E] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-[#081B38] text-slate-400 uppercase font-bold border-b border-[#18437E]">
              <tr>
                <th className="p-4">Expéditeur</th>
                <th className="p-4">Sujet / Message</th>
                <th className="p-4">Téléphone</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18437E]">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Aucun message dans ce filtre.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr
                    key={m.id}
                    className={`hover:bg-[#18437E]/40 transition-colors ${
                      m.status === 'new' ? 'bg-rose-950/20 font-semibold' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{m.full_name}</div>
                      <div className="text-[11px] text-slate-400">{m.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-[#F5B800]">{m.subject}</div>
                      <div className="text-slate-300 text-[11px] line-clamp-1">{m.message}</div>
                    </td>
                    <td className="p-4 font-mono text-slate-300">{m.phone || 'Non renseigné'}</td>
                    <td className="p-4 text-slate-400">{formatDate(m.created_at)}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          m.status === 'new'
                            ? 'bg-rose-600 text-white animate-pulse'
                            : m.status === 'read'
                            ? 'bg-blue-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {m.status === 'new' ? 'Nouveau' : m.status === 'read' ? 'Lu' : 'Traité'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenMessage(m)}
                          className="p-2 rounded-lg bg-[#18437E] hover:bg-[#F5B800] hover:text-[#081B38] transition-colors"
                          title="Lire le message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id)}
                          className="p-2 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-600 hover:text-white transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Full Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0E2E5C] border-2 border-[#F5B800] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-[#18437E]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-[#18437E]">
              <MessageSquare className="w-6 h-6 text-[#F5B800]" />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedMessage.subject}</h3>
                <div className="text-xs text-slate-400">Reçu le {formatDate(selectedMessage.created_at)}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-[#081B38] p-4 rounded-xl border border-[#18437E]">
              <div className="flex justify-between">
                <span className="text-slate-400">Nom :</span>
                <strong className="text-white">{selectedMessage.full_name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email :</span>
                <a href={`mailto:${selectedMessage.email}`} className="text-[#F5B800] font-bold hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              {selectedMessage.phone && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Téléphone :</span>
                  <a href={`tel:${selectedMessage.phone.replace(/\s+/g, '')}`} className="text-[#F5B800] font-bold hover:underline">
                    {selectedMessage.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">Contenu du message :</label>
              <div className="bg-[#081B38] p-4 rounded-xl text-slate-200 text-xs leading-relaxed whitespace-pre-line border border-[#18437E]">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#18437E]">
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange(selectedMessage.id, 'read')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedMessage.status === 'read' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Marquer Lu
                </button>
                <button
                  onClick={() => handleStatusChange(selectedMessage.id, 'processed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    selectedMessage.status === 'processed' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Marquer Traité
                </button>
              </div>

              <button
                onClick={() => handleDelete(selectedMessage.id)}
                className="px-3 py-1.5 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-600 hover:text-white text-xs font-bold"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
