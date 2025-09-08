(function(){
  function setShareLinks() {
    var url = window.location.href;
    var title = document.title || '';

    var input = document.getElementById('postUrl');
    if(input) input.value = url;

    var fb = document.getElementById('shareFacebook');
    var tw = document.getElementById('shareTwitter');
    var wa = document.getElementById('shareWhatsApp');

    if(fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url);
    if(tw) tw.href = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
    if(wa) wa.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(title + ' ' + url);

    var p = document.getElementById('sharePinterest');
    var li = document.getElementById('shareLinkedIn');
    var re = document.getElementById('shareReddit');
    var te = document.getElementById('shareTelegram');
    var em = document.getElementById('shareEmail');

    if(p) p.href = 'https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(url);
    if(li) li.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url);
    if(re) re.href = 'https://www.reddit.com/submit?url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
    if(te) te.href = 'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title);
    if(em) em.href = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(url+ '\n\n' + title);
  }

  window.openModal = function(){
    var modal = document.getElementById('shareModal');
    if(modal){ modal.style.display = 'flex'; document.body.style.overflow = 'hidden'; }
  };
  window.closeModal = function(){
    var modal = document.getElementById('shareModal');
    if(modal){ modal.style.display = 'none'; document.body.style.overflow = ''; }
  };

  window.copyPostUrl = function(){
    var input = document.getElementById('postUrl');
    var text = input ? input.value : window.location.href;
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ alert('Enlace copiado al portapapeles'); }, function(){ fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
    function fallbackCopy(txt){
      try {
        if(input){ input.select(); document.execCommand('copy'); alert('Enlace copiado al portapapeles'); }
        else { prompt('Copia este enlace:', txt); }
      } catch(e) { prompt('Copia este enlace:', txt); }
    }
  };

  window.shareNative = function(){
    var url = window.location.href;
    var title = document.title || '';
    if(navigator.share){
      navigator.share({ title: title, url: url }).catch(function(){});
    } else {
      openModal();
    }
  };

  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
  document.addEventListener('click', function(e){
    var modal = document.getElementById('shareModal');
    if(modal && e.target === modal) closeModal();
  });

  document.addEventListener('DOMContentLoaded', setShareLinks);
  setShareLinks();
})();
