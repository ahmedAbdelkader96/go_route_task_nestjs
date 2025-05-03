import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with dynamic origin handling
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = ['http://localhost:5173','https://go-route-task-reactjs.vercel.app']; // Add your frontend origin(s) here
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Apply global filters, interceptors, and pipes
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  // Listen on the dynamic port assigned by Vercel or fallback to 3000
  await app.listen(process.env.PORT || 3000); 
  //console.log(`/////////////////////////////////***********Application is running on: ${await app.getUrl()}`);
}

bootstrap();