/**
 * Created by ChitSwe on 12/21/16.
 */
import {type as type_ProductBrand,query as query_ProductBrand,mutation as mutation_ProductBrand} from './ProductBrand';
import {type as type_ProductGroup,query as query_ProductGroup, mutation as mutation_ProductGroup} from './ProductGroup';
import {type as type_Product, query as query_Product,mutation as mutation_Product} from './Product';
import {type as type_User,query as query_User,mutation as mutation_User} from './User'
import {type as type_UserAccount, query as query_UserAccount,mutation as mutation_UserAccount} from './UserAccount';
import {type as type_Customer, query as query_Customer,mutation as mutation_Customer} from './Customer';
import {type as type_UserSession, query as query_UserSession,mutation as mutation_UserSession} from './UserSession';
import {type as type_CustomerOrder, query as query_CustomerOrder, mutation as mutation_CustomerOrder} from './CustomerOrder';
import {type as type_Region, query as query_Region,mutation as mutation_Region} from './Region';
import {type as type_Township, query as query_Township,mutation as mutation_Township} from './Township';
import {type as type_BankAccount, query as query_BankAccount, mutation as mutation_BankAccount} from './BankAccount';
import {type as type_BankTransfer, query as query_BankTransfer, mutation as mutation_BankTransfer} from './BankTransfer';
import {type as type_OrderStatus, query as query_OrderStatus,mutation as mutation_OrderStatus} from './OrderStatus';
import {type as type_StockIn,query as query_StockIn, mutation as mutation_StockIn} from './StockIn';
import {type as type_StockOut,query as query_StockOut, mutation as mutation_StockOut} from './StockOut';
import {type as type_PickupPoint,query as query_PickupPoint,mutation as mutation_PickupPoint} from './PickupPoint';
import {type as type_UOM,query as query_UOM,mutation as mutation_UOM} from './UOM';
import {type as type_ProductSpecification, query as query_ProductSpecification, mutation as mutation_ProductSpecification} from './ProductSpecification';
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

  
    
    ${type_ProductBrand}
    ${type_ProductGroup}
    ${type_Product}
    ${type_User}
    ${type_UserAccount}
    ${type_Customer}
    ${type_UserSession}
    ${type_CustomerOrder}
    ${type_Region}
    ${type_Township}
    ${type_BankAccount}
    ${type_BankTransfer}
    ${type_OrderStatus}
    ${type_StockIn}
    ${type_StockOut}
    ${type_PickupPoint}
    ${type_UOM}
    ${type_ProductSpecification}
    type Query{
        ${query_ProductBrand}
        ${query_ProductGroup}
        ${query_Product}
        ${query_User}
        ${query_UserAccount}
        ${query_Customer}
        ${query_UserSession}
        ${query_CustomerOrder}
        ${query_Region}
        ${query_Township}
        ${query_BankAccount}
        ${query_OrderStatus}
        ${query_StockIn}
        ${query_StockOut}
        ${query_PickupPoint}
        ${query_UOM}
        ${query_ProductSpecification}
    }
    
    type Mutation{
        ${mutation_ProductBrand}
        ${mutation_ProductGroup}
        ${mutation_Product}
        ${mutation_User}
        ${mutation_UserAccount}
        ${mutation_Customer}
        ${mutation_UserSession}
        ${mutation_CustomerOrder}
        ${mutation_Region}
        ${mutation_Township}
        ${mutation_BankAccount}
        ${mutation_OrderStatus}
        ${mutation_StockIn}
        ${mutation_StockOut}
        ${mutation_PickupPoint}
        ${mutation_UOM}
        ${mutation_ProductSpecification}
    }
    
    
    
    schema{
        query:Query
        mutation:Mutation
    }
    
`;
export default Schema;