import React, { useState } from 'react';

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportTicketModal: React.FC<SupportTicketModalProps> = ({ isOpen, onClose }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDetails, setTicketDetails] = useState('');
  const [ticketsList, setTicketsList] = useState([
    {
      id: 'TICK-9081',
      subject: 'استفسار عن كاش باك عملية شراء نون',
      date: '31 يوليو 2026',
      status: 'تم الحل',
      statusColor: 'bg-[#7dffa2]/15 text-[#7dffa2]',
    },
    {
      id: 'TICK-9082',
      subject: 'طلب تحديث معلومات الحساب البنكي',
      date: '28 يوليو 2026',
      status: 'قيد المراجعة',
      statusColor: 'bg-[#e3b5ff]/15 text-[#e3b5ff]',
    },
  ]);

  if (!isOpen) return null;

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim()) return;
    const newTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: ticketSubject.trim(),
      date: 'الآن',
      status: 'جديد - قيد الفحص',
      statusColor: 'bg-[#bdc2ff]/15 text-[#bdc2ff]',
    };
    setTicketsList([newTicket, ...ticketsList]);
    setTicketSubject('');
    setTicketDetails('');
    alert('تم تقديم طلب الدعم بنجاح! سيقوم ممثل خدمة العملاء بالرد عليك خلال ساعات قليلة.');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#bdc2ff] text-2xl">support_agent</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">مركز الدعم الفني ومتابعة الشكاوى</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* New Ticket Form */}
          <form onSubmit={handleSubmitTicket} className="bg-[#222a3d] p-5 rounded-2xl border border-white/5 space-y-4">
            <h3 className="font-['Cairo'] font-bold text-sm text-[#dae2fd]">تقديم بلاغ أو استفسار جديد:</h3>

            <div>
              <label className="text-xs text-[#c5c5d8] block mb-1">موضوع المشكلة أو الشكوى:</label>
              <input
                type="text"
                required
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="مثال: عدم إيداع كاش باك عملية شراء أمازون رقم #402..."
                className="w-full bg-[#060e20] border border-[#454656]/30 rounded-xl px-4 py-2.5 text-xs text-[#dae2fd] focus:border-[#bdc2ff]"
              />
            </div>

            <div>
              <label className="text-xs text-[#c5c5d8] block mb-1">تفاصيل إضافية أو رقم الطلب:</label>
              <textarea
                rows={3}
                value={ticketDetails}
                onChange={(e) => setTicketDetails(e.target.value)}
                placeholder="اكتب هنا التفاصيل المتعلقة برقم الفاتورة أو المتجر..."
                className="w-full bg-[#060e20] border border-[#454656]/30 rounded-xl p-3 text-xs text-[#dae2fd] focus:border-[#bdc2ff]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2d3fe3] to-[#3647ea] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
            >
              ارسال التذكرة للدعم الفني
            </button>
          </form>

          {/* Active Tickets List */}
          <div className="space-y-3">
            <h3 className="font-['Cairo'] font-bold text-sm text-[#dae2fd]">سجل التذاكر والشكاوى السابقة:</h3>

            <div className="space-y-2">
              {ticketsList.map((tick) => (
                <div key={tick.id} className="bg-[#171f33] p-4 rounded-xl border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#bdc2ff]">{tick.id}</span>
                      <span className="text-[10px] text-[#c5c5d8]">{tick.date}</span>
                    </div>
                    <p className="text-xs font-bold text-[#dae2fd] mt-1">{tick.subject}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${tick.statusColor}`}>
                    {tick.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق مركز الدعم
          </button>
        </div>
      </div>
    </div>
  );
};
