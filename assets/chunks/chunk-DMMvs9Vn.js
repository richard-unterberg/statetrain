import{F as i,u as r,r as c,j as a,B as u,S as h,P as x}from"./chunk-CAH7mpnC.js";const k=i.h4`
  text-2xl
  text-light
`,m=({className:l,...n})=>{const{isPlaying:s,handlePlay:t,handleStop:e}=r(),o=c.useCallback(()=>{s?e():t()},[t,e,s]);return a.jsx(u,{className:`${s?"bg-warningDark":"bg-successDark animate-pulse"} ${l}`,onClick:o,icon:s?a.jsx(h,{className:"w-3 h-3",strokeWidth:4}):a.jsx(x,{className:"w-3 h-3",strokeWidth:4}),...n,children:s?"Stop":"Play"})};export{k as H,m as I};
