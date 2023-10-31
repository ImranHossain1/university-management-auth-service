import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';
import { RedisClient } from './shared/redis';
import subscribeToEvents from './app/events';

// eslint-disable-next-line no-unused-vars
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });
    await mongoose.connect(config.database_url as string);
    console.log(`Database is connected successfully`);

    server = app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('Failed to connect database', err);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
  process.on('SIGTERM', () => {
    console.log('SIGTERM is received');
    if (server) {
      server.close();
    }
  });
}
bootstrap();
