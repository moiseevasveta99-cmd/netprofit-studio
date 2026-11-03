import {publicAsset} from './publicAsset';
import React, {useEffect, useRef} from 'react';

/** One scene, not a boxed illustration. Originals remain the reduced-motion fallback. */
export function AnimatedHero(){
 const scene=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=scene.current;if(!node)return;
  let disposed=false;
  // Start the sequence only after all foreground assets have decoded.
  Promise.allSettled(Array.from(node.querySelectorAll<HTMLImageElement>('.scene-object img')).map(img=>img.decode()))
   .then(()=>{if(!disposed)node.dataset.ready='true';});
  const observer=new IntersectionObserver(([entry])=>{node.dataset.paused=String(!entry.isIntersecting);});
  observer.observe(node);const visibility=()=>{node.dataset.paused=String(document.hidden);};
  document.addEventListener('visibilitychange',visibility);
  return()=>{disposed=true;observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
 },[]);
 const move=(e:React.PointerEvent<HTMLDivElement>)=>{
  if(e.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const r=e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--px',String(((e.clientX-r.left)/r.width-.5)*2));
  e.currentTarget.style.setProperty('--py',String(((e.clientY-r.top)/r.height-.5)*2));
 };
 const reset=()=>{scene.current?.style.setProperty('--px','0');scene.current?.style.setProperty('--py','0');};
 return <div ref={scene} className="hero-scene" onPointerMove={move} onPointerLeave={reset} role="img" aria-label="Ноутбук NetProfit на скалах, карточка отзыва и парящие значки Яндекс, 2ГИС и Google Maps">
  <div className="scene-stage">
   <picture className="scene-original"><source media="(max-width:760px)" srcSet={publicAsset('/assets/asset-15.png')}/><img src={publicAsset('/assets/asset-14.png')} alt="" fetchPriority="high"/></picture>
   <div className="scene-background"/>
   <div className="scene-atmosphere" aria-hidden="true"><div className="smoke smoke-one"/><div className="smoke smoke-two"/><div className="smoke smoke-three"/></div>
   {['laptop','review','yandex','2gis','google'].map((name,i)=><div className={`scene-object scene-${name}`} key={name} style={{'--arrival':`${[0,450,850,1200,1550][i]}ms`,'--depth':[0,-4,5,7,-5][i],'--phase':`${-i*1.7}s`} as React.CSSProperties}><div className="scene-parallax"><div className="scene-float"><img src={publicAsset(`/hero/${name}.png`)} alt="" draggable={false} fetchPriority={i===0?'high':'auto'}/></div></div></div>)}
  </div>
 </div>;
}
