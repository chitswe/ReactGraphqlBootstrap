/**
 * Created by ChitSwe on 1/2/17.
 */
import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
//import {resolver as resolver_CustomerOrderShipment} from './CustomerOrderShipment';
const Resolver={
    DateTime:new GraphQLScalarType({
        name: 'DateTime',
        description: 'Date time custom scalar type',
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value.toJSON(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        },
    }),
    Date:new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return (new Date(value)).dateOnly(); // value from the client
        },
        serialize(value) {
            return value.toDateOnlyJSON(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        },
    }),
    Query:{

    },
    Mutation:{


    }
};

export default  Resolver;