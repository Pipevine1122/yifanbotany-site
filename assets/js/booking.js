/* A preferred-time request until the owner's live calendar is connected. */
(() => {
  document.querySelectorAll('[data-booking]').forEach((widget) => {
    const zone = widget.dataset.timezone;
    const partsAt = (date) => Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: zone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(date).map((part) => [part.type, part.value]));
    const dateKey = (parts) => `${parts.year}-${parts.month}-${parts.day}`;
    const initial = partsAt(new Date());
    const zoneName = new Intl.DateTimeFormat('en-US', {timeZone: zone, timeZoneName: 'longGeneric'}).formatToParts(new Date()).find((part) => part.type === 'timeZoneName').value;
    widget.querySelector('.calendar-zone').textContent = zoneName;
    let month = new Date(Date.UTC(Number(initial.year), Number(initial.month) - 1, 1));
    let selected;
    const grid = widget.querySelector('.calendar-days');
    const heading = widget.querySelector('.calendar-month');
    const previous = widget.querySelector('.calendar-prev');
    const next = widget.querySelector('.calendar-next');
    const form = widget.querySelector('.booking-form');
    const time = form.elements.time;
    const topic = form.elements.topic;
    const format = form.elements.format;
    const formatNote = form.querySelector('.meeting-format-note');
    const feedback = widget.querySelector('.booking-feedback');
    const dateLabel = (key) => new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    }).format(new Date(`${key}T12:00:00Z`));
    const render = () => {
      const today = dateKey(partsAt(new Date()));
      heading.textContent = new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'long', year: 'numeric'}).format(month);
      previous.disabled = month.toISOString().slice(0, 7) <= today.slice(0, 7);
      grid.replaceChildren();
      for (let pad = 0; pad < month.getUTCDay(); pad++) {
        const blank = document.createElement('span');
        blank.setAttribute('aria-hidden', 'true');
        grid.append(blank);
      }
      const days = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
      for (let day = 1; day <= days; day++) {
        const key = `${month.toISOString().slice(0, 7)}-${String(day).padStart(2, '0')}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = day;
        button.dataset.date = key;
        button.disabled = key < today;
        button.setAttribute('aria-label', dateLabel(key));
        button.setAttribute('aria-pressed', String(key === selected));
        if (key === today) button.setAttribute('aria-current', 'date');
        button.addEventListener('click', () => {
          selected = key;
          grid.querySelectorAll('button').forEach((dayButton) => dayButton.setAttribute('aria-pressed', String(dayButton === button)));
          form.hidden = false;
          form.querySelector('.booking-date').textContent = new Intl.DateTimeFormat('en-US', {timeZone: 'UTC', month: 'long', day: 'numeric'}).format(new Date(`${key}T12:00:00Z`));
          time.setCustomValidity('');
          feedback.textContent = '';
          time.focus();
        });
        grid.append(button);
      }
    };
    previous.addEventListener('click', () => { month.setUTCMonth(month.getUTCMonth() - 1); render(); });
    next.addEventListener('click', () => { month.setUTCMonth(month.getUTCMonth() + 1); render(); });
    time.addEventListener('input', () => time.setCustomValidity(''));
    topic.addEventListener('input', () => topic.setCustomValidity(''));
    form.querySelectorAll('[name="format"]').forEach((choice) => {
      choice.addEventListener('change', () => {
        formatNote.textContent = format.value === 'in-person' ? widget.dataset.workspace : 'Zoom link shared after confirmation.';
        formatNote.hidden = false;
      });
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!selected) return;
      if (!['in-person', 'zoom'].includes(format.value)) {
        form.reportValidity();
        return;
      }
      const now = partsAt(new Date());
      if (`${selected}T${time.value}` <= `${dateKey(now)}T${now.hour}:${now.minute}`) {
        time.setCustomValidity('Please suggest a future time.');
        time.reportValidity();
        return;
      }
      if (!topic.value.trim()) {
        topic.setCustomValidity('Please add a short note.');
        topic.reportValidity();
        return;
      }
      const meetingPlace = format.value === 'in-person' ? `In person at ${widget.dataset.workspace}` : 'Zoom';
      const body = `Hi Yifan,\n\nCould we meet on ${dateLabel(selected)} at ${time.value} (${zone})?\n\nPreferred format: ${meetingPlace}\n\n${topic.value.trim()}\n\nPlease let me know if this time works for you.`;
      const mail = `mailto:${widget.dataset.email}?subject=${encodeURIComponent('Meeting request')}&body=${encodeURIComponent(body)}`;
      const emailLink = document.createElement('a');
      emailLink.href = mail;
      emailLink.textContent = 'Open the email again';
      feedback.replaceChildren('Send the request from your email app. If it didn’t open, ', emailLink);
      emailLink.click();
    });
    render();
    widget.hidden = false;
  });
})();
