const header=document.querySelector("[data-header]");
const toggle=document.querySelector("[data-menu-toggle]");
const nav=document.querySelector("[data-nav]");
const year=document.querySelector("[data-year]");

if(year) year.textContent=new Date().getFullYear();

const syncHeader=()=>header?.classList.toggle("scrolled",window.scrollY>24);
syncHeader();
window.addEventListener("scroll",syncHeader,{passive:true});

toggle?.addEventListener("click",()=>{
  const open=toggle.getAttribute("aria-expanded")==="true";
  toggle.setAttribute("aria-expanded",String(!open));
  nav?.classList.toggle("open",!open);
  document.body.classList.toggle("menu-open",!open);
});

nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  toggle?.setAttribute("aria-expanded","false");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
}));

const revealEls=[...document.querySelectorAll(".reveal")];
if("IntersectionObserver" in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:"0px 0px -35px"});
  revealEls.forEach(el=>observer.observe(el));
}else{
  revealEls.forEach(el=>el.classList.add("visible"));
}

document.querySelectorAll("[data-accordion] details").forEach(detail=>{
  detail.addEventListener("toggle",()=>{
    if(!detail.open)return;
    document.querySelectorAll("[data-accordion] details").forEach(other=>{
      if(other!==detail)other.open=false;
    });
  });
});
