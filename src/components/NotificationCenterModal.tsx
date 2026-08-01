import React, { useState } from 'react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'price_drop' | 'cashback' | 'coupon' | 'system';
  isRead: boolean;
}

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'انخفاض في سعر Sony WH-1000XM5 🔥',
      message: 'انخفض سعر السماعة بنسبة 15% على أمازون نون ليصبح 14,500 ج.م فقط!',
      time: 'منذ 10 دقائق',
      type: 'price_drop',
      isRead: false,
    },
    {
      id: 'n-2',
      title: 'تم إيداع كاش باك جديد 🎉',
      message: 'تم إضافة 450 ج.م كاش باك مؤكد في محفظتك من عملية شراء نون.',
      time: 'منذ ساعتين',
      type: 'cashback',
      isRead: false,
    },
    {
      id: 'n-3',
      title: 'كوبون حصري جديد: WAFFLE 🏷️',
      message: 'خصم إضافي 10% على جميع الإلكترونيات من متجر نون لفترة محدودة.',
      time: 'منذ 5 ساعات',
      type: 'coupon',
      isRead: true,
    },
    {
      id: 'n-4',
      title: 'مرحباً بك في المستوى البلاتيني ✨',
      message: 'حصلت على ترقية في برنامج مكافآت وافرلي مع نسبة كاش باك مضاعفة!',
      time: 'بالأمس',
      type: 'system',
      isRead: true,
    },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl w-full max-w-xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto max-h-[90vh] cursor-default custom-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171f33] border-b border-[#454656]/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#e3b5ff] text-2xl">notifications</span>
            <h2 className="font-['Cairo'] font-bold text-lg text-[#dae2fd]">مركز الإشعارات والتنبيهات</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="px-6 py-3 bg-[#131b2e] border-b border-[#454656]/10 flex justify-between items-center text-xs">
          <span className="text-[#c5c5d8]">
            لديك {notifications.filter((n) => !n.isRead).length} إشعارات غير مقروءة
          </span>
          <button
            onClick={markAllRead}
            className="text-[#bdc2ff] font-bold hover:underline"
          >
            تحديد الكل كمقروء
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 overflow-y-auto flex-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                n.isRead
                  ? 'bg-[#171f33]/50 border-[#454656]/15 opacity-80'
                  : 'bg-[#222a3d] border-[#bdc2ff]/30 shadow-md'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  n.type === 'price_drop'
                    ? 'bg-[#7dffa2]/15 text-[#7dffa2]'
                    : n.type === 'cashback'
                    ? 'bg-[#e3b5ff]/15 text-[#e3b5ff]'
                    : n.type === 'coupon'
                    ? 'bg-[#bdc2ff]/15 text-[#bdc2ff]'
                    : 'bg-[#ffb4ab]/15 text-[#ffb4ab]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {n.type === 'price_drop'
                    ? 'trending_down'
                    : n.type === 'cashback'
                    ? 'account_balance_wallet'
                    : n.type === 'coupon'
                    ? 'sell'
                    : 'smart_toy'}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-sm text-[#dae2fd] font-['Cairo']">{n.title}</h3>
                  <span className="text-[10px] text-[#c5c5d8] shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-[#c5c5d8] leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Close */}
        <div className="p-4 bg-[#171f33] border-t border-[#454656]/20">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#222a3d] text-[#bdc2ff] hover:bg-[#2d3449] font-bold text-sm transition-all"
          >
            إغلاق الإشعارات
          </button>
        </div>
      </div>
    </div>
  );
};
