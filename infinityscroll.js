document.addEventListener("DOMContentLoaded",function(){
  var a=document.querySelector("a.blog-pager-older-link");
  if(!a)return;
  var b=!1,c=document.querySelector("#Blog1"),
  d=function(){
    if(!b&&a){
      b=!0;
      var d=document.createElement("div");
      d.id="inf-loader",d.innerHTML="<p style='text-align:center;'>Memuat...</p>";
      c.appendChild(d);
      fetch(a.href).then(a=>a.text()).then(e=>{
        var f=(new DOMParser).parseFromString(e,"text/html");
        c.insertAdjacentHTML("beforeend",f.querySelector("#Blog1").innerHTML);
        var g=f.querySelector("a.blog-pager-older-link");
        g?a.href=g.href:a=null,d.remove(),b=!1;
      });
    }
  };
  window.addEventListener("scroll",()=>{window.scrollY+window.innerHeight>=document.body.scrollHeight-300&&d();});
});
