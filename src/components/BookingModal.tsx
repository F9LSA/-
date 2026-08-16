import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Loader2,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useLanguage } from '../i18n';

type Stage = 'phone' | 'otp' | 'schedule' | 'confirmed';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STAGE_ORDER: Stage[] = ['phone', 'otp', 'schedule'];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { t, isArabic } = useLanguage();
  const [stage, setStage] = useState<Stage>('phone');
  const [phone, setPhone] = useState('');
  const [expectedOtp, setExpectedOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Reset state each time the modal opens
  useEffect(() => {
    if (isOpen) {
      setStage('phone');
      setPhone('');
      setExpectedOtp('');
      setOtp('');
      setOtpError(false);
      setSending(false);
      setVerifying(false);
      setConfirming(false);
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [isOpen]);

  // Generate the next 7 days for scheduling
  const days = useMemo(() => {
    const result: { label: string; date: string }[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const label =
        i === 0
          ? t('booking.schedule.today')
          : i === 1
          ? t('booking.schedule.tomorrow')
          : d.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', { weekday: 'short' });
      const date = d.toISOString().slice(0, 10);
      result.push({ label, date });
    }
    return result;
  }, [t, isArabic]);

  const timeSlots = [
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  const phoneValid = /^5\d{8}$/.test(phone);
  const phoneStartsCorrect = phone.length === 0 || phone.startsWith('5');
  const otpValid = /^\d{4}$/.test(otp);

  const formatDate = (date: string) =>
    new Date(date + 'T00:00:00').toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

  const maskPhone = (p: string) => p.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1 *** $3');

  const handleSendOtp = () => {
    if (!phoneValid) return;
    setSending(true);
    // Simulate sending the OTP message
    setTimeout(() => {
      const code = String(Math.floor(1000 + Math.random() * 9000));
      setExpectedOtp(code);
      setSending(false);
      setStage('otp');
    }, 1200);
  };

  const handleVerifyOtp = () => {
    if (!otpValid) return;
    setVerifying(true);
    // Simulate verifying the code
    setTimeout(() => {
      if (otp === expectedOtp) {
        setOtpError(false);
        setVerifying(false);
        setStage('schedule');
      } else {
        setOtpError(true);
        setVerifying(false);
      }
    }, 1000);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      setStage('confirmed');
    }, 1200);
  };

  const stageIndex = stage === 'confirmed' ? 3 : STAGE_ORDER.indexOf(stage);
  const stageIcons = [<Phone size={14} key="p" />, <ShieldCheck size={14} key="s" />, <Calendar size={14} key="c" />];
  const progressWidth = stage === 'phone' ? '0%' : stage === 'otp' ? '50%' : '100%';

  const stageLabels: Record<Stage, string> = {
    phone: t('booking.stage.phone'),
    otp: t('booking.stage.otp'),
    schedule: t('booking.stage.schedule'),
    confirmed: '',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl border border-[var(--theme-border)] bg-[var(--dark-surface)] p-4 sm:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={t('booking.close')}
              className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-full p-1.5 sm:p-2 text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)]"
            >
              <X size={16} />
            </button>

            {/* Progress indicator */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                {STAGE_ORDER.map((s, i) => {
                  const active = stageIndex === i;
                  const done = stageIndex > i;
                  return (
                    <React.Fragment key={s}>
                      {i > 0 && (
                        <div
                          className={`mx-1.5 sm:mx-2 h-px flex-1 ${
                            stageIndex >= i ? 'bg-[#3a000e]' : 'bg-[var(--theme-border)]'
                          }`}
                        />
                      )}
                      <div
                        className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${
                          active || done ? 'text-[var(--theme-text)]' : 'text-[var(--theme-text-secondary)]'
                        }`}
                      >
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            active || done
                              ? 'border-[#3a000e] bg-[#3a000e] text-white'
                              : 'border-[var(--theme-border)]'
                          }`}
                        >
                          {done ? <Check size={12} /> : stageIcons[i]}
                        </span>
                        {stageLabels[s]}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--theme-border)]">
                <motion.div
                  className="h-full bg-[#3a000e]"
                  animate={{ width: progressWidth }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Stage content */}
            <AnimatePresence mode="wait">
              {stage === 'phone' && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="mb-1 text-lg sm:text-xl font-bold text-[var(--theme-text)]">
                    {t('booking.phone.title')}
                  </h3>
                  <p className="mb-6 text-sm text-[var(--theme-text-secondary)]">
                    {t('booking.phone.subtitle')}
                  </p>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
                    {t('booking.phone.mobile')}
                  </label>
                  <div
                    className={`flex items-center overflow-hidden rounded-xl border transition ${
                      phoneValid
                        ? 'border-[#3a000e]'
                        : 'border-[var(--theme-border)] focus-within:border-[var(--theme-text)]'
                    }`}
                  >
                    <span className="flex items-center gap-1 border-r border-[var(--theme-border)] bg-[var(--theme-hover)] px-2.5 sm:px-3 py-2.5 sm:py-3 text-sm font-medium text-[var(--theme-text)]">
                      🇸🇦 +966
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoFocus
                      value={phone}
                      maxLength={9}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="5XXXXXXXX"
                      className="w-full bg-transparent px-3 py-3 text-base text-[var(--theme-text)] outline-none placeholder:text-[var(--theme-text-secondary)]"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <p className="text-[var(--theme-text-secondary)]">
                      {t('booking.phone.mustStart')} <span className="font-semibold text-[var(--theme-text)]">5</span> {t('booking.phone.andBe')}
                    </p>
                    <span
                      className={`font-semibold tabular-nums ${
                        phoneValid
                          ? 'text-green-500'
                          : 'text-[var(--theme-text-secondary)]'
                      }`}
                    >
                      {phone.length}/9
                    </span>
                  </div>
                  {!phoneStartsCorrect && (
                    <p className="mt-1 text-xs text-red-500">
                      {t('booking.phone.start5')}
                    </p>
                  )}

                  <div className="mt-6">
                    {phoneValid && (
                      <motion.button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={sending}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full rounded-full py-3 sm:py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition hover:opacity-90 disabled:opacity-60"
                        style={{
                          background:
                            'linear-gradient(123deg, #3a000e 7%, #3a000e 37%, #3a000e 72%, #030303 100%)',
                        }}
                      >
                        {sending ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 size={16} className="animate-spin" /> {t('booking.phone.sending')}
                          </span>
                        ) : (
                          t('booking.phone.sendOtp')
                        )}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}

              {stage === 'otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="mb-1 text-lg sm:text-xl font-bold text-[var(--theme-text)]">
                    {t('booking.otp.title')}
                  </h3>
                  <p className="mb-6 text-sm text-[var(--theme-text-secondary)]">
                    {t('booking.otp.subtitle')}{' '}
                    <span className="font-semibold text-[var(--theme-text)]">+966 {maskPhone(phone)}</span>
                  </p>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
                    {t('booking.otp.code')}
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoFocus
                    value={otp}
                    maxLength={4}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, ''));
                      setOtpError(false);
                    }}
                    placeholder="••••"
                    className={`w-full rounded-xl border bg-transparent px-3 py-3 text-center text-xl sm:text-2xl tracking-[0.5em] text-[var(--theme-text)] outline-none transition placeholder:text-[var(--theme-text-secondary)] ${
                      otpError ? 'border-red-500' : 'border-[var(--theme-border)]'
                    }`}
                  />
                  {otpError && <p className="mt-2 text-xs text-red-500">{t('booking.otp.incorrect')}</p>}

                  <p className="mt-3 rounded-lg bg-[var(--theme-hover)] px-3 py-2 text-xs text-[var(--theme-text-secondary)]">
                    {t('booking.otp.demo')}{' '}
                    <span className="font-bold text-[var(--theme-text)]">{expectedOtp}</span>
                  </p>

                  <div className="mt-6 flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setStage('phone')}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)]"
                    >
                      <ArrowLeft size={16} /> {t('booking.otp.change')}
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={!otpValid || verifying}
                      animate={{ opacity: otpValid ? 1 : 0.5 }}
                      className="flex-1 rounded-full py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:opacity-90 disabled:opacity-60"
                      style={{
                        background:
                          'linear-gradient(123deg, #3a000e 7%, #3a000e 37%, #3a000e 72%, #030303 100%)',
                      }}
                    >
                      {verifying ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={16} className="animate-spin" /> {t('booking.otp.verifying')}
                        </span>
                      ) : (
                        t('booking.otp.verify')
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {stage === 'schedule' && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="mb-1 text-lg sm:text-xl font-bold text-[var(--theme-text)]">
                    {t('booking.schedule.title')}
                  </h3>
                  <p className="mb-6 text-sm text-[var(--theme-text-secondary)]">
                    {t('booking.schedule.subtitle')}
                  </p>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
                    {t('booking.schedule.day')}
                  </label>
                  <div className="mb-5 grid grid-cols-4 gap-1.5 sm:gap-2">
                    {days.map((d) => (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => setSelectedDate(d.date)}
                        className={`rounded-xl border px-1.5 sm:px-2 py-2 sm:py-2.5 text-center transition ${
                          selectedDate === d.date
                            ? 'border-[#3a000e] bg-[#3a000e] text-white'
                            : 'border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-hover)]'
                        }`}
                      >
                        <span className="block text-[10px] uppercase tracking-wide opacity-70">
                          {d.label}
                        </span>
                        <span className="block text-sm font-semibold">
                          {new Date(d.date + 'T00:00:00').getDate()}
                        </span>
                      </button>
                    ))}
                  </div>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
                    {t('booking.schedule.time')}
                  </label>
                  <div className="mb-6 grid grid-cols-3 gap-1.5 sm:gap-2">
                    {timeSlots.map((tSlot) => (
                      <button
                        key={tSlot}
                        type="button"
                        onClick={() => setSelectedTime(tSlot)}
                        className={`rounded-xl border px-1.5 sm:px-2 py-2 sm:py-2.5 text-sm font-medium transition ${
                          selectedTime === tSlot
                            ? 'border-[#3a000e] bg-[#3a000e] text-white'
                            : 'border-[var(--theme-border)] text-[var(--theme-text)] hover:bg-[var(--theme-hover)]'
                        }`}
                      >
                        {tSlot}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setStage('otp')}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--theme-border)] px-3 sm:px-4 py-2.5 sm:py-3 text-sm font-medium text-[var(--theme-text-secondary)] transition hover:bg-[var(--theme-hover)]"
                    >
                      <ArrowLeft size={16} /> {t('booking.schedule.back')}
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleConfirm}
                      disabled={!selectedDate || !selectedTime || confirming}
                      animate={{ opacity: selectedDate && selectedTime ? 1 : 0.5 }}
                      className="flex-1 rounded-full py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:opacity-90 disabled:opacity-60"
                      style={{
                        background:
                          'linear-gradient(123deg, #3a000e 7%, #3a000e 37%, #3a000e 72%, #030303 100%)',
                      }}
                    >
                      {confirming ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={16} className="animate-spin" /> {t('booking.schedule.confirming')}
                        </span>
                      ) : (
                        t('booking.schedule.confirm')
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {stage === 'confirmed' && (
                <motion.div
                  key="confirmed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                    className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#3a000e] text-white"
                  >
                    <Check size={28} />
                  </motion.div>
                  <h3 className="mb-2 text-lg sm:text-xl font-bold text-[var(--theme-text)]">
                    {t('booking.confirmed.title')}
                  </h3>
                  <p className="mb-4 text-sm text-[var(--theme-text-secondary)]">
                    {t('booking.confirmed.subtitle')}
                  </p>
                  <div className="mx-auto mb-6 max-w-xs rounded-xl border border-[var(--theme-border)] bg-[var(--theme-hover)] p-4 text-left text-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-[#3a000e]" />
                      <span className="font-semibold text-[var(--theme-text)]">
                        {formatDate(selectedDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#3a000e]" />
                      <span className="font-semibold text-[var(--theme-text)]">{selectedTime}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-full py-3 text-sm font-semibold uppercase tracking-widest text-white transition hover:opacity-90"
                    style={{
                      background:
                        'linear-gradient(123deg, #3a000e 7%, #3a000e 37%, #3a000e 72%, #030303 100%)',
                    }}
                  >
                    {t('booking.confirmed.done')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}