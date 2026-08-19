self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Escuchar evento de alarma
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_ALARM') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/2928/2928883.png',
      vibrate: [500, 200, 500, 200, 800],
      tag: 'lunch-break-alarm',
      renotify: true,
      requireInteraction: true
    });
  }
});

// Al tocar la notificación, enfocar la app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});