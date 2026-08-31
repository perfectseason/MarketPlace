import create from './http-services.ts';

export interface User {
   id: number;
   name: string;
}

export default create('/users');
