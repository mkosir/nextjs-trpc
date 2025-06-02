import { ObjectId } from 'mongodb';
import { describe, expect, it, vi } from 'vitest';

import { todoRouter } from '../todo';

vi.mock('@/db/mongodb', () => ({
  clientPromise: Promise.resolve({
    db: () => ({
      collection: () => ({
        find: vi.fn().mockReturnValue({
          toArray: () =>
            Promise.resolve([
              { _id: new ObjectId(), title: 'Test Todo', description: 'Test Description', completed: false },
            ]),
        }),
        insertOne: vi.fn().mockReturnValue({
          insertedId: new ObjectId('507f1f77bcf86cd799439011'),
        }),
        findOneAndUpdate: vi.fn().mockReturnValue({
          _id: new ObjectId('507f1f77bcf86cd799439011'),
          title: 'Test Todo',
          description: 'Test Description',
          completed: true,
        }),
      }),
    }),
  }),
}));

describe('Todo Router', () => {
  it('should create a new todo when valid input is provided', async () => {
    const caller = todoRouter.createCaller({});
    const result = await caller.add({
      title: 'Test Todo',
      description: 'Test Description',
    });

    expect(result).toEqual({
      _id: expect.any(ObjectId),
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
    });
  });

  it('should toggle completion status when todo exists', async () => {
    const caller = todoRouter.createCaller({});
    const result = await caller.toggle({
      id: '507f1f77bcf86cd799439011',
    });

    expect(result).toEqual({
      _id: expect.any(ObjectId),
      title: 'Test Todo',
      description: 'Test Description',
      completed: true,
    });
  });
});
