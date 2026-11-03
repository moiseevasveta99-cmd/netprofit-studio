import {useEffect,useRef,useState} from 'react';
const cases=[
 {title:'Садовый инвентарь и техника',description:'Помогли компании в Яндекс-товарах поднять доверие покупателей и увеличить число опубликованных отзывов.',platform:'Яндекс Браузер',icon:'/platforms/platform-7.png',before:'2.9',after:'4.1',beforeCount:'495 отзывов',afterCount:'565 отзывов',results:['+1.2 к рейтингу','+70 отзывов'],image:'/cases/garden.png'},
 {title:'Интернет-магазин входных металлических дверей',description:'Убрали слабое впечатление в карточке компании и усилили доверие к бренду через рост рейтинга в 2ГИС.',platform:'2ГИС',icon:'/platforms/platform-2.png',before:'2.5',after:'4.9',beforeCount:'10 оценок',afterCount:'123 оценки',results:['рейтинг вырос в 2 раза','+113 оценок'],image:'/cases/doors.png'},
];
function Stars({rating}:{rating:string}){
 return <span className="case-stars" aria-label={`Рейтинг ${rating} из 5`}><span aria-hidden="true">★★★★★</span><span aria-hidden="true" className="case-stars-fill" style={{width:`${Number(rating)/5*100}%`}}>★★★★★</span></span>;
}
export function Cases(){
 const [selected,setSelected]=useState<number|null>(null);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{
  if(selected===null)return;
  const modal=dialog.current;if(!modal)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';modal.showModal();
  return()=>{modal.close();document.body.style.overflow=previousOverflow;};
 },[selected]);
 return <section id="cases" className="section"><div className="section-heading"><h2>Не обещания. Примеры работы.</h2><p>Показываем реальные результаты наших клиентов. Прозрачные цифры — лучший аргумент.</p></div><div className="cases updated-cases">
 {cases.map((item,i)=><article className="panel case" key={item.title}>
  <div className="case-top"><span>Кейс 0{i+1}</span><div><img src={item.icon} alt=""/>{item.platform}</div></div>
  <h3>{item.title}</h3><p className="case-description">{item.description}</p>
  <div className="ratings"><div><small className="rating-label">Было</small><strong>{item.before}</strong><Stars rating={item.before}/><small className="rating-count">{item.beforeCount}</small></div><span aria-hidden="true">→</span><div className="after"><small className="rating-label">Стало</small><strong>{item.after}</strong><Stars rating={item.after}/><small className="rating-count">{item.afterCount}</small></div></div>
  <div className="case-results">{item.results.map(result=><b key={result}>{result}</b>)}</div>
  <button className="button outline accent read-case" onClick={()=>setSelected(i)} aria-haspopup="dialog" aria-label={`Читать кейс: ${item.title}`}>Читать кейс <span aria-hidden="true">→</span></button>
 </article>)}
 <article className="panel more-cases"><img className="document-icon" src="/cases/document-transparent.png" width="50" height="50" alt=""/><h3>Нужно больше примеров?</h3><p>Расскажем о других проектах<br/>в вашей нише и покажем результаты.</p><a className="button outline accent" href="#contact">Запросить кейсы →</a></article>
 </div>
 <dialog className="case-viewer" ref={dialog} onClose={()=>setSelected(null)} aria-labelledby="case-viewer-title" onClick={e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)setSelected(null);}}>
 {selected!==null&&<><div className="case-viewer-header"><h3 id="case-viewer-title">{cases[selected].title}</h3><button className="case-viewer-close" onClick={()=>setSelected(null)} aria-label="Закрыть кейс" autoFocus>×</button></div><div className="case-viewer-content"><img src={cases[selected].image} alt={`Кейс «${cases[selected].title}»: рейтинг ${cases[selected].before} → ${cases[selected].after}, ${cases[selected].beforeCount} → ${cases[selected].afterCount}`}/></div></>}
 </dialog>
 </section>;
}
