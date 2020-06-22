import app from './app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log('\napi running in: http://localhost:3333/\n'),
);
