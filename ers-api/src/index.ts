import epxress from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './routers/users.router';
import { reimbursementsRouter } from './routers/reimbursements.router';
import { authRouter } from './routers/auth.router';
import { sessionMiddleware } from './middleware/session.middleware';

const port = process.env.PORT || 8012;
const app = epxress();

app.use((req, res, next) => {
    console.log(`request made with url: ${req.url} and method ${req.method}`)
    next();
})

app.use(bodyParser.json());


/**
 * Session middleware to give us access to req.session for session data
 */
app.use(sessionMiddleware);

/**
 * allow cross origins
 */
app.use((req, resp, next) => {
    console.log(req.get('host'));
    resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

/*******************************
 * Register Routers
 *******************************/
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);
app.use(authRouter);

// app.use((req, res, next) => {
//     console.log(req.session.user)
//     next();
// })

app.listen(port, () => {
    console.log(`app started on port: ${port}`);
})