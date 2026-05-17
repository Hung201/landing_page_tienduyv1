import { ZALO_URL, MESSENGER_URL } from '../config/contact.js'

function FloatButton({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="block h-[3.5rem] w-[3.5rem] overflow-hidden rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.35)] active:scale-95"
    >
      <img
        src={icon}
        alt=""
        width={56}
        height={56}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </a>
  )
}

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-3 sm:bottom-8 sm:right-6">
      <FloatButton href={ZALO_URL} label="Nhắn Zalo" icon="/icons/zalo.svg" />
      <FloatButton href={MESSENGER_URL} label="Nhắn Messenger" icon="/icons/messenger.svg" />
    </div>
  )
}
