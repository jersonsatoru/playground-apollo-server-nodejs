const { ApolloServer, gql } = require('apollo-server')

const schema =  gql`
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
`

const students = [
    {
        id : 1,
        name: 'Jerson',
        age: 33
    },
    {
        id :2,
        name: 'Satoru',
        age: 16
    }
]
const resolvers = {
    Query: {
        students: () => students,
        student: (_, input) => {
            const a = students.find(s => s.id === parseInt(input.id, 10))
            console.log(input)
            return a
        }
    },
     Mutation: {
         deleteStudent: (root, input) => {
            console.log(input.where)
            const { id } = input.where
            const index = students.findIndex(s => s.id === parseInt(id, 10))
            console.log(index)
            if (index < 0) {
                return null
            }
            const removedStudent =  students.splice(index, 1)
            return removedStudent[0]
         },
         createStudent: (_, input) => {
             const { age, name } = input.data
             const id = students.length + 1
             const student = { age, name, id }
             students.push(student)
             return student
         }
     }
}

const app = new ApolloServer({
    typeDefs: schema,
    resolvers
})

app.listen(3000)
