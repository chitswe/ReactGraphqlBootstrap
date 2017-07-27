/**
 * Created by ChitSwe on 12/21/16.
 */
//import {type as type_CustomerOrderShipment,query as query_CustomerOrderShipment,mutation as mutation_CustomerOrderShipment} from './CustomerOrderShipment';

const Schema=`
    scalar DateTime
    scalar Date
    
    type error{
        key:String
        message:String!
    }

    type pagination{
        page:Int!
        pageSize:Int!
        hasMore:Boolean!
        totalRows:Int!
        totalPages:Int!
    }

    input paginationCriteria{
        page:Int!
        pageSize:Int!
    }

    input criteria{
        pagination:paginationCriteria!
        orderBy:[[String]]!
    }

    input DateRange{
        From:Date
        To:Date
    }

  
    
    
    type Query{
      
    }
    
    type Mutation{
     
    }
    
    
    
    schema{
        query:Query
        mutation:Mutation
    }
    
`;
export default Schema;