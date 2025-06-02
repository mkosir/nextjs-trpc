import { ObjectId } from 'mongodb';
import { z } from 'zod';

import { clientPromise } from '@/db/mongodb';
import type { Todo } from '@/db/types';

import { baseProcedure, createTRPCRouter } from '../init';

export const todoRouter = createTRPCRouter({
  list: baseProcedure.query(async (): Promise<Array<Todo>> => {
    const client = await clientPromise;
    const db = client.db();
    const todos = await db.collection<Todo>('todos').find().toArray();
    return todos;
  }),

  add: baseProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const client = await clientPromise;
      const db = client.db();
      const newTodo = {
        title: input.title,
        description: input.description,
        completed: false,
      };
      const result = await db.collection('todos').insertOne(newTodo);
      return {
        _id: result.insertedId,
        ...newTodo,
      };
    }),

  toggle: baseProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    const client = await clientPromise;
    const db = client.db();
    const todos = db.collection<Todo>('todos');
    const objectId = new ObjectId(input.id);

    const updatedTodo = await todos.findOneAndUpdate(
      { _id: objectId },
      [{ $set: { completed: { $not: '$completed' } } }],
      { returnDocument: 'after' },
    );

    if (!updatedTodo) {
      throw new Error('Todo not found');
    }

    return updatedTodo;
  }),
});
