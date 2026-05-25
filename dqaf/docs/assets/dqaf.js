(function () {
  'use strict';

  var REPO = 'CVEProject/consumer-working-group';

  var LABEL_MAP = {
    'process.md':        'doc:process',
    'roles.md':          'doc:roles',
    'canonical-tasks.md':'doc:canonical-tasks',
    'task-purposes.md':  'doc:task-purposes'
  };

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function assignParagraphIds(container) {
    var currentSlug = 'top';
    var paraCount = 0;
    var elements = Array.prototype.slice.call(
      container.querySelectorAll('h1, h2, h3, p')
    );

    elements.forEach(function (el) {
      var tag = el.tagName;

      if (tag === 'H1') {
        return; // document title — not a reviewable section
      }

      if (tag === 'H2' || tag === 'H3') {
        currentSlug = slugify(el.textContent.trim());
        paraCount = 0;
        return;
      }

      if (tag === 'P') {
        if (el.closest('table')) return;
        if (el.id) return;
        if (!el.textContent.trim()) return;

        paraCount++;
        el.id = currentSlug + '-p' + String(paraCount).padStart(2, '0');
      }
    });
  }

  function injectCommentButtons(container, documentFile) {
    var paras = Array.prototype.slice.call(container.querySelectorAll('p[id]'));

    paras.forEach(function (para) {
      var paraId   = para.id;
      var paraText = para.textContent.trim();

      var title = 'Feedback: ' + documentFile + ' ¶' + paraId;
      var body  = [
        'Document: ' + documentFile,
        'Paragraph: ' + paraId,
        '',
        '> ' + paraText,
        '',
        '---',
        '',
        '<!-- Add your comment below -->'
      ].join('\n');

      var issueUrl = 'https://github.com/' + REPO + '/issues/new'
        + '?title=' + encodeURIComponent(title)
        + '&body='  + encodeURIComponent(body);

      var wrapper = document.createElement('div');
      wrapper.className = 'para-wrap';
      para.parentNode.insertBefore(wrapper, para);
      wrapper.appendChild(para);

      var btn = document.createElement('a');
      btn.className = 'comment-btn';
      btn.href = issueUrl;
      btn.target = '_blank';
      btn.rel = 'noopener noreferrer';
      btn.setAttribute('aria-label', 'Comment on this paragraph');
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/></svg>';

      wrapper.appendChild(btn);
    });
  }

  function renderIssueBadges(container, documentFile, issueData) {
    var docData  = issueData[documentFile] || {};
    var docLabel = LABEL_MAP[documentFile] || '';

    Object.keys(docData).forEach(function (paraId) {
      var para = document.getElementById(paraId);
      if (!para) return;

      var issues      = docData[paraId];
      var openCount   = (issues.open   || []).length;
      var closedCount = (issues.closed || []).length;
      if (openCount === 0) return;

      var wrapper = para.closest('.para-wrap') || para.parentNode;

      var searchQuery = 'is:issue is:open "¶' + paraId + '" in:title';
      if (docLabel) searchQuery += ' label:' + docLabel;

      var badge = document.createElement('a');
      badge.className = 'issue-badge';
      badge.href = 'https://github.com/' + REPO + '/issues?q=' + encodeURIComponent(searchQuery);
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      badge.textContent = String(openCount);
      badge.title = openCount + ' open' + (closedCount > 0 ? ', ' + closedCount + ' closed' : '');
      badge.setAttribute('aria-label',
        openCount + ' open issue' + (openCount !== 1 ? 's' : '') + ' for this paragraph');

      wrapper.appendChild(badge);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var docEl = document.querySelector('[data-document]');
    if (!docEl) return;

    var documentFile = docEl.getAttribute('data-document');
    var issueData    = window.paragraphIssues || {};

    assignParagraphIds(docEl);
    injectCommentButtons(docEl, documentFile);
    renderIssueBadges(docEl, documentFile, issueData);
  });
}());
