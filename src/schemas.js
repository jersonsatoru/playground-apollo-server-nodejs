const { gql } = require('apollo-server');

module.exports = gql`

type Student {
    id: ID!
    name: String!
    age: Int
}

type Query {
    students: [Student]!
    student(id: ID!): Student
}

input studentWhere {
    id: ID!
}

input createStudent {
    name: String!
    age: Int!
}

type Mutation {
    deleteStudent(where: studentWhere!): Student
    createStudent(data: createStudent!): Student
}

enum ModelMutationEnumType {
    UPDATED
    DELETED
    CREATED
}

input StudentSubscriptionFilter {
    mutation_in: [ ModelMutationEnumType! ]
}

type StudentSubscriptionPayload {
    mutation: ModelMutationEnumType
    node: Student
    previousValues: Student
}

type Subscription {
    student(where: StudentSubscriptionFilter!): StudentSubscriptionPayload
}

`;
