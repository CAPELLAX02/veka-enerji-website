// Static-site form handling: validates in the browser and hands the message to the
// visitor's e-mail client. To use a form backend (Formspree, Netlify Forms, own API…),
// give the <form> an `action` URL — it will then be POSTed with fetch instead.
(() => {
  document.querySelectorAll('form[data-mail-form]').forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const setStatus = (type, text) => {
      if (!status) return;
      status.hidden = false;
      status.dataset.type = type;
      status.textContent = text;
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const action = form.getAttribute('action');

      if (action) {
        const button = form.querySelector('[type="submit"]');
        button.disabled = true;
        try {
          const res = await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(res.statusText);
          form.reset();
          setStatus('success', 'Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.');
        } catch {
          setStatus('error', 'Gönderim sırasında bir sorun oluştu. Lütfen info@vekaenerji.com adresine yazın.');
        } finally {
          button.disabled = false;
        }
        return;
      }

      const to = form.dataset.mailTo || 'info@vekaenerji.com';
      const subject = `${form.dataset.mailSubject || 'Web sitesi mesajı'} — ${data.get('ad') || ''}`.trim();
      const fields = new Map();
      form.querySelectorAll('[name]').forEach((el) => {
        if (el.type === 'checkbox' || el.name === 'mesaj' || fields.has(el.name)) return;
        fields.set(el.name, el.dataset.label || el.name);
      });
      const labels = [...fields].map(([name, label]) => `${label}: ${data.get(name) || '-'}`);
      const body = `${labels.join('\n')}\n\n${data.get('mesaj') || ''}`;
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('success', 'E-posta uygulamanız açılıyor. Mesajınızı gönderdikten sonra en kısa sürede size dönüş yapacağız.');
    });
  });
})();
