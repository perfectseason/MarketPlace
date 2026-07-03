import concurrently from 'concurrently';

concurrently([
   {
      name: 'server',
      command: 'python  manage.py runserver',
      cwd: 'packages/server',
      prefixColor: 'cyan',
   },

   {
      name: 'client',
      command: 'npm run dev',
      cwd: 'packages/client',
      prefixColor: 'green',
   },
]);
