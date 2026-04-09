const EventEmitter = require('events');

const appEvents = new EventEmitter();

console.log('Starting event-driven demo...');

appEvents.on('taskStarted', (taskName, createdBy) => {
  console.log(`[Listener 1] Task started: ${taskName} | Created by: ${createdBy}`);
});

appEvents.on('taskStarted', (taskName) => {
  console.log(`[Listener 2] Logging task start for audit: ${taskName}`);
});

appEvents.on('taskProgress', (taskName, percentage) => {
  console.log(`Progress update for ${taskName}: ${percentage}%`);
});

appEvents.on('taskCompleted', (taskName, durationMs) => {
  console.log(`Task completed: ${taskName} | Duration: ${durationMs}ms`);
  console.log('Event-driven workflow finished successfully.');
});

appEvents.emit('taskStarted', 'Generate Monthly Report', 'System Admin');

setTimeout(() => {
  appEvents.emit('taskProgress', 'Generate Monthly Report', 50);
}, 400);

setTimeout(() => {
  appEvents.emit('taskProgress', 'Generate Monthly Report', 100);
  appEvents.emit('taskCompleted', 'Generate Monthly Report', 900);
}, 900);
