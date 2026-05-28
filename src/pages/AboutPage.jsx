import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Logo from '../components/Logo.jsx'
import { fetchSiteSettings } from '../lib/content.js'

const PLACEHOLDER = 'Viết background kinh nghiệm ở đây'

const DEFAULT_MISSION =
  'Đội ngũ sáng lập của VibeZ là sự kết hợp của năm thành viên với chuyên môn bổ trợ lẫn nhau, tạo thành một bộ máy quản trị toàn diện từ chiến lược, vận hành, sản phẩm đến tài chính và truyền thông.'

function ImageBlock({ className = '' }) {
  return <div className={`rounded-[24px] bg-[#c6e6ff] ${className}`} role="img" aria-label="Ảnh minh họa" />
}

export default function AboutPage() {
  const [missionText, setMissionText] = useState(DEFAULT_MISSION)

  useEffect(() => {
    fetchSiteSettings().then((s) => {
      if (s?.mission_text) setMissionText(s.mission_text)
    })
  }, [])

  return (
    <Layout>
      <div className="bg-vibez-warm">
        {/* Tiêu đề trang */}
        <section className="px-4 pt-12 sm:px-6 md:pt-16">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-3xl font-bold text-vibez-orange md:text-4xl">Giới thiệu</h1>
            <div className="mx-auto mt-4 h-[3px] w-full max-w-4xl rounded-full bg-vibez-sky-deep" />
          </div>
        </section>

        {/* Giới thiệu về VibeZ */}
        <section className="px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Giới thiệu về VibeZ</h2>
            <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <ImageBlock className="aspect-[4/3] w-full min-h-[240px] md:min-h-[300px]" />
              <div>
                <p className="text-base leading-relaxed text-gray-900">{PLACEHOLDER}</p>
                <Link
                  to="/lien-he"
                  className="mt-6 inline-block rounded-full bg-[#2691e5] px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:brightness-110"
                >
                  Liên hệ tư vấn
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Thành viên — layout đảo */}
        <section className="px-4 py-4 sm:px-6 md:py-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Thành viên trong nhóm</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-900">{PLACEHOLDER}</p>
              </div>
              <ImageBlock className="aspect-[4/3] w-full min-h-[240px] md:min-h-[300px]" />
            </div>
          </div>
        </section>

        {/* Thành viên — khối chồng + khối ngang */}
        <section className="px-4 py-12 sm:px-6 md:py-16">
          <div className="mx-auto grid max-w-6xl items-stretch gap-8 md:grid-cols-2 md:gap-10">
            <div className="relative min-h-[280px] sm:min-h-[320px]">
              <div className="absolute inset-x-4 top-0 h-[85%] rounded-[24px] bg-[#c6e6ff]" />
              <div className="absolute inset-x-0 bottom-0 top-10 flex items-center justify-center rounded-[24px] bg-[#2691e5] px-6 py-10 sm:top-14">
                <p className="text-center text-base font-medium leading-relaxed text-white sm:text-lg">
                  {PLACEHOLDER}
                </p>
              </div>
            </div>
            <div className="flex min-h-[280px] items-start rounded-[24px] bg-[#c6e6ff] p-8 sm:min-h-[320px] sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Thành viên trong nhóm</h2>
            </div>
          </div>
        </section>

        {/* Sứ mệnh */}
        <section className="px-4 pb-16 pt-4 sm:px-6 md:pb-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-2xl font-bold text-gray-900 md:text-3xl">Sứ mệnh của VibeZ</h2>
            <div className="mt-10 grid items-center gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-10 lg:gap-14">
              <p className="text-sm leading-relaxed text-gray-800 md:text-base">{missionText}</p>
              <div className="mx-auto h-1 w-16 bg-vibez-orange md:mx-0 md:h-28 md:w-1" aria-hidden />
              <div className="flex justify-center md:justify-end">
                <Logo variant="horizontal" linked={false} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
