import 'colors';

import app from './app.js';
import connectDB from './config/db.js';

app.set('port', process.env.PORT || 4400);

const server = app.listen(app.get('port'), async () => {
  await connectDB();
  console.log(`Server running at → ${server.address().port}`.blue.bold);
});
