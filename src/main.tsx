import React, {useState} from 'react';
import {AnimatedHero} from './AnimatedHero';
import {Cases} from './Cases';
import {createRoot} from 'react-dom/client';
import './style.css';
const asset=(n:number)=>`/assets/asset-${n}.png`;
const TELEGRAM_URL='https://t.me/svetaserm';
const platforms=[['Яндекс Карты',400,'/platforms/platform-0.png'],['Google Maps',200,'/platforms/platform-1.png'],['2ГИС',150,'/platforms/platform-2.png'],['Yell',200,'/platforms/platform-3.png'],['Zoon',250,'/platforms/platform-4.png'],['ПроДокторов',350,'/platforms/platform-5.png'],['Яндекс Услуги',350,'/platforms/platform-6.png'],['Яндекс Браузер',350,'/platforms/platform-7.png'],['Flamp',200,'/platforms/platform-8.png'],['DreamJob',300,'/platforms/platform-9.png'],['Докту',250,'/platforms/platform-10.png'],['Лемана Про',250,'/platforms/platform-11.png'],['Отзовик',350,'/platforms/platform-12.png'],['IRecommend',350,'/platforms/platform-13.png'],['Booking',250,'/platforms/platform-14.png']] as const;
const nav=[['Услуги','services'],['Кейсы','cases'],['Цены','prices'],['Как мы работаем','process'],['Вопросы','faq'],['Контакты','contact']];
const money=(v:number)=>new Intl.NumberFormat('ru-RU').format(v)+' ₽';
const benefits=[['Реальные люди\nи живые отзывы','Публикуем отзывы от активных пользователей с естественным поведением.'],['Рост рейтинга\nи продаж','Улучшаем репутацию, повышаем доверие и конверсию в заявки.'],['Любая география','Работаем по всей России — от крупных городов до регионов.'],['Поддержка\nи сопровождение','На связи на всех этапах: от подбора стратегии до отчёта по результатам.']];
const faqs=[
 [
  "Это безопасно? Не удалят ли отзывы?",
  "Мы заранее обсуждаем формат работы и даём гарантию на согласованные размещения — условия указаны в блоке выше. Правила и модерация у каждой площадки свои, поэтому нельзя обещать отсутствие проверки, но при удалении в гарантийный срок действуют согласованные условия замены."
 ],
 [
  "Могут ли заблокировать или удалить карточку?",
  "Нет. Работа с отзывами и статус карточки — не взаимосвязанные вещи: отзывы не становятся причиной блокировки, ограничения или удаления карточки."
 ],
 [
  "Сколько времени занимает размещение отзыва?",
  "Срок зависит от выбранной площадки, количества отзывов и согласованного графика публикаций."
 ],
 [
  "Можно ли выбрать текст отзывов?",
  "Да. Заранее обсуждаем тематику и важные детали, чтобы тексты соответствовали вашей задаче. При необходимости направим варианты на согласование до публикации."
 ],
 [
  "Вы работаете по всей России?",
  "Да, работаем с компаниями по всей России и помогаем как локальному, так и федеральному бизнесу."
 ],
 [
  "Какие способы оплаты?",
  "Оплата производится онлайн на согласованные реквизиты после выполнения заказа и получения отчёта. Способ оплаты согласуем заранее."
 ],
 [
  "Работаете с ИП и ООО? Можно ли получить чек?",
  "Да. Работаем с ИП и ООО: возможна оплата по безналичному расчёту на расчётный счёт. По согласованию предоставляем чек или подтверждающий документ об оплате."
 ]
];

function App(){
 const [menu,setMenu]=useState(false);const [rows,setRows]=useState([{platform:0,quantity:5}]);const [status,setStatus]=useState('');const [sending,setSending]=useState(false);
 const total=rows.reduce((s,r)=>s+platforms[r.platform][1]*r.quantity,0);
 const tg=(label='Написать в Telegram')=><a className="button outline" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"><span className="plane" aria-hidden="true">➤</span>{label}</a>;
 const logo=<img className="logo" src={asset(0)} alt="NETPROFIT — Digital Solutions Studio"/>;
 const calcApply=()=>{const text=rows.map(r=>`${platforms[r.platform][0]}: ${r.quantity} отзывов`).join(', ')+`. Итого: ${money(total)}`;const field=document.getElementById('task') as HTMLTextAreaElement;field.value=text;document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});field.focus({preventScroll:true});};
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();if(sending)return;
  const form=e.currentTarget;
  const data=Object.fromEntries(new FormData(form));
  const digits=String(data.phone).replace(/\D/g,'');
  if(digits.length<10||digits.length>15){setStatus('Введите корректный номер телефона: от 10 до 15 цифр.');return;}
  const endpoint=import.meta.env.VITE_LEAD_ENDPOINT || 'https://weathered-cell-98d7.moiseevasveta990.workers.dev/';
  setSending(true);setStatus('Отправляем…');
  try{
   const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:AbortSignal.timeout(15000)});
   const result=await res.json();
   if(!res.ok||result.ok!==true)throw new Error(typeof result.error==='string'?result.error:'Не удалось подтвердить отправку.');
   setStatus('Заявка отправлена. Спасибо! Мы свяжемся с вами.');form.reset();
  }catch(error){
   setStatus(error instanceof Error && error.name==='Error'?error.message:'Не удалось подтвердить отправку. Попробуйте позже или напишите нам в Telegram.');
  }finally{setSending(false);}
 }
 return <><header className="container header"><a href="#" aria-label="На главную">{logo}</a><button className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={()=>setMenu(!menu)}>{menu?'Закрыть':'Меню'} <span>☰</span></button><nav id="navigation" className={menu?'open':''}>{nav.map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav><div className="header-actions">{tg()}<a className="button" href="#prices">Рассчитать стоимость</a></div></header>
 <main className="container"><section className="hero" id="services"><div className="hero-copy"><div className="eyebrow"><i/>Публикация отзывов на всех площадках России</div><h1>Отзывы и репутация<br/><em>для вашего бизнеса</em></h1><p className="hero-description">Работаем с отзывами на крупнейших площадках: Яндекс Карты, Google Maps, 2ГИС, Zoon, Yell, ПроДокторов и других. Усиливаем репутацию, повышаем рейтинг и доверие клиентов.</p><div className="hero-perks">{['Без предоплаты','Отчёт после выполнения','Любая география','До 450 рублей за отзыв'].map((x,i)=><div key={x}><img src={`/assets/icon-${[2,0,5,9][i]}.png`} alt=""/>{x}</div>)}</div><div className="actions"><a className="button" href="#prices">Рассчитать стоимость <span>→</span></a>{tg()}</div></div><AnimatedHero/></section>
 <div className="platform-strip"><p>Работаем с ключевыми площадками,<br/>где клиенты ищут ваш бизнес:</p><div>{[0,2,1,3,4,5].map(i=><a className="platform-chip" key={i} href="#prices"><img src={platforms[i][2]} alt=""/>{platforms[i][0]}</a>)}</div></div>
 <section className="pricing section" id="prices"><div><h2>Накручиваем отзывы<br/>на популярных площадках</h2><p className="intro">Размещаем честные и качественные отзывы от реальных пользователей на всех ключевых площадках. Помогаем повысить рейтинг, доверие и привлечь новых клиентов.</p><div className="price-grid">{platforms.map(([name,price,img],i)=><button key={name} className="price-item" onClick={()=>setRows([{platform:i,quantity:5}])} aria-label={`Рассчитать ${name}, ${price} рублей за отзыв`}><img src={img} alt=""/><span>{name}</span><strong>{price} ₽</strong></button>)}</div><div className="platform-help"><p>Не нашли нужную площадку? <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Уточните в Telegram <span aria-hidden="true">↗</span></a></p><p className="platform-exclusion">С Авито не работаем.</p></div></div><aside className="calculator panel"><h3>Рассчитайте стоимость</h3><p>Выберите площадку, укажите количество отзывов и получите точную стоимость.</p>{rows.map((row,i)=><div className="calc-row" key={i}><label>Площадка<select aria-label={`Площадка ${i+1}`} value={row.platform} onChange={e=>setRows(rows.map((r,j)=>i===j?{...r,platform:Number(e.target.value)}:r))}>{platforms.map(([n],j)=><option key={n} value={j}>{n}</option>)}</select></label><label>Количество<input aria-label={`Количество отзывов ${i+1}`} type="number" min="1" max="10000" value={row.quantity} onChange={e=>setRows(rows.map((r,j)=>i===j?{...r,quantity:Math.min(10000,Math.max(1,Math.trunc(Number(e.target.value))))}:r))}/></label>{rows.length>1&&<button className="remove" onClick={()=>setRows(rows.filter((_,j)=>j!==i))} aria-label={`Удалить площадку ${i+1}`}>×</button>}</div>)}<button className="add" onClick={()=>setRows([...rows,{platform:0,quantity:5}])}>+ Добавить площадку</button><div className="total"><b>Итого:</b><strong>{money(total)}</strong></div><button className="button full" onClick={calcApply}>Узнать стоимость <span>→</span></button><ul className="checks"><li>Точный расчёт за 1 минуту</li><li>Без обязательств</li><li>Ответим в Telegram</li></ul></aside></section>
 <section className="section"><div className="section-heading"><h2>Ваш профиль — наша экспертиза</h2><p>Мы не просто размещаем отзывы, а комплексно работаем с репутацией бизнеса, чтобы она приносила реальный результат.</p></div><div className="benefits">{benefits.map(([title,desc],i)=><article key={title}><img src={`/benefits/benefit-${i}.png`} alt="" width="56" height="56" loading="lazy"/><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
 <Cases/>
 <section className="section guarantees"><h2>Мы уверены в результате</h2><div>{[['Честные отзывы\nбез риска','Работаем по белым методам.'],['Полный отчёт','Вы получите отчёт со ссылками на размещённые отзывы.'],['Гарантия площадок','Размещаем отзывы, которые проходят модерацию.']].map(([title,desc],i)=><article key={title}><img className="guarantee-icon" src={`/assets/icon-${i===1?0:7}.png`} alt=""/><div><h3>{title}</h3><p>{desc}</p></div></article>)}</div></section>
 <section className="section" id="process"><h2>Всего 5 простых шагов</h2><div className="steps">{[['Оставьте заявку','Расскажите о вашем бизнесе и задаче.'],['Согласуем детали','Подберём площадки, объём и сроки.'],['Подготовим контент','Создадим естественные и релевантные отзывы.'],['Опубликуем отзывы','Разместим их на выбранных площадках.'],['Предоставим отчёт','Отправим ссылки и результат в согласованные сроки.']].map(([title,desc],i)=><article key={title}><div className="step-number"><span>0{i+1}</span></div><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
 <section className="section faq" id="faq"><div><h2>Остались<br/>вопросы?</h2><p>Здесь — ответы на самые частые вопросы<br/>о размещении отзывов, сроках, гарантии<br/>и работе с площадками.</p>{tg()}</div><div className="panel accordion">{faqs.map(([q,a],i)=><details key={q} open={i===0?true:undefined}><summary>{q}<span/></summary><p>{a}</p></details>)}</div></section>
 <section className="section contact" id="contact"><div><h2>Обсудим ваш проект<br/><em>в Telegram?</em></h2><p className="contact-intro">Расскажем, как улучшить репутацию вашего бизнеса,<br/>подберём площадки и объём работ.</p><ul className="checks large">{['Быстрая консультация','Подбор стратегии','Индивидуальный расчёт','Сопровождение на всех этапах'].map(x=><li key={x}>{x}</li>)}</ul></div><form className="panel lead-form" onSubmit={submit}><h3>Связаться с нами</h3><p>Оставьте заявку — и мы ответим в Telegram<br/>в течение 15 минут.</p><label>Ваш номер телефона<input name="phone" type="tel" autoComplete="tel" placeholder="+7 (000) 000-00-00" required maxLength={22}/></label><label>Имя (необязательно)<input name="name" autoComplete="given-name" placeholder="Александр" maxLength={80}/></label><label>Опишите задачу<textarea id="task" name="task" placeholder="Например: нужно 20 отзывов на Яндекс Картах в Москве" rows={2} maxLength={3000}/></label><button className="button full" type="submit" disabled={sending} aria-busy={sending}>{sending?'Отправляем…':'Далее'} <span aria-hidden="true">→</span></button>{status&&<p className="form-notice" role="status">{status}</p>}</form></section></main>
 <footer className="container footer"><a href="#" aria-label="На главную">{logo}</a><nav>{nav.map(([n,id])=><a key={id} href={`#${id}`}>{n}</a>)}</nav>{tg()}<p>© 2024 NETPROFIT.<br/>Все права защищены.</p></footer></>;
}
createRoot(document.getElementById('root')!).render(<App/>);

