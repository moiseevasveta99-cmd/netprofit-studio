export type ContactKind='telegram'|'max'|'avito'|'whatsapp'|'email';

/** Consistent, transparent vector icons following the surrounding text color. */
export function ContactIcon({kind}:{kind:ContactKind}){
 return <svg className={`contact-icon contact-icon-${kind}`} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
 {kind==='telegram'&&<><path d="m21 3-4 18-6-6-4 3v-7L21 3Z"/><path d="m3 10 18-7-10 12-4-4-4-1Z"/></>}
 {kind==='max'&&<path d="M20.7 11.5a8.7 8.7 0 0 1-8.7 8.7c-1.5 0-2.9-.4-4.1-1.1L3 21l1.5-5a8.7 8.7 0 1 1 16.2-4.5Z"/>}
 {kind==='avito'&&<g fill="currentColor" stroke="none"><circle cx="7" cy="7" r="3.4"/><circle cx="17" cy="6.5" r="4"/><circle cx="6.5" cy="17" r="4"/><circle cx="17" cy="17" r="3.4"/></g>}
 {kind==='whatsapp'&&<><path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.5-4.6A9 9 0 1 1 21 11.5Z"/><path d="m8.1 7.3 1.7 2.5-1 1.3c.9 1.7 2.2 3 3.9 3.8l1.3-1 2.5 1.5c-.3 1.7-1.7 2.1-3.2 1.6-3.4-1.1-6-3.7-7-7.1-.4-1.2.2-2.3 1.8-2.6Z"/></>}
 {kind==='email'&&<><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 6 8.5 7L20.5 6"/></>}
 </svg>;
}
