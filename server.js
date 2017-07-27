    /**
 * Created by ChitSwe on 12/19/16.
 */
import Express,{Router} from 'express';
import bodyParser from 'body-parser';
import './common/dateUtils';
import Accounting from 'accounting';
import Preference from './common/Preference';
import db from './server/models';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import Schema from './server/data/schema';
import Resolver from './server/data/resolver';
import {default as migration} from './server/database/migration';
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from './client/admin/routes';
import siteRoutes from './client/site/routes';
import createApolloClient from './common/createApolloClient';
import { createNetworkInterface } from 'apollo-client';
import { match, RouterContext } from 'react-router';
import 'isomorphic-fetch';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import injectTapEventPlugin from 'react-tap-event-plugin';
import webpack from 'webpack';
import devConfig from './webpack.dev';
import testConfig from './webpack.test';
import prodConfig from './webpack.prod';
import latency from 'express-simulate-latency';
import {default as adminTheme} from './common/adminMuiTheme';
import {default as siteTheme} from './common/siteMuiTheme';
import createAdminStore from './client/admin/reducer/createAdminStore';
import createSiteStore from './client/site/reducer/createSiteStore';
import cookieParser from 'cookie-parser';
injectTapEventPlugin();
import {default as AdminHtml} from './server/adminHtml';
import {default as SiteHtml} from './server/siteHtml';
import   './server/security/auth';
import passport from 'passport';
import proxy from 'proxy-middleware';
import url from "url";
const env = process.env.NODE_ENV;

console.log ( `Running with ${env} mode.`);
let webpackConfig= null;
switch(env){
    case "production":
        webpackConfig = prodConfig;
        break;
    case "development":
        webpackConfig = devConfig;
        break;
    case "test":
        webpackConfig = testConfig;
        break;
    default:
        webpackConfig = prodConfig;
        break;
}
Accounting.settings = {
    currency: Preference.format.currency,
    number: Preference.format.number
};
const app = new Express();
const appRouter = new Router();
const port =env === 'test'? 3233: 3232;
const proxyPort = 3230;
const graphqlUrl=`http://localhost:${port}/graphql`;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(cookieParser());
app.disable('x-powered-by');
if(env==="development"){
    app.use(latency({ min: 100, max: 500 }));
    app.use('/admin.bundle.js',proxy(url.parse('http://localhost:' + proxyPort + '/public/admin.bundle.js')));
    app.use('/site.bundle.js',proxy(url.parse('http://localhost:' + proxyPort + '/public/site.bundle.js')));
    app.use('/admin.bundle.js.map',proxy(url.parse('http://localhost:' + proxyPort + '/public/admin.bundle.js.map')));
    app.use('/site.bundle.js.map',proxy(url.parse('http://localhost:' + proxyPort + '/public/site.bundle.js.map')));
}else if(env ==="production"){
    app.get('*.js', function (req, res, next) {
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      next();
    });
}else if(env==="test"){
    app.use('/admin.bundle.js',function (req, res, next) {
      req.url ='/admin.bundle.test.js'
      next();
    });
    app.use('/site.bundle.js',function (req, res, next) {
      req.url ='/site.bundle.test.js'
      next();
    });
    app.use('/admin.bundle.js.map',function (req, res, next) {
      req.url ='/admin.bundle.test.js.map'
      next();
    });
    app.use('/site.bundle.js.map',function (req, res, next) {
      req.url ='/site.bundle.test.js.map'
      next();
    });
}

app.use('/graphql',passport.authenticate('bearer-graphql',{session:false}), apolloExpress( (req,res) => {
    return {
        schema: makeExecutableSchema({
            typeDefs: Schema,
            resolvers:Resolver,
            allowUndefinedInResolve: true,
        }),
        context: { user:req.user,httpResponse:res }
    }
}));

if(env !=="production" ){
    // graphiql endpoint
    app.use('/graphiql', graphiqlExpress({
        endpointURL: '/graphql',
    }));
}


app.use(Express.static('public'));
app.use('/api',appRouter);
function renderHtml(req,res,renderProps,isAdminSite){
    
    const client = createApolloClient({
        ssrMode: true,
        networkInterface: createNetworkInterface({
            uri: graphqlUrl,
            opts: {
                credentials: 'same-origin',
                // transfer request headers to networkInterface so that they're
                // accessible to proxy server
                // Addresses this issue: https://github.com/matthew-andrews/isomorphic-fetch/issues/83
                headers: req.headers,
            },
        }),
    });
    let store = null;
    let muiTheme=null;
    let html = null;
    if(isAdminSite){//render admin site
        muiTheme = getMuiTheme(Object.assign({userAgent: req.headers['user-agent']},adminTheme));
        store = createAdminStore({client});
    }else{//render web site
        muiTheme = getMuiTheme(Object.assign({userAgent: req.headers['user-agent']},siteTheme));
        store = createSiteStore(({client}));
    }

    const component = (     
        <MuiThemeProvider muiTheme={muiTheme}>
            <ApolloProvider client={client} store={store}>
                <RouterContext {...renderProps} />
            </ApolloProvider>
        </MuiThemeProvider>
    );

    renderToStringWithData(component).then((content) => {
        const {apollo,...state}= client.store.getState();
        const data = apollo.data;
        res.status(200);

        const html = isAdminSite?
            (<AdminHtml
            content={content}
            state={Object.assign({ apollo: { data } },state)}
        />):
            (<SiteHtml
                content={content}
                state={Object.assign({ apollo: { data } },state)}
                muiTheme={siteTheme}
            />);
        res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
        res.end();
    }).catch(e => console.error('RENDERING ERROR:', e)); // eslint-disable-line no-console
}




function bundleWebpack(){
    console.log('Start webpack bundling');
    webpack(webpackConfig, function (err, stats) {
        if (err)
            console.log(err);
        else {
            console.log('Bundling finished.');
                migration.up().then((migrations) => {
                app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
            });
        }
    });
}

migration.up().then((migrations) => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


