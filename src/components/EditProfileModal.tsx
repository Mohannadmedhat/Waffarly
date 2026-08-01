import React, { useState, useRef } from 'react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentEmail: string;
  currentPhone?: string;
  currentAvatar: string;
  onSave: (updatedData: { name: string; email: string; phone: string; avatar: string }) => void;
}

const avatarOptions = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
];

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  currentName,
  currentEmail,
  currentPhone = '01012345678',
  currentAvatar,
  onSave,
}) => {
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);
  const [phone, setPhone] = useState(currentPhone);
  const [avatar, setAvatar] = useState(currentAvatar);
  const [savedToast, setSavedToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle local image file upload from device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, phone, avatar });
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-[#0b1326]/85 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fade-in text-[#dae2fd] cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#131b2e] border border-[#bdc2ff]/25 rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative space-y-6 cursor-default my-auto max-h-[92vh] overflow-y-auto custom-scrollbar"
      >
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8700d0] to-[#2d3fe3] flex items-center justify-center text-white shadow-lg shadow-[#8700d0]/30">
              <span className="material-symbols-outlined text-xl">manage_accounts</span>
            </div>
            <div>
              <h2 className="font-headline font-black text-lg text-white">تعديل بيانات الملف الشخصي</h2>
              <p className="text-[#c5c5d8] text-xs font-body">حدث اسمك وصورتك وبياناتك بسهولة</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#171f33] text-[#c5c5d8] hover:text-white flex items-center justify-center transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Toast Alert */}
        {savedToast && (
          <div className="bg-[#7dffa2]/20 border border-[#7dffa2]/40 text-[#7dffa2] p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fade-in font-headline shadow-lg">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            <span>تم حفظ البيانات والصورة بنجاح! 🎉</span>
          </div>
        )}

        {/* Featured Avatar Hero Picker */}
        <div className="flex flex-col items-center justify-center space-y-3 bg-[#0b1326]/60 p-5 rounded-3xl border border-white/8">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative w-24 h-24 rounded-3xl overflow-hidden border-2 border-[#7dffa2] shadow-xl group cursor-pointer"
            title="انقر لرفع صورة شخصية من جهازك"
          >
            <img src={avatar} alt="Profile preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-1">
              <span className="material-symbols-outlined text-2xl">photo_camera</span>
              <span className="text-[10px] font-bold font-headline">تغيير الصورة</span>
            </div>
            <span className="absolute bottom-1 right-1 w-6 h-6 bg-[#7dffa2] text-[#003918] rounded-xl flex items-center justify-center shadow-lg border border-[#131b2e]">
              <span className="material-symbols-outlined text-xs font-bold">edit</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2d3fe3] to-[#8700d0] text-white text-xs font-headline font-bold shadow-md hover:opacity-90 transition-all flex items-center gap-1.5 active:scale-95 ripple"
            >
              <span className="material-symbols-outlined text-base">upload_file</span>
              <span>رفع صورة من جهازك</span>
            </button>
          </div>

          {/* Quick Preset Avatars */}
          <div className="pt-2 space-y-1.5 w-full text-center">
            <span className="text-[11px] text-[#c5c5d8] font-headline">أو اختر من المعرض السريع:</span>
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar justify-center">
              {avatarOptions.map((url, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(url)}
                  className={`relative w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    avatar === url
                      ? 'border-[#7dffa2] scale-105 shadow-md shadow-[#7dffa2]/20'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs text-[#c5c5d8] block font-bold font-headline">الاسم بالكامل:</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#060e20] border border-[#454656]/30 focus:border-[#bdc2ff] focus:ring-1 focus:ring-[#bdc2ff] rounded-2xl py-3 px-4 text-sm text-[#dae2fd] placeholder-[#c5c5d8]/40 font-body transition-all"
              />
              <span className="absolute left-4 top-3.5 material-symbols-outlined text-base text-[#8899cc]">person</span>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs text-[#c5c5d8] block font-bold font-headline">البريد الإلكتروني:</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#060e20] border border-[#454656]/30 focus:border-[#bdc2ff] focus:ring-1 focus:ring-[#bdc2ff] rounded-2xl py-3 px-4 text-sm text-[#dae2fd] placeholder-[#c5c5d8]/40 font-body text-left dir-ltr transition-all"
              />
              <span className="absolute right-4 top-3.5 material-symbols-outlined text-base text-[#8899cc]">mail</span>
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs text-[#c5c5d8] block font-bold font-headline">رقم الهاتف (للاستلام والتحويل):</label>
            <div className="relative">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#060e20] border border-[#454656]/30 focus:border-[#bdc2ff] focus:ring-1 focus:ring-[#bdc2ff] rounded-2xl py-3 px-4 text-sm text-[#dae2fd] placeholder-[#c5c5d8]/40 font-body text-left dir-ltr transition-all"
              />
              <span className="absolute right-4 top-3.5 material-symbols-outlined text-base text-[#8899cc]">smartphone</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl bg-[#171f33] text-[#c5c5d8] font-headline font-bold text-xs hover:bg-[#222a3d] transition-all active:scale-95"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-[#2d3fe3] via-[#8700d0] to-[#3647ea] text-white font-headline font-bold text-xs shadow-xl shadow-[#2d3fe3]/20 active:scale-95 transition-all flex items-center justify-center gap-2 ripple"
            >
              <span className="material-symbols-outlined text-base">save</span>
              <span>حفظ التعديلات</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
