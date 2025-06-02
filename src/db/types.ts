import type { ObjectId } from 'mongodb';

export type Todo = {
  _id: ObjectId;
  title: string;
  description: string;
  completed: boolean;
};

export type Todos = ReadonlyArray<Todo>;
