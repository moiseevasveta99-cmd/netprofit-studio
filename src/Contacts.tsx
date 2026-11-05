import {useEffect,useRef} from 'react';
import {contactChannels} from './contactChannels';
import {ContactIcon} from './ContactIcon';

type Channel=typeof contactChannels[number];
function ChannelLink({channel,className='',children}:{channel:Channel;className?:string;children?:React.ReactNode}){
 const content=<><ContactIcon kind={channel.id}/>{children || <span className="contact-link-label">{channel.label}</span>}</>;
 return channel.href ? <a className={className} href={channel.href} target={channel.id==='email'?undefined:'_blank'} rel={channel.id==='email'?undefined:'noopener noreferrer'}>{content}</a> : <button type="button" className={`${className} contact-pending`} disabled title="Контакт пока не указан">{content}</button>;
}
export function HeaderContacts(){
 const dropdown=useRef<HTMLDetailsElement>(null);
 useEffect(()=>{
  const outside=(e:PointerEvent)=>{if(dropdown.current&&!dropdown.current.contains(e.target as Node))dropdown.current.open=false;};
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'&&dropdown.current?.open){dropdown.current.open=false;dropdown.current.querySelector('summary')?.focus();}};
  document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
 },[]);
 return <div className="header-contacts"><ChannelLink channel={contactChannels[0]} className="button telegram-primary">Написать в Telegram</ChannelLink><details className="header-contact-menu" ref={dropdown}><summary>Ещё контакты <span aria-hidden="true">⌄</span></summary><div className="contact-dropdown">{contactChannels.slice(1).map(channel=><ChannelLink key={channel.id} channel={channel} className={`dropdown-contact priority-${channel.priority}`}/>)}</div></details></div>;
}
export function ContactSection(){
 return <section className="section contact-hub" id="contact" aria-labelledby="contacts-title"><div className="contact-hub-copy"><h2 id="contacts-title" tabIndex={-1}>Обсудим ваш проект<br/><em>в Telegram?</em></h2><p>Подберём площадки, ответим на вопросы<br/>и рассчитаем стоимость.</p><div className="contact-main-action"><ChannelLink channel={contactChannels[0]} className="button telegram-primary">Написать в Telegram</ChannelLink><span className="telegram-handle">@svetaserm</span></div></div><div className="contact-options"><h3>Выберите удобный способ связи</h3><div className="secondary-contacts">{contactChannels.filter(c=>c.priority==='secondary').map(channel=><ChannelLink key={channel.id} channel={channel} className="button outline"/>)}</div><div className="quiet-contacts"><p>Другие способы связи</p><div>{contactChannels.filter(c=>c.priority==='quiet').map(channel=><ChannelLink key={channel.id} channel={channel} className="quiet-contact"/>)}</div></div></div><a className="request-jump" href="#request">Или оставьте заявку ниже <span aria-hidden="true">↓</span></a></section>;
}
export function FooterContacts(){
 return <div className="footer-contacts"><h3>Контакты</h3>{contactChannels.map(channel=><ChannelLink key={channel.id} channel={channel} className={`footer-contact priority-${channel.priority}`}><span className="footer-contact-label">{channel.label}{channel.id==='telegram'&&<small>@svetaserm</small>}</span></ChannelLink>)}</div>;
}
