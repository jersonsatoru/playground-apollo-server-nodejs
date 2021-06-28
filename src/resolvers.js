const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const students = [
  {
    id: 1,
    name: 'Jerson',
    age: 33,
  },
  {
    id: 2,
    name: 'Satoru',
    age: 16,
  },
];

module.exports = {
  Query: {
    students: () => students,
    student: (_, input) => students.find((s) => s.id === parseInt(input.id, 10)),
  },
  Mutation: {
    deleteStudent: (root, input) => {
      const { id } = input.where;
      const index = students.findIndex((s) => s.id === parseInt(id, 10));
      if (index < 0) {
        return null;
      }
      const removedStudent = students.splice(index, 1);

      pubsub.publish('student_DELETED', {
        student: {
          mutation: 'DELETED',
          node: removedStudent[0],
          previousValues: removedStudent[0],
        },
      });

      return removedStudent[0];
    },
    createStudent: (_, input) => {
      const { age, name } = input.data;
      const id = students.length + 1;
      const student = { age, name, id };
      students.push(student);

      pubsub.publish('student_CREATED', {
        student: {
          mutation: 'CREATED',
          node: student,
          previousValues: null,
        },
      });

      return student;
    },
  },
  Subscription: {
    student: {
      subscribe: (root, args) => {
        const eventNames = args.where.mutation_in.map((eventName) => `student_${eventName}`);
        return pubsub.asyncIterator(eventNames);
      },
    },
  },
};
