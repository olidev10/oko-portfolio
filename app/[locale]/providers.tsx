'use client'
// app/[locale]/client/layout.tsx
import { PropsWithChildren } from 'react'
import { I18nProviderClient } from '@/locales/client'
 
// If you are using Next.js < 15, you don't need to await `params`:
// export default function SubLayout({ params: { locale }, children }: { params: { locale: string }, children: ReactElement }) {
export const Providers = (props: PropsWithChildren<{locale: string}>) => {
  // const { locale } = await params
 
  return (
    <I18nProviderClient locale={props.locale}>
      {props.children}
    </I18nProviderClient>
  )
}