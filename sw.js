self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_ALARM') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/2928/2928883.png',
      vibrate: [500, 200, 500, 200, 800],
      tag: event.data.tag || 'work-alarm',
      renotify: true,
      requireInteraction: true
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
