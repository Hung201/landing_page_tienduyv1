import { useEffect, useRef, useState } from 'react'
import { ZALO_URL, MESSENGER_URL } from '../config/contact.js'

function ChatIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 10h8M8 14h5M12 3c-4.4 0-8 2.7-8 6v5l2.8-2.2c.9.3 1.9.5 2.9.5 1.2.8 2.8 1.2 4.3 1.2 4.4 0 8-2.7 8-6s-3.6-6-8-6Z"
      />
    </svg>
  )
}

function CloseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

function ChannelLink({ href, icon, title, subtitle }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-3 transition hover:border-vibez-orange/30 hover:bg-white hover:shadow-md"
    >
      <span className="flex h-11 w-11 shrink-0 overflow-hidden rounded-full shadow-sm ring-2 ring-white">
        <img src={icon} alt="" className="h-full w-full object-cover" width={44} height={44} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900 group-hover:text-vibez-orange">
          {title}
        </span>
        <span className="block text-xs text-gray-500">{subtitle}</span>
      </span>
      <svg
        className="h-5 w-5 shrink-0 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-vibez-orange"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  )
}

export default function FloatingContact() {
  const [open, setOpen] = useState(true)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  return (
    <div ref={rootRef} className="chat-widget fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={`w-[min(18rem,calc(100vw-2rem))] origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
          <div className="bg-gradient-to-br from-vibez-orange to-[#ff9f43] px-4 py-4 text-white">
            <p className="text-base font-bold">Xin chào! 👋</p>
            <p className="mt-1 text-sm text-white/90">Chúng tôi sẵn sàng hỗ trợ bạn</p>
          </div>
          <div className="space-y-2 p-3">
            <ChannelLink
              href={ZALO_URL}
              icon="/icons/zalo.svg"
              title="Chat qua Zalo"
              subtitle="Trả lời trong vài phút"
            />
            <ChannelLink
              href={MESSENGER_URL}
              icon="/icons/messenger.svg"
              title="Chat qua Messenger"
              subtitle="Nhắn qua Facebook"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Đóng chat' : 'Mở chat hỗ trợ'}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-vibez-orange to-[#ff9f43] text-white shadow-[0_8px_28px_rgba(242,140,40,0.55)] transition hover:scale-105 hover:shadow-[0_12px_36px_rgba(242,140,40,0.65)] active:scale-95"
      >
        {!open && <span className="chat-widget-pulse absolute inset-0 rounded-full bg-vibez-orange/50" />}
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-7 w-7" />}
      </button>
    </div>
  )
}
