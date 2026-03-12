const fs = require('fs');
const path = require('path');

const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');

try {
  fs.chmodSync(vitePath, '755');
  console.log('Vite binary is now executable');
} catch (err) {
  console.error('Failed to fix permissions', err);
}